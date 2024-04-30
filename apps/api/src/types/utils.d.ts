export interface IError {
  result: string;
  error: {
    isJoi?: boolean
  };
  message: string;
  stack: string;
}