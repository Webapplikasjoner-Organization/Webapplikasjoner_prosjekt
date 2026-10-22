export interface ResultData<T> {
  ok: true;
  data: T;
  code: number;
}

export interface ResultError {
  ok: false;
  error: {
    code: number;
    message: string;
    fieldErrors?: Record<string, string | string[]>;
  };
}

export type Result<T> = ResultData<T> | ResultError;
