import React from 'react';
import { Navbar } from '../Components';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { CryptoDetails, Cryptocurrencies, Exchanges, Homepage, News } from '../Pages';
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
              <Route path='/' element={<Homepage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <footer className='footer'>
          <Typography.Title 
            level={5} 
            style={{color: 'white', textAlign: 'center'}}
          >
              Cryptoverse <br />
              Made by ?
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
}

export default App;