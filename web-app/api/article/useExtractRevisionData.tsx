import { queryFactory } from "../wikimetrix";

export type GetExtractRevisionsResponse = Partial<{}>[];

const p = queryFactory<GetExtractRevisionsResponse>({
  url: "extract",
  method: "GET",
});

export const getRevisionDataQuery = p.axiosQuery;
export const useExtractRevisionDataQuery = p.useAxiosQuery;
export const useExtractRevisionDataLazyQuery = p.useAxiosLazyQuery;

export default useExtractRevisionDataQuery;
