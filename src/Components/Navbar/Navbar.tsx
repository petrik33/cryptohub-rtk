import React from 'react';
import { Avatar, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../../Images/cryptocurrency.png';

const Navbar : React.FC = () => {
  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={icon} />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme='dark'>
        <Menu.Item key='home' icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='cryptos' icon={<FundOutlined />}>
          <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item key='exchanges' icon={<MoneyCollectOutlined />}>
          <Link to='/exchanges'>Exchanges</Link>
        </Menu.Item>
        <Menu.Item key='newss' icon={<BulbOutlined />}>
          <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;