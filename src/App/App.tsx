import React from 'react';
import { Navbar } from '../Components';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { CryptoDetails, Cryptocurrencies, Homepage, News } from '../Pages';
import { Space, Layout, Typography } from 'antd';

const App : React.FC = () => {
  return (
    <div className='app'>
      <nav className='navbar'>
        <Navbar />
      </nav>
      <main className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/cryptohub-rtk' element={<Homepage />} />
              <Route path='/cryptohub-rtk/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/cryptohub-rtk/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/cryptohub-rtk/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <footer className='footer'>
          <Typography.Title 
            level={5} 
            style={{color: 'white', textAlign: 'center'}}
          >
              CryptoHub <br />
              Made by petrik33
          </Typography.Title>
          <Space>
            <Link to='/cryptohub-rtk/'>Home</Link>
            <Link to='/cryptohub-rtk/cryptocurrencies'>
              Cryptocurrencies
            </Link>
            <Link to='/cryptohub-rtk/news'>News</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
}

export default App;