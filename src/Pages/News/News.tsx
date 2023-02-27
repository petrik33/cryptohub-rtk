import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';

import { ISearchNewsResponse, defaultSearchQuery, useSearchNewsQuery } from '../../Services/newsApi';

const { Text, Title } = Typography;
const { Option } = Select;

export interface INewsProps {
  simplified?: true
}

const News : React.FC<INewsProps> = (props) => {
  const { data: cryptoNews, isFetching } 
    = useSearchNewsQuery({
      q: 'cryptocurrencies',
      pageSize: props.simplified ? 6 : 12
  });

  console.log(cryptoNews);

  if(isFetching || !cryptoNews) {
    return <Title level={2}>Loading...</Title>
  }

  const news = mapNews(cryptoNews);

  return (
    <Row gutter={[ 24, 24]}>
      {news}
    </Row>
  );
}

const mapNews = (cryptoNews: ISearchNewsResponse) => {
  const articles = cryptoNews.articles;

  if(articles.length <= 0) {
    return <Title level={2}>No News...</Title>
  }
  
  return articles.map((article, idx) => (
    <Col xs={24} sm={12} lg={6} key={idx}>
      <Card
        extra={
          `${article.publisher.name} - 
          ${article.published_date}`
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
          <div className="news-image-container">
            <Title className='news-title' level={4}>
              {article.title}
            </Title>
          </div>
        </a>
      </Card>
    </Col>
  ));
}

export default News;