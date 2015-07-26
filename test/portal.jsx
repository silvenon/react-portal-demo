import jsdom from 'jsdom';
import sinon from 'sinon';
import assert from 'assert';

describe('Portal', () => {
  let React, utils, Portal;

  before(() => {
    global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
    global.window = global.document.parentWindow;
    global.navigator = window.navigator;

    React = require('react/addons');
    utils = React.addons.TestUtils;
    Portal = require('react-portal');
  });

  it('handles event bubbling after close', () => {
    const cb = sinon.spy();

    const Component = React.createClass({
      handleClose() {
        this.refs.portal.closePortal();
        console.log('close');
      },

      render() {
        return (
          <Portal ref="portal" openByClickOn={<span ref="toggle" />} onClose={cb}>
            <div onClick={function () { }}> // it works without the handler
              <button ref="close" type="button" onClick={this.handleClose}>Close</button>
            </div>
          </Portal>
        );
      }
    });

    const el = utils.renderIntoDocument(<Component />);

    utils.Simulate.click(React.findDOMNode(el.refs.toggle));
    utils.Simulate.click(React.findDOMNode(el.refs.close));

    assert(cb.called);
  });
});
