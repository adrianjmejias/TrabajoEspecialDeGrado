import { queryFactory } from "../wikimetrix";

export interface GetArticleListResponse {
  hola: string;
}

const p = queryFactory<GetArticleListResponse>({
  url: "articles",
  method: "GET",
});

export const getArticleList = p.axiosQuery;
export const useGetArticleList = p.useAxiosQuery;

export default useGetArticleList;
