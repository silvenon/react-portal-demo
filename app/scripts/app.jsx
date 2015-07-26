import React from 'react/addons';
import Router from 'react-router';
import ConfirmDialog from './components/confirm-dialog';

import 'svg4everybody';
import './fonts.js';

const {
  Route,
  RouteHandler
} = Router;

const App = React.createClass({
  propTypes: {},

  getInitialState() {
    return {
      loading: true
    };
  },

  render() {
    return (
      <div>
        <ConfirmDialog
          onConfirm={function () { }}
          openByClickOn={<a href="#">Toggle</a>} />
        <RouteHandler />
      </div>
    );
  }
});

const routes = (
  <Route name="app" path="/" handler={App}>
    {/* routes */}
  </Route>
);

Router.run(routes, Handler => {
  React.render(<Handler />, document.getElementById('content'));
});
