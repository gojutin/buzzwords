import React, { Component } from 'react';
import { Card, CardBlock, CardTitle, CardText } from 'reactstrap';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDef: false,
    };
  }
  handleDelete = () => {
    const { term, id, handleDelete } = this.props;
    console.log("Clicked delete");
    handleDelete(id, term);
  }
  showDef = () => {
    this.setState(prevState => ({
      showDef: !prevState.showDef
    }));
  }

  render() {
    const { term, def } = this.props;
    return (
      <Card outline color="primary" style={{ backgroundColor: '#f9f9f9' }}>
        <CardBlock >
          <i
            className="fa fa-trash fa-2x float-right"
            style={{ color: 'gray' }}
            onClick={this.handleDelete}
          />
          <i
            className={this.state.showDef
              ? "fa fa-eye-slash fa-2x float-right"
              : "fa fa-eye fa-2x float-right"}
            style={{ color: 'gray' }}
            onClick={this.showDef}
          />
          <CardTitle onClick={this.showDef}>{term}</CardTitle>
          {this.state.showDef && <CardText style={{ marginTop: 20 + 'px' }}><hr />{def}</CardText>}
        </CardBlock>
      </Card>
    );
  }
}

