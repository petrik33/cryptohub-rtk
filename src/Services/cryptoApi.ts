import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '8d5bd050famsh29095876256dab5p18e012jsnf91ca09d30c0',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url : string) => ({ url, headers: cryptoApiHeaders});

const cryptoApi = createApi({
  reducerPath: 'crypto',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/coins')
    })
  })
})

export default cryptoApi;