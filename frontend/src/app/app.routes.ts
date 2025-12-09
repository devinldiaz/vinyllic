import { Routes } from '@angular/router';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    { path: 'collection', component: CollectionPageComponent}
];
