import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  num  = 580;
  image4 = "assets/images/aboutus_images/aboutus_image1.jpg"
  aboutusTitle = "about littlepaws"
  aboutusSubtitle = "Founded in 2022, littlePaws is the Mit - Wpu's Msc CS Angular Mini Project"

}
