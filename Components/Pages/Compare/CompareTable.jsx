/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Img from '../../Element/Images';
import { getAPIData } from '../../../Utils';
import { Brand, CommonPath, ContinueShopping, CustomerRating, DateFirstAvailable, Department, GenericName, Manufacturer, OFF } from '../../Constant';
import DynamicRating from '../../Element/DynamicRating';
import { Btn } from '../../AbstractElements';
import CompareAction from './CompareAction';

const CompareTable = () => {
  const router = useRouter();
  const [comapreData, setComapreData] = useState([]);
  const { compareProducts } = useSelector((state) => state.CompareReducer);
  useEffect(() => {
    getAPIData(`${process.env.API_URL}getcompare`)
      .then((res) => {
        setComapreData(res?.data);
        'res?.data', res?.data;
      })
      .catch((error) => console.log('Error', error));
  }, [compareProducts]);
  return (
    <section className='section-b-space'>
      <Container>
        <Row className='justify-content-center'>
          {comapreData.length > 0 ? (
            <Col xs='12'>
              <div className='comparemodal-body'>
                <div className='table-wrapper table-responsive ratio_asos'>
                  <Table className='table-striped-1'>
                    <tbody>
                      <tr className='table-product-details'>
                        <td></td>
                        {comapreData?.map((elem, i) => (
                          <td key={i}>
                            <div className='product-box'>
                              <div className='product-image'>
                                <a className='w-100 bg-size'>
                                  <Img src={`${CommonPath}/${elem?.images[0]?.src}`} alt='product' className='bg-img' />
                                </a>
                              </div>
                              <div className='product-details'>
                                <div>
                                  <a href='#javascript'>
                                    <h6 className='fw-bold'>{elem.name}</h6>
                                  </a>
                                </div>
                                <div className='price-details mt-2'>
                                  <h6 className='font-green'>
                                    ${elem?.price}.25
                                    <span className='font-light mx-2'>${elem?.mrp}.00</span>
                                    {elem?.discount > 0 && (
                                      <span className='theme-color'>
                                        %{elem?.discount} {OFF}
                                      </span>
                                    )}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <CompareAction comapreData={comapreData} setComapreData={setComapreData} />
                      <tr>
                        <td>{CustomerRating}</td>
                        {comapreData?.map((elem, i) => (
                          <td key={i}>
                            <div className='d-flex align-items-center my0'>
                              <DynamicRating data={elem.ratingStars} customeclass={'my-0'} />
                              <span className='font-light ms-2'>(22 reviews)</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td>{Brand}</td>
                        {comapreData?.map((elem, i) => (
                          <td key={i}>{elem.brand}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{GenericName}</td>
                        {comapreData?.map((data, i) => (
                          <td key={i}>T-Shirt</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{Department}</td>
                        {comapreData?.map((elem, i) => (
                          <td key={i}>{elem.department}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{Manufacturer}</td>
                        {comapreData?.map((data, i) => (
                          <td key={i}>PAGE INDUSTRIES LIMITED</td>
                        ))}
                      </tr>
                      <tr>
                        <td>color</td>
                        {comapreData?.map((elem, i) => (
                          <td key={i}>{elem.colors.map((el) => el + ', ')}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>{DateFirstAvailable}</td>
                        {comapreData?.map((data, i) => (
                          <td key={i}>28 July 2015</td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          ) : (
            <Col xs='9' sm='3'>
              <img src={'../assets/images/empty-compare.png'} className='w-100 mb-3' alt='empty' />
              <div className='w-100 text-center'>
                <h5 className='text-center mb-3'>
                  Compare List is Empty!! <p>Let's add some products to Compare List!</p>
                </h5>
                <Btn attrBtn={{ className: 'btn-solid-default', onClick: () => router.push('/shop/shop_left_sidebar') }}>{ContinueShopping}</Btn>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default CompareTable;
