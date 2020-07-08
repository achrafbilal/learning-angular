import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-recherce-avancee',
  templateUrl: './recherce-avancee.component.html',
  styleUrls: ['./recherce-avancee.component.scss'],
})
export class RecherceAvanceeComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit() {}
  goTo(to: string) {
    localStorage.setItem('isloadDOC','ok')
    localStorage.setItem('isloadFOLDER','ok')
    this.router.navigate([to]);
  }
}
