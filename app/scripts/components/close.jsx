import React from 'react/addons';
import Icon from './icon';

export default React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    size: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      size: 16
    };
  },

  render() {
    return (
      <button className="close" type="button" onClick={this.props.onClick}>
        <Icon
          title="Close"
          use="close"
          width={this.props.size}
          height={this.props.size} />
      </button>
    );
  }
});
