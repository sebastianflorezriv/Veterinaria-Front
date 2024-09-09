import { NavigationComponent } from '../navigation/navigation.component';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd, Event } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavigationComponent, FooterComponent], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit{
  
  constructor(private router: Router) {}
  ngOnInit(): void {}
}
