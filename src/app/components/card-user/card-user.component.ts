import { Component, Input } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Users, UsersDetails } from '../../../Types/users.type';

@Component({
  selector: 'app-card-user',
  standalone: true,
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardUserComponent {
  @Input() UserData!:UsersDetails
}
