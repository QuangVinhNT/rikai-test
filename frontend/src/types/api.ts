type Metadata = {
  currentPage: number;
  lastPage: number;
  limit: number;
  total: number;
}

type AdditionalData = {
  outOfStock?: number;
}
export type BaseResponse<T, M = Metadata, A = AdditionalData> = {
  data: T;
  status?: string;
  message?: string;
  meta?: M;
  additionalData: A;
}
