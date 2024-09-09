import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  
  constructor(private router: Router) {}

}
