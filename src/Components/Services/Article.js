import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "6027331747msh65aa3864a9cf1cep1efc50jsn6fcc1a7c5249"
      );
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: ({ articleUrl, length }) =>
        `/summarize?url=${encodeURIComponent(articleUrl)}&length=${length}`,
    }),
  }),
});
export const { useLazyGetSummaryQuery } = articleApi;
