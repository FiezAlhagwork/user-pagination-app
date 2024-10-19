
// import angular and rxjs
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import type and state and actions
import { Users } from '../../../Types/users.type';
import { GetUsers } from '../../../store/actions/users.actions';
import { UserState } from '../../../store/state/users.state';



// import Material
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatButtonModule,MatProgressBarModule, MatInputModule,FormsModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // inject
  store = inject(Store);
  route = inject(Router)

  
  //var
  users$: Observable<Users[]> = this.store.select(UserState.getUsers);
  total$:Observable<number> = this.store.select(UserState.getTotal)


  displayedColumns: string[] = ['position', 'First_Name','Last_Name','email',"avatar","actions" ];
  dataSource = new MatTableDataSource<Users>();
  totalUsers!: number   // Set based on the API response
  currentPage: number = 1;
  filterValue!:string
  loading: boolean = true;


  ngOnInit(): void {
    
    this.loadUsers(this.currentPage)

    this.users$.subscribe((data) => {
      this.dataSource.data = data
      this.loading = false
      
      
    })

    this.total$.subscribe((data) => {
      this.totalUsers = data
    })
  }

  loadUsers(page: number) {
    this.loading = true;
    this.store.dispatch(new GetUsers(page));
  }

  goToUserDetailsPage(id:number){
        this.route.navigateByUrl(`userDetails/${id}`)
        console.log(id)      
  }


  nextPage(): void {
    if (this.currentPage < this.totalUsers) {
      this.currentPage++;
      this.loadUsers(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers(this.currentPage);
    }
  }


  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }


}
