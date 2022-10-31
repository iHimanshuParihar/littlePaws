import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/common.service';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  petsData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private database: DatabaseService,
    private common: CommonService
  ) {
    this.petsData = data.pets;
  }
  ngOnInit(): void { }

  setInterestedPetsInfo() {
    console.log(this.petsData)
    this.common.setInterestedPetsInfo(this.petsData);
  }
}
