import React from 'react';
import { Col } from 'reactstrap';
import { SubscribeDescription, SubscribeOurNews } from '../../Constant';

const SubscribeNews = ({ addBgColor }) => {
  return (
    <Col lg='8' md='6'>
      <div className='subscribe-details'>
        <h2 className={`mb-3${addBgColor ? ' theme-color' : ''}`}>{SubscribeOurNews}</h2>
        <h6>{SubscribeDescription}</h6>
      </div>
    </Col>
  );
};
export default SubscribeNews;
