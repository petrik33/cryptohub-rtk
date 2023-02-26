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
  listeadAt: number | null,
  change: string,
  rank: number,
  sparkline: string[],
  coinrankingUrl: string
}

export interface IGetCoinsResponse {
  status: 'success',
  data: {
    stats: IGetCoinResponseStats
    coins: IGetCoinResponseCoin[]
  }
}

export interface IGetCoinsRequestParams {
  count?: number
}

export type GetCoinsQueryArgs = IGetCoinsRequestParams | void;

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '8d5bd050famsh29095876256dab5p18e012jsnf91ca09d30c0',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url : string) => ({ url, headers: cryptoApiHeaders});

const cryptoApi = createApi({
  reducerPath: 'getCoins',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query<IGetCoinsResponse, GetCoinsQueryArgs>({
      query: (params) => {
        let url = './coins';

        if(!params) {
          return createRequest(url);
        }

        if(params.count) {
          url += `?limit=${params.count}`;
        }
        
        return createRequest(url);
      }
    })
  })
})

export const { useGetCoinsQuery } = cryptoApi;

export default cryptoApi;