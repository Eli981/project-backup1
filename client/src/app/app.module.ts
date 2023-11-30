import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { signupComponent } from "./components/signup/signup.component";

//materials
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { loginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PeygiriSefareshComponent } from './components/peygiri-sefaresh/peygiri-sefaresh.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NoAccessComponent } from './components/no-access/no-access.component';


@NgModule({
  declarations: [
    AppComponent,
    signupComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    PeygiriSefareshComponent,
    loginComponent,
    NotFoundComponent,
    NoAccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatAutocompleteModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
