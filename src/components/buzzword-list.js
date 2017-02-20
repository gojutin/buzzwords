import React, { Component } from 'react';
import firebase from 'firebase';
import { Row, Col } from 'reactstrap';
import WobblySpinner from "react-wobbly-spinner";

import BuzzwordCard from './buzzword-card';

export default class Buzzwords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buzzwords: [],
    }
  }
  componentDidMount() {
    const db = firebase.database();
    db.ref('buzzwords').orderByChild("term").on('value', snap => {
      var buzzwordsArray = [];
      snap.forEach(buzzword => {
        buzzwordsArray.push({
          id: buzzword.key,
          term: buzzword.val().term,
          definition: buzzword.val().definition,
        })
      })
      this.setState({
        buzzwords: buzzwordsArray,
      });
    })
  }
  deleteBuzzword(id, term) {
    if (window.confirm(`Are you sure you want to delete ${term}?`)) {
      const db = firebase.database();
      db.ref('buzzwords').child(id).remove();
    }
  }
  render() {
    const renderBuzzword = this.state.buzzwords.map(x => {
      return (
        <Col xs="12" sm="6" key={x.id} style={{ marginTop: 10 + 'px' }}>
          <BuzzwordCard
            term={x.term}
            def={x.definition}
            id={x.id}
            handleDelete={this.deleteBuzzword}
          />
        </Col>
      );
    })
    return (
      <div className="text-center">
        {this.state.buzzwords.length 
          ?  <Row> {renderBuzzword} </Row>
          : <WobblySpinner />
        }

      </div>
    );
  }
}