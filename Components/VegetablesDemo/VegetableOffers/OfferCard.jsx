import Link from 'next/link';
import React from 'react';
import { ShoppingBag } from 'react-feather';
import Slider from 'react-slick';
import { FreshFruitsSlider } from '../../../Data/SliderSettingsData';
import { CommonPath, OFF } from '../../Constant';
import AddToCartProduct from '../../Element/AddToCart';
import DynamicRating from '../../Element/DynamicRating';

const OfferCard = ({ OfferFilter }) => {
  return (
    <Slider {...FreshFruitsSlider}>
      {OfferFilter.map((el) => {
        return el.banners.map((elem, i) => {
          return (
            <div key={i}>
              <div className='product-box product-box6'>
                <div className='img-wrapper squre-image'>
                  <div className='front-img'>
                    <img className='img-fluid bg-img' alt='squre' src={`${CommonPath}/${elem.image}`} />
                  </div>
                  <div className='labels label-block theme-color'>
                    {elem.discount > 0 && (
                      <span className='label-7'>
                        {elem.discount}% {OFF}
                      </span>
                    )}
                  </div>
                  <div className='cart-info cart-bag'>
                    <div className='cart-contain'>
                      <Link href={'/page/cart'} className='addtocart-btn'>
                        <ShoppingBag />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='product-detail'>
                  <a href='#javascript'>
                    <h5>{elem.heading}</h5>
                  </a>
                  <DynamicRating data={elem.ratingStars} customeclass={'mt-1'} />
                </div>
              </div>
            </div>
          );
        });
      })}
    </Slider>
  );
};

export default OfferCard;
