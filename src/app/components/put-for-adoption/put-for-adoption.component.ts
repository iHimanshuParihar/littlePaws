import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/database.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { map, startWith } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { petsInfo } from 'src/app/model/commonInterfaces';

@Component({
  selector: 'app-put-for-adoption',
  templateUrl: './put-for-adoption.component.html',
  styleUrls: ['./put-for-adoption.component.scss'],
})
export class PutForAdoptionComponent implements OnInit {
  date_: any;
  currDate?: any;
  currentUserUID?: any;
  dogOrCatObject = [
    { value: 'dog', checked: true },
    { value: 'cat', checked: false },
  ];
  checkedRadioButton = this.dogOrCatObject[0].value;
  isUploadingImageText: string = '';
  // fetchedPetsData: petsInfo[] = [];
  allPetsData: any;
  fetchedPetsData: petsInfo[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchTags = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = ['adorable'];
  allTags: string[] = [
    'adorable',
    'friendly',
    'disabled',
    'vaccinated',
    'kharadi',
    'white',
    'black',
    'indie',
    'spayed',
    'neutered',
    'viman-nagar',
    'kothrud',
  ];

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  isSpinnerLoading: boolean = false;
  selectedFile?: File;
  updateDocumentID: any;
  fb: any;
  downloadURL?: Observable<string>;
  disable: boolean = false;
  updateButtonVisible: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    private database: DatabaseService,
    private storage: AngularFireStorage
  ) {
    this.filteredTags = this.searchTags.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }
  ngOnInit(): void {
    this.database.fetchAllPetsForUser()
    this.currentUserUID = localStorage.getItem('uid')
    this.date_ = new Date()
    this.currDate = this.date_.getFullYear() + "-" + this.date_.getMonth() + "-" + this.date_.getDate() + " " + this.date_.getHours() + ":" + this.date_.getMinutes() + ":" + this.date_.getSeconds()
    // this.fetchAllPetsData();
    this.database.allPutForAdoptionPetsData.subscribe(
      (value) => {
        console.log("this is the data", value)
        this.allPetsData = value
        // return value;
      }
    );
  }

  // fetchAllPetsData() {
  //   this.fetchedPetsData = [];
  //   this.database.fetchAllPetsForUser();
  //   this.database.fetchAllPetsForUser().then((value) => {
  //     // { }
  //     // this.fetchedPetsData.push(...(<[]>value));
  //   });
  // }
  year: string[] = ['0', '1', '2', '3', '5', '6', '7', '8', '9', '10'];
  month: string[] = [
    '0',
    '1',
    '2',
    '3',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  spayedNeuter: string[] = ['none', 'spayed', 'neutered'];
  selectedYear: string = '0';
  selectedMonth: string = '0';
  selectedSpayedNeuter: string = 'none';
  ownerName = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern('[- +()0-9]+'),
  ]);

  petPicture = new FormControl('', [Validators.required]);
  putForAdoptionPetInfo = new FormGroup({
    ownerName: this.ownerName,
    phoneNumber: this.phoneNumber,
    catOrDog: new FormControl(this.checkedRadioButton, []),
    ageInYear: new FormControl(this.selectedYear, []),
    ageInMonth: new FormControl(this.selectedMonth, []),
    searchTags: new FormControl(this.tags, []),
    petPictureURL: this.petPicture,
  });

  updatePetsInfo(data: any) {
    this.date_ = new Date();
    this.currDate = this.date_.getFullYear() + "-" + this.date_.getMonth() + "-" + this.date_.getDate() + " " + this.date_.getHours() + ":" + this.date_.getMinutes() + ":" + this.date_.getSeconds()
    console.log("parent", data.searchTags)
    this.clearForm();
    this.updateDocumentID = data.documentID;
    this.updateButtonVisible = true;
    this.tags = [];
    console.log('from child', data);
    for (let i = 0; i < data.searchTags.length; i++) {
      this.tags.push(data.searchTags[i]);
    }
    this.putForAdoptionPetInfo.patchValue({
      ageInYear: data.ageInYear,
      ageInMonth: data.ageInMonth,
      phoneNumber: data.phoneNumber,
      catOrDog: data.catOrDog,
      ownerName: data.ownerName,
    });
    // this.putForAdoptionPetInfo.setValue(data)
  }
  onFileSelected(event: any) {
    this.isUploadingImageText = 'uploading image...';
    this.isSpinnerLoading = true;
    this.disable = false;
    let imageId = `${new Date().getDate()}${new Date().getHours()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;

    const file = event.target.files[0];
    const filePath = `petImages/${imageId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`petImages/${imageId}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            this.isSpinnerLoading = false;
            this.disable = true;
            this.isUploadingImageText = '';
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  // isSpinnerLoading(){
  // }
  isDisabled() {
    if (this.putForAdoptionPetInfo.valid && this.disable) {
      return false;
    }
    return true;
  }
  putForAdoption(petInfo: any) {
    console.log("final", petInfo)
    console.log("final", this.tags)

    this.isSpinnerLoading = true;
    let docRef;
    this.downloadURL?.subscribe((value) => {
      if (value) {
        Object.assign(petInfo, { petPictureURL: this.fb });
        Object.assign(petInfo, { documentID: this.updateDocumentID });
        Object.assign(petInfo, { date: this.currDate })
        Object.assign(petInfo, { searchTags: this.tags })
        Object.assign(petInfo, { uid: localStorage.getItem('uid') })
        if (this.updateButtonVisible) {
          console.log(petInfo)
          docRef = this.database.updatePetsInfo(petInfo, this.updateDocumentID);
          console.log('update');
          this.isSpinnerLoading = false;
          this.clearForm();
          this.tags = [];
          this.updateButtonVisible = false;
        } else {
          docRef = this.database.addPetForAdoption(petInfo);
          console.log('add');
          this.isSpinnerLoading = false;
          this.clearForm();
          this.tags = [];
        }
        if (Boolean(docRef)) {
          // this.fetchAllPetsData();
        }
      }
    });
  }

  changeAdoptionStatus(data: any) {
    this.database.updateAdoptionStatus(data.id, data.adopted).then((value) => {
      // this.fetchAllPetsData();
    });
  }


  reset() {
    this.updateButtonVisible = false;
    this.tags = []
  }
  clearForm() {
    this.putForAdoptionPetInfo.reset()
    this.putForAdoptionPetInfo.patchValue({
      ownerName: '',
      phoneNumber: '',
      ageInYear: '0',
      ageInMonth: '0',
    });
    this.ownerName.setErrors(null);
    this.phoneNumber.setErrors(null);
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the tags
    if (
      value.toLowerCase() != 'cat' &&
      value.toLowerCase() != 'dog' &&
      value != ''
    ) {
      this.tags.push(value);
    }

    console.log("our tags", this.tags)
    // Clear the input value
    event.chipInput!.clear();

    this.searchTags.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.searchTags.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
