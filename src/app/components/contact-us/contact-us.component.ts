import { Component, OnInit } from '@angular/core';
import { EmailAuthCredential } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  constructor(private database: DatabaseService) { }
  isLoading: boolean = false;
  ngOnInit(): void { }

  // this.database.all.subscribe((value) => { this.isUserLoggedIn = Boolean(value) })
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  query = new FormControl('', [Validators.required]);
  contactUsFormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    query: this.query,
  });

  clearForm() {
    this.contactUsFormGroup.reset();
    this.email.setErrors(null);
    this.name.setErrors(null);
    this.query.setErrors(null);
  }
  addContactUsInfo(data: any) {
    this.isLoading = true;
    this.database.addContactUsInfo(data).then((value) => {
      this.isLoading = Boolean(value);
      this.clearForm();
    });
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'email cannot be empty';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
