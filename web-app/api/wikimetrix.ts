import React from "react";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export const wikiaxios = axios.create({
  baseURL: "http://localhost/api/v1/",
});

export const queryFactory = <Response>(
  defaultConfig: AxiosRequestConfig<Response>
) => {
  const axiosQuery = (config: AxiosRequestConfig<Response>) =>
    wikiaxios.request<Response>({ ...config, ...defaultConfig });

  const useAxiosQuery = (hookConfig: AxiosRequestConfig<Response>) => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<Response>();
    const [status, setStatus] = React.useState<number>();
    const [error, setError] = React.useState<AxiosError>();

    React.useEffect(() => {
      axiosQuery(hookConfig)
        .then((res) => {
          setData(res.data);
          setStatus(res.status);

          console.group(`${defaultConfig.method} -> "${defaultConfig.url}"`);
          {
            console.log(`res.data`, res.data);
            console.log(`res.status`, res.status);
          }
          console.groupEnd();
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return { loading, data, status, error };
  };

  return { axiosQuery, useAxiosQuery };
};
