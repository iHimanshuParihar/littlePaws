import { Component, HostListener, OnInit } from '@angular/core';
import { faMagnifyingGlass, faList, faHouse, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass
  faList = faList
  faHouse = faHouse
  faPeopleRoof = faPeopleRoof


  windowWidth: any;
  carouselWidth = 1200;
  carouselHeight = 600;
  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void { }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 1000 && this.windowWidth > 800) {
      this.carouselWidth = 800;
      this.carouselHeight = 400;
    } else if (this.windowWidth <= 800 && this.windowWidth > 500) {
      this.carouselWidth = 500;
      this.carouselHeight = 250;
    } else if (this.windowWidth <= 500) {
      this.carouselWidth = 300;
      this.carouselHeight = 150;
    } else {
      this.carouselWidth = 1200;
      this.carouselHeight = 600;
    }
  }
  loop = true;
  image_1 = 'assets/images/home_images/image_2.jpg'
  image_2 = 'assets/images/home_images/image_3.png'
  image_3 = 'assets/images/home_images/image_4.jpg'
  image_4 = 'assets/images/home_images/Home_3.jpg'
}
