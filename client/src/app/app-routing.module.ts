import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { signupComponent } from './components/signup/signup.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PeygiriSefareshComponent } from './components/peygiri-sefaresh/peygiri-sefaresh.component';
import { loginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: signupComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'peygiri-sefaresh', component: PeygiriSefareshComponent },
  { path: 'log-in', component: loginComponent },
  { path: '**', component: NotFoundComponent } // (** =>)LINK TO NOT FOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
1 