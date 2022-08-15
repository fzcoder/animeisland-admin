import React from 'react';
import { Outlet, } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import "./styles/service-page.css";

export declare type ServicePageProps = {
  left?: React.ReactNode,
  main?: React.ReactNode,
  menuProps?: MenuProps,
}
const ServicePage: React.FC<ServicePageProps> = ({ left, main, menuProps }) => {
  return (
    <div className='app-component-template-service-page'>
      <div className='app-component-template-service-page-left'>
        { left ? left : <Menu style={{height: "100%"}}  {...menuProps} />}
      </div>
      <div className='app-component-template-service-page-main'>
        { main ? main : <Outlet /> }
      </div>
    </div>
  )
}

export default ServicePage;
