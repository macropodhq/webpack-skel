var React = require('react');
var Router = require('react-router');

var log = require('bows')('App');

require('./index.scss');

var App = React.createClass({
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
  }
});

var SomeView = React.createClass({
  render() {
    return (
      <div>
        Some view
      </div>
    );
  }
});

var DefaultView = React.createClass({
  render() {
    return (
      <div>
        Default View
      </div>
    );
  }
});

var routes = (
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
