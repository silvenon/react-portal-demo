import React from 'react/addons';
import closest from 'closest';
import Close from './close';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    closePortal: React.PropTypes.func,
    onClose: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      onClose: function () {},
      closePortal: function () {}
    };
  },

  handleClose() {
    this.props.closePortal();
    this.props.onClose();
  },

  handleClickOutside(event) {
    const modal = React.findDOMNode(this.refs.modal);

    if (event && event.target) {
      if (closest(event.target, '.modal') !== modal) {
        this.handleClose();
      }
    }
  },

  handleEsc(event) {
    if (event && event.keyCode === 27) { // ESC
      this.handleClose();
    }
  },

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleEsc);
    document.body.classList.add('modal-open');
  },

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleEsc);
    document.body.classList.remove('modal-open');
  },

  render() {
    let children = this.props.children;

    if (React.Children.count(children) === 1) {
      children = React.cloneElement(children, {
        closePortal: this.props.closePortal
      });
    }

    return (
      <div
        ref="modal"
        className="modal"
        onClick={this.handleClickOutside}>

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 ref="title" className="modal-title">
                {this.props.title}
              </h3>
              <Close onClick={this.handleClose} />
            </div>

            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>

      </div>
    );
  }
});
