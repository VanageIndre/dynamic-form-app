import { Route } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SubmitApplicationComponent } from './submit-application/submit-application.component';

export const routes: Route[] = [
  { path: '', component: DynamicFormComponent },
  { path: 'submit-application', component: SubmitApplicationComponent },
];
