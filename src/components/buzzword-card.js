import React, { Component, PropTypes } from 'react';
import { Card, CardBlock, CardTitle, CardText } from 'reactstrap';

import CardIcon from './card-icon';

export default class BuzzwordCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefinition: false,
    };
  }

  handleDelete = () => {
    const { buzzword, id, handleDelete } = this.props;
    handleDelete(id, buzzword);
  }

  showDefinition = () => {
    this.setState(prevState => ({
      showDefinition: !prevState.showDefinition,
    }));
  }

  render() {
    const { buzzword, definition } = this.props;
    const { showDefinition } = this.state;

    const eyeStyle = showDefinition ?
      'fa-eye-slash' : 'fa-eye';

    const eyeColor = showDefinition ?
      'warning' : 'primary';

    return (
      <Card outline color="primary" style={{ backgroundColor: '#f9f9f9' }}>
        <CardBlock >
          <CardIcon 
            icon="fa-trash"
            color="gray"
            hoverColor="black"
            click={this.handleDelete}
          />
          <CardIcon 
            icon={eyeStyle}
            faColor={eyeColor}
            click={this.showDefinition} 
          />

          <CardTitle onClick={ this.showDefinition }> { buzzword } </CardTitle>

          { showDefinition
            && 
            <div>
              <hr />
              <CardText style={{ marginTop: 20 + 'px' }}> { definition } </CardText>
            </div>
          }

        </CardBlock>
      </Card>
    );
  }
}

BuzzwordCard.propTypes = {
  buzzword: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};