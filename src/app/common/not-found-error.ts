import { AppError } from './app-error';
export class NotFoundError implements AppError {
  constructor(public originalError?: any) { }
}
