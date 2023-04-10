import React from 'react';
import Slider from 'react-slick';
import { VegetableMainSlider } from '../../../Data/SliderSettingsData';
import { CommonPath } from '../../Constant';

const VegetablePoster = ({ VegetableSlider, nav2, slider1 }) => {
  return (
    <div className='poster-image slider-for custome-arrow classic-arrow-1'>
      <Slider asNavFor={nav2} {...VegetableMainSlider} ref={(slider) => (slider1.current = slider)}>
        {VegetableSlider.map((el) => {
          return el.backgroundimages.map((elem, i) => {
            return (
              <div key={i}>
                <img src={`${CommonPath}/${elem.image}`} className='img-fluid' alt='slider' />
              </div>
            );
          });
        })}
      </Slider>
    </div>
  );
};

export default VegetablePoster;
