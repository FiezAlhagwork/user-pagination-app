//impoer angular and rxjs
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

// import state and actions and type
import { Store } from '@ngxs/store';
import { GetUserDetails } from '../../../store/actions/users.actions';
import { UsersDetails } from '../../../Types/users.type';
import { UserState } from '../../../store/state/users.state';

// import Material
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CardUserComponent } from '../../components/card-user/card-user.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CardUserComponent, CommonModule, MatProgressBarModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  private activadRoute = inject(ActivatedRoute);
  private store = inject(Store);

  data!: UsersDetails;

  user$: Observable<UsersDetails> = this.store.select(UserState.getUser);

  ngOnInit(): void {
    this.activadRoute.params.subscribe((res: Params) => {
      const userId = Number(res['id']);
      if (userId) {
        this.GetUser(userId);
      }
    });

    this.user$.subscribe((data) => {
      this.data = data;
    });
  }

  GetUser(id: number) {
    this.store.dispatch(new GetUserDetails(id));
  }
}
