export interface ResultData<T> {
  ok: true;
  data: T;
}

export interface ResultError {
  ok: false;
  error: {
    code: number;
    message: string;
    fieldErrors?: Record<string, string>;
  };
}

export type Result<T> = ResultData<T> | ResultError;
