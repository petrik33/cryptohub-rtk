import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCoinByIdQuery, IGetCoinByIdResponseCoin, useGetCoinHistoryByIdQuery } from '../../Services/cryptoApi';
import millify from 'millify';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Col, Row, Select, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import LineChart from '../../Components/Linechart/Linechart';

const { Text, Title } = Typography;

export interface ICryptoDetailsProps {
  
}

const CryptoDetails : React.FC<ICryptoDetailsProps> = (props) => {
  const { coinId } = useParams();

  const [timePeriod, setTimePeriod] = useState('7d');

  const { data: coinData, isFetching: coinFetching } = 
    useGetCoinByIdQuery(getQueryCoinID(coinId));
  const { data: coinHistoryData }
    = useGetCoinHistoryByIdQuery({ 
      coinId: getQueryCoinID(coinId), 
      timePeriod 
    });

  if(coinFetching || !coinData) {
    return <Title level={2}>Loading...</Title>
  }

  const coin = coinData.data.coin;

  const timeOptions = mapTimeFrames();
  const coinStats = mapStats(getCoinStats(coin));
  const coinGenericStats = mapStats(getGenericStats(coin));
  const coinLinks = mapCoinLinks(coin);

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          <img 
            className='title-crypto-logo' 
            src={coin.iconUrl}
            alt={`${coin.name} crypto currency logo`}
          />
          {coin.name} Price
        </Title>
        <p>
          {HTMLReactParser(coin.description)}
        </p>
      </Col>

      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => {setTimePeriod(value)}}
      >
        {timeOptions}
      </Select>

      <LineChart 
        coinHistory={coinHistoryData?.data} 
        coinName={coin.name}
        currentPrice={millify(Number.parseFloat(coin.price))}
      />

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title 
              level={3} 
              className='coin-details-heading'
            >
              {coin.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {coin.name}
            </p>
          </Col>
          {coinStats}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title 
              level={3} 
              className='coin-details-heading'
            >
              {coin.name} Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {coinGenericStats}
        </Col>
      </Col>
      <Col className='coin-links'>
        <Title level={3} className='coin-details-heading'>
          {coin.name} links
        </Title>
        {coinLinks}
      </Col>
    </Col>
  );
}

const mapCoinLinks = (coin: IGetCoinByIdResponseCoin) => {
  return coin.links.map((link, idx) => (
    <Row className='coin-link' key={idx}>
      <Title level={5} className='link-name'>
        {link.type}
      </Title>
      <a href={link.url} target='_blank' rel='noreferrer'>
        {link.name}
      </a>
    </Row>
  ))
}

const mapStats = (stats: ICoinStat[]) => {
  return stats.map(({ icon, title, value}, index) => (
    <Col className='coin-stats' key={index}>
      <Col className='coin-stats-name' key={index}>
        <Text>{icon}</Text>
        <Text>{title}</Text>
      </Col>
      <Text className='stats'>
        {value}
      </Text>
    </Col>
  ))
}

const mapTimeFrames = () => {
  return timeFrames.map((frame) => (
    <Select.Option key={frame}>
      {frame}
    </Select.Option>
  ))
}

export interface ICoinStat {
  title: React.ReactNode;
  value: React.ReactNode;
  icon: React.ReactNode;
}

const getCoinStats = (data: IGetCoinByIdResponseCoin) => [
  { 
    title: 'Price to USD', 
    value: `$ ${millify(Number.parseInt(data.price))}`, 
    icon: <DollarCircleOutlined /> 
  },
  { 
    title: 'Rank', 
    value: data?.rank, 
    icon: <NumberOutlined /> 
  },
  { 
    title: '24h Volume', 
    value: `$ ${millify(Number.parseInt((data['24hVolume'])))}`, 
    icon: <ThunderboltOutlined /> 
  },
  { 
    title: 'Market Cap', 
    value: `$ ${millify(Number.parseInt(data.marketCap))}`, 
    icon: <DollarCircleOutlined /> 
  },
  { 
    title: 'All-time-high(daily avg.)', 
    value: `$ ${millify(Number.parseFloat(data.allTimeHigh.price))}`, 
    icon: <TrophyOutlined /> },
];

const getGenericStats = (data: IGetCoinByIdResponseCoin) => [
  {
    title: "Number Of Markets",
    value: data.numberOfMarkets,
    icon: <FundOutlined />,
  },
  {
    title: "Number Of Exchanges",
    value: data.numberOfExchanges,
    icon: <MoneyCollectOutlined />,
  },
  {
    title: "Aprroved Supply",
    value: data.supply.confirmed ? <CheckOutlined /> : <StopOutlined />,
    icon: <ExclamationCircleOutlined />,
  },
  {
    title: "Total Supply",
    value: `$ ${millify(Number.parseInt(data?.supply?.total))}`,
    icon: <ExclamationCircleOutlined />,
  },
  {
    title: "Circulating Supply",
    value: `$ ${millify(Number.parseInt(data.supply.circulating))
    }`,
    icon: <ExclamationCircleOutlined />,
  },
];

const timeFrames = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

const getQueryCoinID = (param: string | undefined) => {
  if(!param) {
    return '';
  }
  return param;
}

export default CryptoDetails;