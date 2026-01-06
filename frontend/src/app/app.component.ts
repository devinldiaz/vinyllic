import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service'
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  vinyls: any[] = [];

  constructor(private apiService: ApiService){}
  ngOnInit() {
    this.fetchVinyls();
  }
  fetchVinyls() {
      this.apiService.getVinyls().subscribe(
      (data:any) => {
        this.vinyls = data;
        console.log(this.vinyls);
      },
      (error: any) => {console.error('An error occurred:', error);}
    )
  }
  title = 'frontend';
}
