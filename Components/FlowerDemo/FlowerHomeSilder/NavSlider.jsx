import React from 'react';
import Slider from 'react-slick';
const NavSlider = ({ nav1, slider2 }) => {
  return (
    <div className='slider-nav image-show'>
      <Slider asNavFor={nav1} ref={(slider) => (slider2.current = slider)} slidesToShow={2} swipeToSlide={true} focusOnSelect={true} infinite={true} arrows={true}>
        <div>
          <div className='poster-img'>
            <img src='/assets/images/flower/poster/t1.jpg' alt='poster' />
            <div className='overlay-color'>
              <p className='theme-color'>1</p>
            </div>
          </div>
        </div>
        <div>
          <div className='poster-img'>
            <img src='/assets/images/flower/poster/t2.jpg' alt='poster' />
            <div className='overlay-color'>
              <p className='theme-color'>2</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default NavSlider;
