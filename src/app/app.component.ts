import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Users, UsersDetails } from '../Types/users.type';
import { Store } from '@ngxs/store';
import { UserState } from '../store/state/users.state';
import {  GetUsers } from '../store/actions/users.actions';
import { HeaderComponent } from "./components/header/header.component";
import { CardUserComponent } from "./components/card-user/card-user.component";
import { animate, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CardUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent  {
  constructor() {}


}
