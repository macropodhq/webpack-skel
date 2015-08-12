const React = require('react');
const Router = require('react-router');

const log = require('bows')('App');

require('./index.css');

const App = React.createClass({
  render() {
    return (
      <div className="App">
        <h1>THE NEW APP</h1>
        <Router.Link to="someview">GO TO SOMEVIEW</Router.Link>
        <br />
        <Router.Link to="/">GO TO HOME</Router.Link>
        <Router.RouteHandler {...this.props}/>
      </div>
    );
  },
});

const SomeView = React.createClass({
  render() {
    return (
      <div>
        Some view
      </div>
    );
  },
});

const DefaultView = React.createClass({
  render() {
    return (
      <div>
        Default View
      </div>
    );
  },
});

const routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={DefaultView}/>
    <Router.Route name="someview" path="/something" handler={SomeView}/>

  </Router.Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  log('route change', state);

  // store logic here if required

  React.render(<Handler/>, document.body);
});
