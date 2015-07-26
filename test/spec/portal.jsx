import assert from 'assert';

describe('Portal', () => {
  let React, utils, ConfirmDialog;

  before(() => {
    React = require('react/addons');
    utils = React.addons.TestUtils;
    ConfirmDialog = require('../../components/confirm-dialog');
  });

  it('closes on cancel', () => {
    const el = utils.renderIntoDocument(
      <ConfirmDialog
        onConfirm={function () { }}
        onClose={function () { }}
        openByClickOn={<span className="toggle" />} />
    );

    utils.Simulate.click(utils.findRenderedDOMComponentWithClass(el, 'toggle'));
    utils.Simulate.click(React.findDOMNode(el.refs.body.refs.cancel));
  });
});
