import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFiller = false;
  loading = false;

  public sessionStorage = sessionStorage;

  constructor(private router:Router) { 
    
  }

  ngOnInit(): void {

  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
