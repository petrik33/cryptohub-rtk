import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi, newsApi } from '../Services/';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath] : newsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(newsApi.middleware)
});