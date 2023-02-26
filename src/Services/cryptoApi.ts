import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IGetCoinsResponse {
  status: 'success',
  data: {
    stats: {
      total: number,
      totalCoins: number,
      totalMarkets: number,
      totalExchanges: number,
      totalMarketCap: string,
      total24hVolume: string
    }
    coins: {
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
    }[]
  }
}

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
    getCoins: builder.query<IGetCoinsResponse, void>({
      query: () => createRequest('/coins')
    })
  })
})

export const { useGetCoinsQuery } = cryptoApi;

export default cryptoApi;