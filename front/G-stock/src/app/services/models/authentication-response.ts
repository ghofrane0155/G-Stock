/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface AuthenticationResponse {
  token?: string;
  user?: User;
}
