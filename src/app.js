import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

import AddForm from './components/add-form';
import BuzzWordList from './components/buzzword-list';

export default () => 
  <div>
    <Jumbotron style={{textAlign: 'center', padding: 10 + 'px'}}>
      <h1 className="display-4 text-primary" style={{fontFamily: 'Barrio, cursive'}}>Buzz<span className="text-warning">words</span></h1>
      <AddForm />
    </Jumbotron>
    <Container>
      <BuzzWordList />
   </Container>
  </div>



