import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { DatabaseService } from 'src/app/shared/database.service';
import {
  Timestamp
} from 'firebase/firestore';

@Component({
  selector: 'app-interested-info',
  templateUrl: './interested-info.component.html',
  styleUrls: ['./interested-info.component.scss'],
})
export class InterestedInfoComponent implements OnInit {
  date_: any;
  currDate: any;
  isLoading: boolean = false;
  interestedPetInfo: any = {};
  checkSameUserAdoption: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private database: DatabaseService,
    private common: CommonService
  ) { }
  // id: any;

  ngOnInit(): void {
    this.interestedPetInfo = JSON.parse(this.common.getInterestedPetsInfo());
    if (this.interestedPetInfo.uid == localStorage.getItem('uid')) {
      this.checkSameUserAdoption = true;
    }

    if (this.interestedPetInfo == null) {
      console.log('please select a pet ');
    }

    // this.route.params.subscribe((params) => {
    //   this.id = params['id'];
    // });
    // this.database.fetchSpecificPetsData(this.id).then((value) => {
    //   this.interestedPetInfo = value;
    //   console.log(value);
    // });
    // console.log(this.id);
    // console.log(this.interestedPetInfo);
  }

  phoneNumLen = 10;
  name = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.phoneNumLen),
    Validators.minLength(this.phoneNumLen),
  ]);
  landmark = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  query = new FormControl('', [Validators.required]);
  // petsInfoID = new FormControl(this.interestedPetInfo.documentID, [])
  userInfoFormGroup = new FormGroup({
    name: this.name,
    phoneNumber: this.phoneNumber,
    landmark: this.landmark,
    city: this.city,
    query: this.query,
  });

  clearForm() {
    this.userInfoFormGroup.patchValue({
      name: '',
      phoneNumber: '',
      landmark: '',
      city: '',
      query: '',
    })

    this.name.setErrors(null);
    this.phoneNumber.setErrors(null);
    this.city.setErrors(null);
    this.landmark.setErrors(null);
    this.query.setErrors(null);
  }
  submitUserInfo(data: any) {

    this.date_ = new Date();
    this.currDate = this.date_.getFullYear() + "-" + this.date_.getMonth() + "-" + this.date_.getDate() + " " + this.date_.getHours() + ":" + this.date_.getMinutes() + ":" + this.date_.getSeconds()
    console.log("interested", data)
    Object.assign(data, { petsInfoID: this.interestedPetInfo.documentID });
    Object.assign(data, { petsOwnerID: this.interestedPetInfo.uid });
    Object.assign(data, {
      petPictureURL: this.interestedPetInfo.petPictureURL,
    });
    Object.assign(data, { date: this.currDate })
    this.isLoading = true;
    this.userInfoFormGroup.invalid;
    this.database.addInterestedUserInfo(data).then((value) => {
      this.isLoading = Boolean(value);
      this.clearForm();
    });
  }
}
