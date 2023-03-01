import React, { useEffect, useState } from 'react';
import { Avatar, Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../../Images/cryptocurrency.png';

const minLandWidth = 768;

const Navbar : React.FC = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] 
    = useState({} as number);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(screenSize >= minLandWidth);
  }, [screenSize])

  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={icon} />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>CryptoHub</Link>
        </Typography.Title>
        <Button 
          className='menu-control-container'
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item key='home' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='cryptos' icon={<FundOutlined />}>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key='news' icon={<BulbOutlined />}>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
      
    </div>
  );
}

export default Navbar;