import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { ICoinPrice, IGetCoinHistoryByIdResponse } from '../../Services/cryptoApi';
import { ChartData, ChartOptions, CategoryScale, Chart, LinearScale, PointElement, LineController, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement);

const { Title } = Typography;

export interface ILineChartProps {
  coinHistory: IGetCoinHistoryByIdResponse['data'] | undefined;
  currentPrice: string;
  coinName: string;
}

const LineChart : React.FC<ILineChartProps> = (props) => {
  if(!props.coinHistory) {
    return <Title level={3}>Loading...</Title>
  }

  const history = props.coinHistory.history;

  const data: ChartData<'line'> = {
    labels: getCoinTimeStampHistory(history),
    datasets: [
      {
        label: 'Price in USD',
        data: getCoinPriceHistory(history),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd'
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true
  }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {props.coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {props.coinHistory?.change}%
          </Title>
          <Title level={5} className='current-price'>
            Current {props.coinName} Price: 
            $ {props.currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

const getCoinPriceHistory = (history: ICoinPrice[]) => {
  return history.slice().reverse().map((priceStamp) => {
    return Number.parseFloat(priceStamp.price);
  });
}

const getCoinTimeStampHistory = (history: ICoinPrice[]) => {
  return history.slice().reverse().map((priceStamp) => {
    const date = new Date(priceStamp.timestamp*1000);
    return date.toLocaleDateString();
  });
}

export default LineChart;