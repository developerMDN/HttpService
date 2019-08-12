import { DataService } from './data-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService extends DataService {

  constructor(http: HttpClient) {
    super('api/post', http);

  }
}
