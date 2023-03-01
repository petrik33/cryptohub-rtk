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

export interface IGetCoinByIdResponseCoinAllTimeHigh {
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
  allTimeHigh: IGetCoinByIdResponseCoinAllTimeHigh;
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

export interface IGetCoinsRequestParams {
  count?: number
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
    getCoins: builder.query<IGetCoinsResponse, IGetCoinsRequestParams | void>({
      query: (params) => getCoinsUrl(params)
    }),
    getCoinById: builder.query<IGetCoinResponseCoin, string>({
      query: (coinId) => getCoinByIdUrl(coinId)
    })
  })
})

const getCoinsUrl = 
  (params: IGetCoinsRequestParams | void) => {
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
  useGetCoinByIdQuery
} = cryptoApi;

export const defaultCoinsNum = 100;

export default cryptoApi;