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
      loaded: false,
    }
  }

  componentDidMount() {
    const db = firebase.database();
    db.ref('buzzwords').orderByChild("buzzword").on('value', snap => {
      let buzzwordsArray = [];
      snap.forEach(buzzword => {
        buzzwordsArray.push({
          id: buzzword.key,
          buzzword: buzzword.val().buzzword,
          definition: buzzword.val().definition,
        });
      });
      this.setState({
        buzzwords: buzzwordsArray,
        loaded: true,
      });
    });
  }

  deleteBuzzword(id, buzzword) {
    if (window.confirm(`Are you sure you want to delete ${buzzword}?`)) {
      const db = firebase.database();
      db.ref('buzzwords').child(id).remove();
    }
  }

  render() {

    const { buzzwords, loaded } = this.state;

    const renderBuzzword = buzzwords.map(buzzword => {
      return (
        <Col xs="12" sm="6" key={buzzword.id} style={{ marginTop: 10 + 'px' }}>
          <BuzzwordCard
            buzzword={buzzword.buzzword}
            definition={buzzword.definition}
            id={buzzword.id}
            handleDelete={this.deleteBuzzword}
          />
        </Col>
      );
    });

    return (
      <div className="text-center">

        {loaded
          ? <Row> {renderBuzzword} </Row>
          : <WobblySpinner />
        }

        {loaded && buzzwords.length === 0
          &&
          <div className="text-primary">
            <i className="fa fa-arrow-up fa-3x" />
            <h2>Start here</h2>
          </div>
        }
      </div>
    );
  };
};