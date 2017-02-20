import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, FormGroup, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      def: '',
      term: '',
      error: '',
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit = (event) => {
    if (this.state.def && this.state.term && !this.state.error) {
      event.preventDefault();
      const db = firebase.database();
      db.ref('buzzwords').push({
        term: this.state.term,
        definition: this.state.def,
      })
        .then(() => {
          this.clearForm();
          this.toggle();
        })
        .catch(err => {
          this.clearForm();
          this.toggle();
          this.setState({
            error: err,
          });
        })
    } else {
      this.setState({
        error: "Both values are required."
      })
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  clearForm() {
    this.setState({
      term: '',
      def: '',
      error: '',
    });
  }

  handleChange = (event) => {
    if (event.target.value.length >= 140) {
      this.setState({
        error: "You have reached the 140 character limit",
      });
    } else {
      this.setState({
        [`${event.target.name}`]: event.target.value,
        error: '',
      })
    }
  }

  render() {
    return (
      <div className="text-center addWord">
        <i className="fa fa-plus-square-o fa-4x text-success" onClick={this.toggle} />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  onChange={this.handleChange}
                  name="term"
                  value={this.state.term}
                  placeholder="Add term..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="textarea"
                  name="def"
                  value={this.state.def}
                  placeholder="Add definition..."
                />
                {this.state.error && <p className="text-danger">{this.state.error}</p>}
              </FormGroup>
              <FormGroup>

              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={this.state.error || !this.state.term ? true : false}
            >
              Add New Buzzword
                </Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}