import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectListComponent } from './widgets/subject-list/subject-list.component';
import { SubjectDetailsComponent } from './widgets/subject-details/subject-details.component';
import { TableModule } from 'ngx-easy-table';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { AddSubjectComponent } from './widgets/add-subject/add-subject.component';
import { HomePageComponent } from './widgets/home-page/home-page.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';
import { VisionComponent } from './widgets/vision/vision.component';
import { TestimonialComponent } from './widgets/testimonial/testimonial.component';
import { WorkComponent } from './widgets/work/work.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { EducationComponent } from './views/education/education.component';
import { AdminPortalComponent } from './views/admin-portal/admin-portal.component';
import { AddChapterComponent } from './widgets/add-chapter/add-chapter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './widgets/login/login.component';
import { RegisterComponent } from './widgets/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UpdateChapterComponent } from './widgets/update-chapter/update-chapter.component';
import { RequestComponent } from './widgets/request/request.component';
import { FoodComponent } from './views/food/food.component';
import { HealthComponent } from './views/health/health.component';
import { DonateFoodComponent } from './widgets/donate-food/donate-food.component';
import { UserDetailComponent } from './widgets/user-detail/user-detail.component';
import { DoctorDetailComponent } from './widgets/doctor-detail/doctor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    SubjectDetailsComponent,
    AddSubjectComponent,
    HomePageComponent,
    NavbarComponent,
    VisionComponent,
    TestimonialComponent,
    WorkComponent,
    FooterComponent,
    HomeComponent,
    EducationComponent,
    AdminPortalComponent,
    AddChapterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UpdateChapterComponent,
    RequestComponent,
    FoodComponent,
    HealthComponent,
    DonateFoodComponent,
    UserDetailComponent,
    DoctorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatBadgeModule,
    MatSelectModule,
    MatCardModule,
    TableModule,
    NgbModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
