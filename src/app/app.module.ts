import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatExpansionModule } from '@angular/material/expansion';
import { PetcareComponent } from './components/petcare/petcare.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatBadgeModule } from '@angular/material/badge';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from '@angular/fire/compat/storage';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AllPetsComponent } from './components/all-pets/all-pets.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PutForAdoptionComponent } from './components/put-for-adoption/put-for-adoption.component';
import { MatChipsModule } from '@angular/material/chips';
import { PetInfoComponent } from './components/put-for-adoption/child/pet-info/pet-info.component';
import { MoreInfoComponent } from './components/all-pets/child/more-info/more-info.component';
import { NotificationComponent } from './components/all-pets/child/notification/notification.component';
import { InterestedInfoComponent } from './components/interested-info/interested-info.component';
import { StatusConfirmationComponent } from './components/put-for-adoption/child/status-confirmation/status-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    LoginComponent,
    SignUpComponent,
    AllPetsComponent,
    PetcareComponent,
    VerifyPasswordComponent,
    ForgotPasswordComponent,
    PutForAdoptionComponent,
    PetInfoComponent,
    MoreInfoComponent,
    NotificationComponent,
    InterestedInfoComponent,
    StatusConfirmationComponent,
  ],
  entryComponents: [SignUpComponent, LoginComponent, MoreInfoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    IvyCarouselModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatBadgeModule,
    MatDividerModule,
    FontAwesomeModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatChipsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
