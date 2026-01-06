import { Routes } from '@angular/router';
import { VinylListPageComponent } from './vinyl-list-page/vinyl-list-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    { path: 'collection', component: VinylListPageComponent, data: {type: 'owned'}},
    {path:'wishlist', component: VinylListPageComponent, data: {type: 'wishlist'} }
];
