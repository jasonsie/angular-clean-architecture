import { Routes } from '@angular/router';
import { DateComponent } from './lab/date/date.component';
import { PipeComponent } from './lab/pipe/pipe.component';
import { DevComponent } from './dev/dev.component';

export const routes: Routes = [
  { path: '', component: DevComponent },
  {
    path: 'lab',
    children: [
      { path: 'date', component: DateComponent },
      { path: 'pipe', component: PipeComponent },
    ],
  },
];
