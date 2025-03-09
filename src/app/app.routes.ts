import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthGuard } from '../auth.guard';
import { ProfileComponent } from '../components/profile/profile.component';
import { AddrecipeComponent } from '../components/addrecipe/addrecipe.component';
import { RecipelistComponent } from '../components/recipelist/recipelist.component';
import { RecipedetailsComponent } from '../components/recipedetails/recipedetails.component';

export const routes: Routes = [

      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'recipe', component: AddrecipeComponent },
      { path: 'profile', component: ProfileComponent},
      { path:'recipelist' , component:RecipelistComponent},
      { path:'recipe/:id' , component:RecipedetailsComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
]