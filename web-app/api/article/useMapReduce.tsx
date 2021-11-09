import { queryFactory } from "../wikimetrix";

export type GetMapReduceResponse = Partial<{}>[];

const p = queryFactory<GetMapReduceResponse>({
  url: "mapreduce",
  method: "GET",
});

export const getMapReduceQuery = p.axiosQuery;
export const useMapReduceQuery = p.useAxiosQuery;
export const useMapReduceLazyQuery = p.useAxiosLazyQuery;

export default useMapReduceQuery;
