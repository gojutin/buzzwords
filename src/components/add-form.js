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
      modal: false,
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
      this.toggle();
    })
    .catch(error => {
      this.clearForm();
      this.toggle();
      this.setState({
        errorMessage: error,
      });
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
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

    const { buzzword, definition, errorMessage, modal } = this.state;

    return (
      <div className="text-center addWord">
        <i className="fa fa-plus-square-o fa-4x text-success" onClick={this.toggle} />
        <Modal
          isOpen={modal}
          toggle={this.toggle}
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
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}