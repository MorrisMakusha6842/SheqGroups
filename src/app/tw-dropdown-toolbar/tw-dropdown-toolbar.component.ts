import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LinkActiveModel, SideNavComponent } from './side-nav/side-nav.component';

@Component({
  selector: 'app-tw-dropdown-toolbar',
  standalone: true,
  imports: [
    NgClass,
    SideNavComponent
  ],
  templateUrl: './tw-dropdown-toolbar.component.html',
  styleUrl: './tw-dropdown-toolbar.component.scss'
})
export class TwDropdownToolbarComponent {
showSideBar=true;
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
sideNavLinkActive(event: LinkActiveModel) {
  const link = event.link;
  const showSideBar = event.showSideBar;
  this.navigateTo(link);

  

}
}
