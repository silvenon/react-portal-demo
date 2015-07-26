import React from 'react/addons';
import Portal from 'react-portal';
import Modal from './modal';
import Confirm from './confirm';

export default React.createClass({
  propTypes: {
    onClose: React.PropTypes.func,
    onConfirm: React.PropTypes.func.isRequired,
    openByClickOn: React.PropTypes.node.isRequired
  },

  getDefaultProps() {
    return {
      onClose: function () { }
    };
  },

  handleCancel() {
    this.refs.portal.closePortal();
  },

  render() {
    return (
      <Portal
        ref="portal"
        openByClickOn={this.props.openByClickOn}
        onClose={this.props.onClose}>

        <Modal ref="modal" title="Confirm">
          <Confirm
            ref="body"
            onConfirm={this.props.onConfirm}
            onCancel={this.handleCancel} />
        </Modal>

      </Portal>
    );
  }
});
