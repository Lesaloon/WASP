import ITokenResponses from './ITokenResponses.interface';

export interface ApiResponse<T> {
  payload: T[];
  success: boolean;
  errors?: Object;
  message: string;
  token?: ITokenResponses;
}
