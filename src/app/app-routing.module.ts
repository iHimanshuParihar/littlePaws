import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInGuardService } from './auth-guard/sign-in-guard.service';
import { UserAuthGuardService } from './auth-guard/user-auth-guard.service';
import { VerifyEmailGuardService } from './auth-guard/verify-email-guard.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AllPetsComponent } from './components/all-pets/all-pets.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { InterestedInfoComponent } from './components/interested-info/interested-info.component';
import { PetcareComponent } from './components/petcare/petcare.component';
import { PutForAdoptionComponent } from './components/put-for-adoption/put-for-adoption.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'petcare', component: PetcareComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [SignInGuardService],
  },
  {
    path: 'all-pets',
    component: AllPetsComponent,
    canActivate: [UserAuthGuardService],
  },
  {
    path: 'put-for-adoption',
    component: PutForAdoptionComponent,
    canActivate: [UserAuthGuardService],
  },
  {
    path: 'interested-info',
    component: InterestedInfoComponent,
    canActivate: [UserAuthGuardService],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'verify-email',
    component: VerifyPasswordComponent,
    canActivate: [VerifyEmailGuardService],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
