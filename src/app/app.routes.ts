import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {GroupsComponent} from "./pages/groups/groups.component";
import {ExercisesComponent} from "./pages/exercises/exercises.component";
import {HelpComponent} from "./pages/help/help.component";
import {PrivacyComponent} from "./pages/privacy/privacy.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {TrainingPlansComponent} from "./pages/training-plans/training-plans.component";
import {UsersComponent} from "./pages/users/users.component";


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'groups', component: GroupsComponent },
  { path: 'exercises', component: ExercisesComponent},
  { path: 'training-plans', component: TrainingPlansComponent},
  { path: 'users', component: UsersComponent},

  { path: 'help', component: HelpComponent },
  { path: 'privacy', component: PrivacyComponent },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
