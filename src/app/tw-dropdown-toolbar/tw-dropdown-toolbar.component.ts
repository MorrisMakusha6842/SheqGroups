import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tw-dropdown-toolbar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './tw-dropdown-toolbar.component.html',
  styleUrl: './tw-dropdown-toolbar.component.scss'
})
export class TwDropdownToolbarComponent {
showSideBar=false;
private router = inject(Router);

toggleSideNav() {
  const status = this.showSideBar;
  this.showSideBar= (status)?false:true;
}

navigateTo(link: string) {
  console.log('Clicked', link);
  const status = this.showSideBar;
  this.showSideBar= (status)?false:true;
this.router.navigateByUrl(link);
}
}
