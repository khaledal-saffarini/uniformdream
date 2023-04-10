import React from 'react';
import Head from 'next/head';
import { CommonPath } from '../../Components/Constant';
import BreadCrumb from '../../Components/Element/BreadCrumb';
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout1 from '../../Layout/Layout1';
import BlogRightSidebarContain from '../../Components/Blog/BlogRightSidebar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ['common'])) } });

const BlogRightSidebar = () => {
  return (
    <Layout1>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/x-icon' href={`${CommonPath}/favicon/2.png`} />
      </Head>
      <BreadCrumb parent={'Blog Right Sidebar'} title={'Blog Right Sidebar'} />
      <BlogRightSidebarContain />
      <FlowerSubscribe />
    </Layout1>
  );
};

export default BlogRightSidebar;
