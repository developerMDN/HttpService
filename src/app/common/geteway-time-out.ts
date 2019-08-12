import { AppError } from './app-error';
export class GetewayTimeOut implements AppError {
  constructor(public originalError?: any) { }
}
