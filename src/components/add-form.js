import React, { Component } from 'react';
import firebase from 'firebase';
import { 
  Form, 
  FormGroup, 
  Input, 
  Button, 
  Modal, 
  ModalBody, 
  ModalFooter 
} from 'reactstrap';

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buzzword: '',
      definition: '',
      errorMessage: '',
      modalOpen: false,
    };
  };

  handleSubmit = (event) => {
    const { buzzword, definition, errorMessage } = this.state;
    event.preventDefault();
    if (!buzzword || !definition) {
      this.setState({
        errorMessage: "Both values are required."
      });
      return;
    }
    
    if (errorMessage) {
      return;
    }
    // database logic
    const db = firebase.database();
    db.ref('buzzwords').push({
      buzzword,
      definition,
    })
    .then(() => {
      this.clearForm();
      this.toggleModal();
    })
    .catch(error => {
      this.clearForm();
      this.toggleModal();
      this.setState({
        errorMessage: error,
      });
    });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }))
  }

  clearForm = () => {
    this.setState({
      buzzword: '',
      definition: '',
      errorMessage: '',
    });
  }

  handleChange = (event) => {
    if (event.target.value.length >= 140) {
      this.setState({
        errorMessage: "You have reached the 140 character limit",
      });
    } else {
      this.setState({
        [`${event.target.name}`]: event.target.value,
        errorMessage: '',
      })
    }
  }

  render() {

    const { buzzword, definition, errorMessage, modalOpen } = this.state;

    return (
      <div className="text-center addWord">
        <i className="fa fa-plus-square-o fa-4x text-success" onClick={this.toggleModal} />
        <Modal
          isOpen={modalOpen}
          toggle={this.toggleModal}
        >
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  onChange={this.handleChange}
                  name="buzzword"
                  value={buzzword}
                  placeholder="Add buzzword.."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  onChange={this.handleChange}
                  type="textarea"
                  name="definition"
                  value={definition}
                  placeholder="Add definition.."
                />

                {errorMessage 
                  && <p className="text-danger">{errorMessage}</p>
                }

              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={errorMessage
               || !buzzword
               || !definition
               ? true : false }
            > Add New Buzzword
          </Button>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
