import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Users, UsersDetails } from '../../Types/users.type';
import { GetUserDetails, GetUsers } from '../actions/users.actions';
import { RestApiService } from '../../services/rest-api.service';
import { tap } from 'rxjs';
import { patch } from '@ngxs/store/operators';

interface UsersStateModel {
  users: Users[];
  userDetails: UsersDetails;
  totalUsers: number
}

@State<UsersStateModel>({
  name: 'Users',
  defaults: {
    users: [],
    userDetails: {} as UsersDetails,
    totalUsers: 0
  },
})
@Injectable()
export class UserState {

  constructor(private restApiServices:RestApiService ){}

  @Selector()
  static getUsers(state: UsersStateModel) {
    return state.users;
  }

  @Selector()
  static getUser(state: UsersStateModel) {
    return state.userDetails;
  }


  @Selector()
  static getTotal(state: UsersStateModel) {
    return state.totalUsers
  }



  @Action(GetUsers)
  getUsers(ctx:StateContext<UsersStateModel>,{ page }: GetUsers){
    return this.restApiServices.getUser(page).pipe(tap(result => {
        const state = ctx.getState()    
        
        
        ctx.patchState({
            users: result.data,
            totalUsers:result.total_pages
        })
    }))
  }


  @Action(GetUserDetails)
  getUserDetails({ patchState }: StateContext<UsersStateModel>, { id }: GetUserDetails) {
    return this.restApiServices.getUserDetails(id).pipe(
      tap(result => {
        patchState({
          userDetails: result
        });
      })
    );
  }
}
