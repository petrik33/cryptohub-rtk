import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input } from 'antd'
import { IGetCoinResponseCoin, defaultCoinsNum, useGetCoinsQuery } from '../../Services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';
import Title from 'antd/es/typography/Title';

export interface ICryptocurrenciesProps {
  simplified?: true
}

const Cryptocurrencies : React.FC<ICryptocurrenciesProps> = (props) => {
  const count = props.simplified ? 12 : defaultCoinsNum;
  const { data, isFetching } = useGetCoinsQuery({count});

  const [cryptos, setCryptos] = 
    useState<IGetCoinResponseCoin[] | undefined>([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const coins = data?.data.coins;
    const filteredData = coins?.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setCryptos(filteredData);

  }, [data, searchTerm]);

  if(isFetching) {
    return <Title level={2}>Loading...</Title>;
  }

  const cryptosColumns = mapCryptos(cryptos);

  return (
    <>
      {!props.simplified &&
        <div className="search-crypto">
          <Input 
            placeholder='Search Cryptocurrency' 
            onChange={(e) => { setSearchTerm(e.target.value) }} 
          />
        </div>
      }
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptosColumns}
      </Row>
    </>
  );
}

const mapCryptos = (cryptos: IGetCoinResponseCoin[] | undefined) => {
    if(!cryptos) {
      return <Title level={2}>Loading...</Title>;
    }

    return cryptos.map((currency) => (
      <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
        <Link to={`/cryptohub-rtk/crypto/${currency.uuid}`}>
          {getCurrencyCard(currency)}
        </Link>
      </Col>
    ))
}

const getCurrencyCard = (currency: IGetCoinResponseCoin) => {
  return (
    <Card
      title={`${currency.rank}. ${currency.name}`}
      extra={
        <img 
          className='crypto-image' 
          src={currency.iconUrl}
          alt={`${currency.name} crypto currency logo`}
        />
      }
      hoverable
    >
      <p>
        Price: {millify(Number.parseFloat(currency.price))}
      </p>
      <p>
        Market Cap: {millify(Number.parseInt(currency.marketCap))}
      </p>
      <p>
        Daily Change: {millify(Number.parseFloat(currency.change))}%
      </p>
    </Card>
  )
}

export default Cryptocurrencies;