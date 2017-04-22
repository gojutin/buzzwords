import React from 'react';
import { Row, Col } from 'reactstrap';
import WobblySpinner from "react-wobbly-spinner";

import BuzzwordCard from './buzzword-card';

export default ({ buzzwords, dataLoaded, deleteBuzzword }) => {

    const renderBuzzword = buzzwords.map(buzzword => {
      return (
        <Col xs="12" sm="6" key={buzzword.id} style={{ marginTop: 10 + 'px' }}>
          <BuzzwordCard
            buzzword={buzzword.buzzword}
            definition={buzzword.definition}
            id={buzzword.id}
            handleDelete={deleteBuzzword}
          />
        </Col>
      );
    });

    return (
      <div className="text-center">
        { dataLoaded
          ? <Row> {renderBuzzword} </Row>
          : <WobblySpinner />
        }

        { dataLoaded && buzzwords.length === 0
          &&
          <div className="text-primary">
            <i className="fa fa-arrow-up fa-3x" />
            <h2>Start here</h2>
          </div>
        }
      </div>
    );
}

    