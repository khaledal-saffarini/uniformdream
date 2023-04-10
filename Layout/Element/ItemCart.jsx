import { useEffect, useState } from 'react';
import { ShoppingBag, ShoppingCart } from 'react-feather';
import { Input, Media } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAPIData } from '../../Utils';
import { CommonPath } from '../../Components/Constant';
import { Btn } from '../../Components/AbstractElements';
import TotalPrice from './TotalPrice';
import { toast } from 'react-toastify';

const ItemCart = () => {
  const [cartData, setCartData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { product } = useSelector((state) => state.AddToCartReducer);

  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  useEffect(() => {
    getAPIData(`${process.env.API_URL}getcart`)
      .then((res) => {
        setCartData(res.data);
      })
      .catch((error) => console.log('Error', error));
  }, [product]);
  const getTotalPrice = () => {
    var addPrice = 0;
    const filterPrice =
      cartData &&
      cartData.map((el) => {
        return el.price;
      });
    filterPrice?.map((elem) => (addPrice += elem));
    return addPrice;
  };
  const isOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  const removeProduct = (product) => {
    deleteProduct(`${process.env.API_URL}remove/cart/${product.id}`).then((res) => {
      dispatch({ type: 'ADDTOCART', payload: res?.data });
    });
    toast.success('Successfully Remove Product');
  };
  return (
    <li className={`onhover-dropdown cart-dropdown${isCartOpen ? ' show' : ''}`}>
      <Btn
        attrBtn={{
          type: 'button',
          className: 'btn-solid-default btn-spacing',
          onClick: () => isOpen(),
        }}>
        <ShoppingCart className='pe-sm-2' />
        <span>
          {symbol}
          {(getTotalPrice() * currencyValue).toFixed(2)}
        </span>
      </Btn>
      <div className='onhover-div'>
        <div className='cart-menu'>
          <div className='cart-title'>
            <h6>
              <ShoppingBag />
              <span className='label label-theme rounded-pill'>{cartData?.length}</span>
            </h6>
            <span className='d-md-none d-block' onClick={() => isOpen()}>
              <i className='fas fa-arrow-right back-cart'></i>
            </span>
          </div>
          <ul className='custom-scroll'>
            {cartData?.length > 0 ? (
              cartData?.map((item) => {
                return (
                  <li key={item.id}>
                    <Media>
                      {item?.images?.slice(0, 1).map((img) => {
                        return <img src={`${CommonPath}/${img.src}`} className='img-fluid' alt='custom' key={img.src} />;
                      })}
                      <Media body>
                        <h6>{item.name}</h6>
                        <div className='qty-with-price'>
                          <span>
                            {symbol} {(item.price * currencyValue).toFixed(2)}
                          </span>
                          <span>
                            <Input type='number' className='form-control' defaultValue='1' min={1} />
                          </span>
                        </div>
                      </Media>
                      <Btn
                        attrBtn={{
                          type: 'button',
                          className: 'btn-close d-block d-md-none',
                          onClick: () => removeProduct(item),
                        }}>
                        <i className='fas fa-times'></i>
                      </Btn>
                    </Media>
                  </li>
                );
              })
            ) : (
              <li>
                <img src={`${CommonPath}/cartEmpty.png`} className='img-fluid' alt='cartEmpty' />
              </li>
            )}
          </ul>
        </div>
        <TotalPrice getTotalPrice={getTotalPrice} />
      </div>
    </li>
  );
};
export default ItemCart;
