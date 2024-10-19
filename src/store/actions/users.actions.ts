export class GetUsers {
    static readonly type = '[User List] Get Users';
    constructor(public page: number) {}
}


export class GetUserDetails {
    static readonly type = '[User Details] Get User Details';
    constructor(public id: number) {}
  }