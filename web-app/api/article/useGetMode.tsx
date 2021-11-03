import { queryFactory } from "../wikimetrix";

export type GetArticleListResponse = {

}[];

const p = queryFactory<GetArticleListResponse>({
  url: "mode",
  method: "GET",
});

export const getModeQuery = p.axiosQuery;
export const useGetModeQuery = p.useAxiosQuery;

export default useGetModeQuery;
