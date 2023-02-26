import { Col, Row, Statistic } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

const Homepage : React.FC = () => {
  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title='Total Cryptocurrencies' value={5} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Exchanges' value={5} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Market Cap' value={5} />
        </Col>
        <Col span={12}>
          <Statistic title='Total 24h Volume' value={5} />
        </Col>
        <Col span={12}>
          <Statistic title='Total Markets' value={5} />
        </Col>
      </Row>
    </>
  );
}

export default Homepage;