import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EducationComponent } from './views/education/education.component';
import { AdminPortalComponent } from './views/admin-portal/admin-portal.component';
import { SubjectDetailsComponent } from './widgets/subject-details/subject-details.component';
import { RegisterComponent } from './widgets/register/register.component';
import { LoginComponent } from './widgets/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthService } from './services/auth.service';
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminGuard } from './admin.guard';
import { FoodComponent } from './views/food/food.component';
import { HealthComponent } from './views/health/health.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signIn',component:LoginComponent},
  { path: 'register',component: RegisterComponent},
  { path: 'profile',component: ProfileComponent,canActivate: [AuthGuardGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'education',component:EducationComponent },
  { path: 'food',component:FoodComponent },
  { path: 'health',component:HealthComponent },
  { path: 'admin',component:AdminPortalComponent,canActivate: [AdminGuard]},
  { path: ':subjectID/:standard', component:SubjectDetailsComponent,canActivate: [AuthGuardGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
