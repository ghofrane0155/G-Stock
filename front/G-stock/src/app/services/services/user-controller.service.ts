/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll } from '../fn/user-controller/find-all';
import { FindAll$Params } from '../fn/user-controller/find-all';
import { findById } from '../fn/user-controller/find-by-id';
import { FindById$Params } from '../fn/user-controller/find-by-id';
import { updateUser } from '../fn/user-controller/update-user';
import { UpdateUser$Params } from '../fn/user-controller/update-user';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/user/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<User> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/user/{id}';

  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  findById(params: FindById$Params, context?: HttpContext): Observable<User> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/user/all';

  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<User>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

}
