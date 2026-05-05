import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register";
import {LoginComponent} from "./login/login";
import {DashComponent} from "./dash/dash";

export const routes: Routes = [
    {path:"", component: RegisterComponent},
    {path:"login", component: LoginComponent},
    {path:"dash", component: DashComponent},
];
