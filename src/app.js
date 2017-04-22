import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import AddForm from './components/add-form';
import BuzzWordList from './components/buzzword-list';

export default class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  handleSubmit = values => {
    this.props.addBuzzword(values);
  }
  render() {
    const { toggleModal, modalOpen } = this.props;
    return (
      <div>
        <Jumbotron style={{ textAlign: 'center', padding: 10 + 'px' }}>
          <h1
            className="display-4 text-primary"
            style={{ fontFamily: 'Barrio, cursive' }}
          >
            Buzz
        <span className="text-warning">words</span>
          </h1>
          <AddForm
            onSubmit={this.handleSubmit}
            toggleModal={toggleModal}
            modalOpen={modalOpen}
           />
        </Jumbotron>
        <Container>
          <BuzzWordList
            {...this.props}
          />

        </Container>
      </div>
    )
  }

}