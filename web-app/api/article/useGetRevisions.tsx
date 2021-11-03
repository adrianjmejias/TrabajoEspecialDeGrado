import { queryFactory } from "../wikimetrix";

export type GetRevisionsResponse = Partial<{
  comment: string;
  size: number;
  contentformat: string;
  pageid: number;
  tags: [];
  locale: string;
  timestamp: string;
  "*": string;
  userid: number;
  revid: number;
  contentmodel: string;
  extraction_date: string;
  parentid: number;
  title: string;
  _id: {
    $oid: "6158b199d61e8295cfe77b12";
  };
  minor: "";
  user: string;
}>[];

const p = queryFactory<GetRevisionsResponse>({
  url: "revisions",
  method: "GET",
});

export const getRevisionsQuery = p.axiosQuery;
export const useGetRevisionsQuery = p.useAxiosQuery;

export default useGetRevisionsQuery;
