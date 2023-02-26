import { Col, Row, Statistic } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { IGetCoinsResponse, useGetCoinsQuery } from '../../Services/cryptoApi';
import millify from 'millify';

const Homepage : React.FC = () => {
  const { data, isFetching } = useGetCoinsQuery();

  console.log(data);

  if(isFetching) {
    return <Title level={2} className='heading'>Loading...</Title>;
  }

  const totalStats = getTotalStats(data);

  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic 
            title='Total Cryptocurrencies' 
            value={totalStats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title='Total Exchanges' 
            value={totalStats.exchanges} 
          />
        </Col>
        <Col span={12}>
          <Statistic 
            title='Total Market Cap' 
            value={totalStats.cap} 
        />
        </Col>
        <Col span={12}>
          <Statistic 
            title='Total 24h Volume' 
            value={totalStats.volume} 
        />
        </Col>
        <Col span={12}>
          <Statistic 
            title='Total Markets' 
            value={totalStats.markets} 
          />
        </Col>
      </Row>
    </>
  );
}

const getTotalStats = (data: IGetCoinsResponse | undefined)  => {
  if(!data) {
    return {
      total: undefined,
      exchanges: undefined,
      cap: undefined,
      volume: undefined,
      markets: undefined
    };
  }

  const statsResponse = data.data.stats;
  const statsOut = {
    total: statsResponse.total,
    exchanges: millify(statsResponse.totalExchanges),
    cap: millify(Number.parseInt(statsResponse.totalMarketCap)),
    volume: millify(Number.parseInt(statsResponse.total24hVolume)),
    markets: millify(statsResponse.totalMarkets)
  }

  return statsOut;
}

export default Homepage;