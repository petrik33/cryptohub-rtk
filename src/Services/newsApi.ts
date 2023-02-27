import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ISearchNewsResponsePublisher {
  name: string,
  url: string
}

export interface ISearchNewsResponseArticle {
  title: string,
  url: string,
  published_date: string,
  publisher: ISearchNewsResponsePublisher
}

export interface ISearchNewsResponse {
  status: 'success',
  totalResults: number,
  articles: ISearchNewsResponseArticle[]
}

export interface ISearchNewsRequest {
  q: string,
  from?: Date,
  to?: Date,
  publisher?: string[],
  pageSize?: number,
  language?: string,
  country?: string
}

const newsApiHeaders = {
  'x-rapidapi-subscription': 'ultra',
  'x-rapidapi-proxy-secret': 'c02cea90-4588-11eb-add9-c577b8ecdc8e',
  'x-rapidapi-user': 'suprikurniyanto',
  'X-RapidAPI-Key': '8d5bd050famsh29095876256dab5p18e012jsnf91ca09d30c0',
  'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
}

const baseUrl = 'https://news-api14.p.rapidapi.com';

const createRequest = (url : string) => ({ url, headers: newsApiHeaders});

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    searchNews: builder.query<ISearchNewsResponse, ISearchNewsRequest>({
      query: ({
        q = defaultSearchQuery,
        from = getDayAgo(),
        to = new Date(),
        publisher = defaultPublishers,
        pageSize = defaultPageSize,
        language = defaultLang,
        country = defaultCountry
      }) => {
        return searchNewsUrl({q, from, to, publisher, pageSize, language, country});
      }
    })
  })
})

const defaultSearchQuery = 'cryptocurrencies';
const defaultPageSize = 10;
const defaultPublishers = ['cnn.com','bbc.com'];
const defaultLang = 'en';
const defaultCountry = 'us';

const getDayAgo = () => {
  let dateTime = new Date();
  dateTime.setDate(dateTime.getDate() - 1);
  return dateTime;
}

const searchNewsUrl = (params: ISearchNewsRequest) => {
  let url = './search?';

  url += `q=${params.q}`;

  if(params.country) {
    url += `&country=${params.country}`;
  }

  if(params.language) {
    url += `&language=${params.language}`;
  }

  if(params.pageSize) {
    url += `&pageSize=${params.pageSize.toString()}`;
  }

  if(params.from) {
    url += `&from=${params.from.toISOString()}`;
  }

  if(params.to) {
    url += `&to=${params.to.toISOString()}`;
  }

  if(params.publisher) {
    const num = params.publisher.length;
    if(num > 0) {
      url += '&publisher=';
    
      for(let i = 0; i < num; i++) {
        const page = params.publisher[i];
        url += `${page}`;
        if(i < num - 1) {
          url += `%2C%20`;
        }
      }
    }
  }

  return createRequest(url);
}

export const {
  useSearchNewsQuery
} = newsApi;

export default newsApi;