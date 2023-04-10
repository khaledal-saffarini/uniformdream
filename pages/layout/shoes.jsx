import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CommonPath, ShoesStore } from '../../Components/Constant';
import FashionService from '../../Components/FashionDemo/FashionService';
import FlowerBrand from '../../Components/FlowerDemo/FlowerBrand';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import ShoesBannerMiddle from '../../Components/ShoesDemo/ShoesBannerMiddle';
import ShoesCategory from '../../Components/ShoesDemo/ShoesCategory';
import ShoesDeal from '../../Components/ShoesDemo/ShoesDeal';
import ShoesHomeSlider from '../../Components/ShoesDemo/ShoesHomeSlider';
import ShoesLatestProduct from '../../Components/ShoesDemo/ShoesLatestProduct';
import ShoesNewArrival from '../../Components/ShoesDemo/ShoesNewArrival';
import ShoesTopBanner from '../../Components/ShoesDemo/ShoesTopBanner';
import Layout5 from '../../Layout/Layout5';
import { getAPIData } from '../../Utils';
import StartModel from '../../Layout/Element/StartModel';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Shoes = () => {
  const [bannerData, setBannerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [mainSlider, setMainSlider] = useState([]);
  const [categoryBanner, setCategoryBanner] = useState([]);
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', '#7520dd');
    const types = ['banner', 'products', 'homeslider', 'popular', 'tabsection', 'categorybanner'];
    types.map((type) => {
      getAPIData(`${process.env.API_URL}${type}`).then((res) => {
        type === 'banner' && setBannerData(res?.data);
        type === 'products' && setProductData(res?.data);
        type === 'homeslider' && setMainSlider(res?.data);
        type === 'categorybanner' && setCategoryBanner(res?.data);
      });
    });
  }, []);
  const isCategories = true;
  const removePadding = true;
  return (
    <Layout5 isCategories={isCategories}>
      <Head>
        <title>{ShoesStore}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/3.png`} />
      </Head>
      <ShoesHomeSlider mainSlider={mainSlider} />
      <FashionService removePadding={removePadding} />
      <ShoesTopBanner bannerData={bannerData} />
      <ShoesLatestProduct productData={productData} />
      <ShoesBannerMiddle bannerData={bannerData} />
      <ShoesCategory categoryBanner={categoryBanner} />
      <ShoesNewArrival productData={productData} />
      <ShoesDeal bannerData={bannerData} />
      <FlowerSubscribe />
      <FlowerBrand />
      <StartModel />
    </Layout5>
  );
};
export default Shoes;
