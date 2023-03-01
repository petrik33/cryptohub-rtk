import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IGetCoinResponseStats {
  total: number,
  totalCoins: number,
  totalMarkets: number,
  totalExchanges: number,
  totalMarketCap: string,
  total24hVolume: string
}

export interface IGetCoinResponseCoin {
  uuid: string,
  symbol: string,
  name: string,
  color: string,
  iconUrl: string,
  '24hVolume': string,
  marketCap: string,
  price: string,
  btcPrice: string,
  listedAt: number | null,
  change: string,
  rank: number,
  sparkline: string[],
  coinrankingUrl: string
}

export interface IGetCoinByIdResponseCoinLink {
  name: string,
  url: string,
  type: string
}

export interface IGetCoinByIdResponseCoinSupply {
  confirmed: boolean;
  supplyAt: number | null;
  total: string;
  circulating: string;
  max: string;
}

export interface ICoinPrice {
  price: string;
  timestamp: number;
}

export interface IGetCoinsResponse {
  status: 'success',
  data: {
    stats: IGetCoinResponseStats
    coins: IGetCoinResponseCoin[]
  }
}

export interface IGetCoinByIdResponseCoin extends IGetCoinResponseCoin {
  description: string;
  websiteUrl: string;
  links: IGetCoinByIdResponseCoinLink[];
  supply: IGetCoinByIdResponseCoinSupply;
  fullyDilutedMarketCap: string;
  priceAt: number | null;
  numberOfMarkets: number;
  numberOfExchanges: number;
  allTimeHigh: ICoinPrice;
  lowVolume: boolean;
  notices: Object[] | null;
  tags: string[] | null;
}

export interface IGetCoinByIdResponse  {
  status: 'success',
  data: {
    coin: IGetCoinByIdResponseCoin
  }
}

export interface IGetCoinHistoryByIdResponse {
  status: 'success',
  data: {
    change: string;
    history: ICoinPrice[]
  }
}

export interface IGetCoinsRequest {
  count?: number
}

export interface IGetCoinHistoryByIdRequest {
  coinId: string;
  timePeriod: string;
}

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '8d5bd050famsh29095876256dab5p18e012jsnf91ca09d30c0',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url : string) => ({ url, headers: cryptoApiHeaders});

const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query<IGetCoinsResponse, IGetCoinsRequest | void>({
      query: (params) => getCoinsUrl(params)
    }),
    getCoinById: builder.query<IGetCoinByIdResponse, string>({
      query: (coinId) => getCoinByIdUrl(coinId)
    }),
    getCoinHistoryById: builder.query<IGetCoinHistoryByIdResponse,IGetCoinHistoryByIdRequest>({
      query: (params) => getCoinHistoryByIdUrl(params)
    })
  })
})

const getCoinHistoryByIdUrl = 
  (params: IGetCoinHistoryByIdRequest) => {
    return createRequest(`/coin/${params.coinId}/history?timePeriod=${params.timePeriod}`);
}

const getCoinsUrl = 
  (params: IGetCoinsRequest | void) => {
    let url = '/coins';

    if(!params) {
      return createRequest(url);
    }

    if(params.count) {
      url += `?limit=${params.count}`;
    }
    
    return createRequest(url);
}

const getCoinByIdUrl = (coinId: string) => {
  return createRequest(`/coin/${coinId}`);
}

export const {
  useGetCoinsQuery,
  useGetCoinByIdQuery,
  useGetCoinHistoryByIdQuery
} = cryptoApi;

export const defaultCoinsNum = 100;

export default cryptoApi;