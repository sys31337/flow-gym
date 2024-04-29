export interface IError {
  error: {
    isJoi: boolean;
  },
  result: {
    error: string;
  },
  message: string;
  stack: string;
  code: string;
  response: {
    status: number
  }
}
