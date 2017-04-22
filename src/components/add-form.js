import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const renderField = ({ input, type, name, placeholder, 
    meta: { touched, error } }) => (
    <div>
      <Input
        {...input}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {touched && ((error && <p className="text-danger">{error}</p>))}
    </div>
  );

// Validation
const required = value => value ? undefined : 'This is a required field.'
const lengthLimit = value => value.length < 140 ? undefined : 'You have reached the 140 character limit.'

let AddForm = ({ handleSubmit, toggleModal, modalOpen } ) => 
    <div className="text-center">
      <i className="fa fa-plus-square-o fa-4x text-success" onClick={toggleModal} />
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
      >
      <Form onSubmit={handleSubmit}>
        <ModalBody>
            <FormGroup>
              <Field
                type="text"
                name="buzzword"
                placeholder="Add buzzword.."
                component={renderField}
                validate={[required, lengthLimit]}
              />
            </FormGroup>
            <FormGroup>
              <Field
                type="text"
                name="definition"
                placeholder="Add definition.."
                component={renderField}
                validate={[required, lengthLimit]}
              />
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
          > 
          Add New Buzzword</Button>
        
          <Button 
            type="button" 
            color="secondary" 
            onClick={toggleModal}
          >Cancel</Button>

        </ModalFooter>
        </Form> 
      </Modal>
    </div>

AddForm = reduxForm({
  form: 'addForm' // a unique name for this form
})(AddForm);

export default AddForm;