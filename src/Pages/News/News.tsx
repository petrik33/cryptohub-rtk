import React, { useState } from 'react';
import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';

import { ISearchNewsResponse, defaultSearchQuery, useSearchNewsQuery } from '../../Services/newsApi';
import { useGetCoinsQuery, defaultCoinsNum, IGetCoinsResponse } from '../../Services/cryptoApi';

const { Title } = Typography;
const { Option } = Select;

export interface INewsProps {
  simplified?: true
}

const News : React.FC<INewsProps> = (props) => {
  const { data: cryptosData } = 
    useGetCoinsQuery({
      count: defaultCoinsNum
  });

  const [searchCrypto, setSearchCrypto] = 
    useState(defaultSearchQuery);

  const { data: newsData, isFetching: newsFetching } =
    useSearchNewsQuery({
      q: searchCrypto,
      pageSize: getPageSize(props.simplified)
  });

  const news = mapNews(newsData);
  const coinOptions = mapCoins(cryptosData);

  return (
    <Row gutter={[ 24, 24]}>
      {!props.simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => {setSearchCrypto(value)}}
          >
            <Option value={defaultSearchQuery}>
              All Cryptos
            </Option>
            {coinOptions}
          </Select>
        </Col>
      )}
      {newsFetching 
        ? <Title level={2}>Loading...</Title>
        : news}
    </Row>
  );
}

const mapNews = (cryptoNews: ISearchNewsResponse | undefined) => {
  if(!cryptoNews) {
    return <Title level={2}>Loading...</Title>
  }
  const articles = cryptoNews.articles;

  if(articles.length <= 0) {
    return <Title level={2}>No News...</Title>
  }
  
  return articles.map((article, idx) => (
    <Col xs={36} sm={24} lg={12} key={idx}>
      <Card
        title= {
          <a 
            href={article.publisher.url}
            title={article.publisher.name}
          >
            {article.publisher.name}
          </a> 
        }
        extra= {
          moment(article.published_date)
            .startOf('seconds')
            .fromNow()
        } 
        hoverable 
        className='news-card'
      >
        <a 
          href={article.url} 
          target='_blank' 
          rel='noreferrer'
          title={article.title}
        >
          <Title className='news-title' level={4}>
            {article.title}
          </Title>
        </a>
      </Card>
    </Col>
  ));
}

const mapCoins = 
  (cryptosData: IGetCoinsResponse | undefined) => {
    if(!cryptosData) {
      return null;
    }
    const coins = cryptosData.data.coins;
    return coins.map((coin) => (
      <Option value={coin.name}>
        {coin.name}
      </Option>
    ))
}

const getPageSize = (simplified: boolean | undefined) => {
  return simplified ? pageSizeSimplified : pageSizeFull;
}

const pageSizeSimplified = 4;
const pageSizeFull = 10;

export default News;