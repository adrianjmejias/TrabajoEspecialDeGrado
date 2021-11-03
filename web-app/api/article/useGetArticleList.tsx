import { queryFactory } from "../wikimetrix";

export type GetArticleListResponse = {
  ns: number;
  pageid: number;
  title: string;
  locale: string;

  // TODO: Check these are transformed into dates
  first_extraction_date: Date;
  last_extraction_date: Date;

  // Wtf does this mean
  last_revision_extracted: number;
}[];

const p = queryFactory<GetArticleListResponse>({
  url: "articles",
  method: "GET",
});

export const getArticleListQuery = p.axiosQuery;
export const useGetArticleListQuery = p.useAxiosQuery;

export default useGetArticleListQuery;
