import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
export type LinkActiveModel = {
link: string;
showSideBar: boolean
};

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input()showSideBar=false;
  @Output()linkActivated = new EventEmitter<LinkActiveModel>();
  linkClicked(link: string) {
    const status = this.showSideBar;
    const showSideBar= (status)?false:true;
  const data: LinkActiveModel = {
    link,showSideBar
  };
  this.linkActivated.emit(data);
 
  }
}
