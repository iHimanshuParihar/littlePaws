import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/shared/auth.service';
import { DatabaseService } from 'src/app/shared/database.service';
import { petsInfo } from '../../model/commonInterfaces';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from './child/more-info/more-info.component';
@Component({
  selector: 'app-all-pets',
  templateUrl: './all-pets.component.html',
  styleUrls: ['./all-pets.component.scss'],
})
export class AllPetsComponent implements OnInit {
  catOrDogRadioFilter: string = 'dog';
  allPets: any = [];
  tagQuery: string[] = [];
  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllData([], 'dog');
    this.database.allPetsDataSubject.subscribe((value) => {
      console.log('empty', value);
      this.allPets = value;
    });
  }

  openDialog(pets: any) {
    // console.log(id)
    this.dialog.open(MoreInfoComponent, { data: { pets: pets } });
  }
  clearTags() {
    this.tagQuery = [];
  }

  radioButtonClick() {
    this.clearTags();
  }
  getAllData(tags: string[], catOrDogRadioFilter: string) {
    console.log(catOrDogRadioFilter);
    this.database.getAllData(tags, catOrDogRadioFilter);
    console.log(this.allPets);
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (
      value.toLowerCase() != 'cat' &&
      value.toLowerCase() != 'dog' &&
      value != ''
    ) {
      this.tagQuery.push(value);
      this.getAllData(this.tagQuery, this.catOrDogRadioFilter);
      console.log(this.tagQuery);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tagQuery.indexOf(tag);

    if (index >= 0) {
      this.tagQuery.splice(index, 1);
      this.getAllData(this.tagQuery, this.catOrDogRadioFilter);
    }
  }
}
