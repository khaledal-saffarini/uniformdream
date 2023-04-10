import Head from 'next/head';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import Layout1 from '../../Layout/Layout1';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe/index';
import SectionCheckout from '../../Components/Pages/Checkout';
import { firebase_app } from '../../Config/firebase';
import Logins from './login';

export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const Checkout = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    firebase_app.auth().onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <>
      {currentUser !== null ? (
        <Layout1>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
          </Head>
          <BreadCrumb parent={'Checkout'} title={'Checkout'} />
          <SectionCheckout />
          <FlowerSubscribe />
        </Layout1>
      ) : (
        <Logins />
      )}
    </>
  );
};

export default Checkout;
