import {Filter} from '@loopback/repository';
import {UserNew} from '../models';

export interface UserNewProxy {
  create(user: UserNew): Promise<UserNew>;
  find(filter?: Filter<UserNew>): Promise<UserNew[]>;
  findById(id: number, filter?: Filter<UserNew>): Promise<UserNew>;
  replaceById(id: number, user: UserNew): Promise<void>;
  delete(id: number): Promise<void>;
}
