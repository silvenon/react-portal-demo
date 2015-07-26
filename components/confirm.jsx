import React from 'react/addons';

export default React.createClass({
  propTypes: {
    onCancel: React.PropTypes.func.isRequired,
    onConfirm: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="confirm">
        <p className="confirm-question">Are you sure?</p>
        <div className="btn-group">
          <button
            ref="confirm"
            className="btn btn-danger"
            type="button"
            onClick={this.props.onConfirm}>
            Delete
          </button>
          <button
            ref="cancel"
            className="btn btn-disabled"
            type="button"
            onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
});
