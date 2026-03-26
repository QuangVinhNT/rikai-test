type Metadata = {
  currentPage: number;
  lastPage: number;
  limit: number;
  total: number;
}
export type BaseResponse<T, M = Metadata> = {
  data: T;
  status?: string;
  message?: string;
  meta?: M
}
