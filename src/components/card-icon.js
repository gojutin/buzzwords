import React, { Component } from 'react';
import classNames from 'classnames';

export default class CardIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  handleHover = () => {
    this.setState((prevState) => ({
      hover: !prevState.hover 
    }));
  }

  render() {
    const { icon, color, faColor, hoverColor, faHoverColor, click } = this.props;
    const { hover } = this.state;

    const colorClass = classNames({
      [`${color}`]: !hover || !hoverColor,
      [`${hoverColor}`]: hoverColor && hover
    });

    const faColorClass = classNames({
      [`${faColor}`]: !hover || !faHoverColor,
      [`${faHoverColor}`]: faHoverColor && hover
    });

    return (
      <i
        className={`fa fa-2x float-right ${icon} text-${faColorClass}`}
        style={{ color: `${colorClass}` }}
        onClick={click}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      />
    );
  }
} 


 

