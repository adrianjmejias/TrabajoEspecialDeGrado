import React from "react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export const wikiaxios = axios.create({
  baseURL: "http://localhost/api/v1/",
});

export type QueryHookReturn<QueryResponse> = {
  loading: boolean;
  data?: QueryResponse;
  status?: number;
  error?: AxiosError;
};

export type LazyQueryHookReturn<QueryResponse> =
  QueryHookReturn<QueryResponse> & {
    lazyQuery: Promise<void | AxiosResponse<QueryResponse, any>>;
  };

export const queryFactory = <Response>(
  defaultConfig: AxiosRequestConfig<Response>
) => {
  const axiosQuery = (config: AxiosRequestConfig<Response>) =>
    wikiaxios.request<Response>({ ...config, ...defaultConfig });

  const useAxiosQuery: (
    hookConfig: AxiosRequestConfig<Response>
  ) => QueryHookReturn<Response> = (hookConfig) => {
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
        .catch((error) => {
          error.message = error.response.data.message;
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return { loading, data, status, error };
  };

  const useAxiosLazyQuery: (
    hookConfig: AxiosRequestConfig<Response>
  ) => QueryHookReturn<Response> = (hookConfig) => {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<Response>();
    const [status, setStatus] = React.useState<number>();
    const [error, setError] = React.useState<AxiosError>();

    const lazyQuery = React.useCallback(() => {
      setLoading(true);
      return axiosQuery(hookConfig)
        .then((res) => {
          setData(res.data);
          setStatus(res.status);

          console.group(`${defaultConfig.method} -> "${defaultConfig.url}"`);
          {
            console.log(`res.data`, res.data);
            console.log(`res.status`, res.status);
          }
          console.groupEnd();

          return res;
        })
        .catch(setError)
        .finally(() => {
          setLoading(false);
        });
    }, []);

    return { lazyQuery, loading, data, status, error };
  };

  return { axiosQuery, useAxiosQuery, useAxiosLazyQuery };
};
