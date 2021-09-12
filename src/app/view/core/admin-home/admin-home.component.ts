import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

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
