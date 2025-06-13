import { Routes } from '@angular/router';
import { DateComponent } from './lab/date/date.component';
import { PipeComponent } from './lab/pipe/pipe.component';
import { DevComponent } from './dev/dev.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './board/dashboard/dashboard.component';
import { ProjectsComponent } from './board/projects/projects.component';
import { TasksComponent } from './board/tasks/tasks.component';
import { AnalyticsComponent } from './board/analytics/analytics.component';
import { SettingsComponent } from './board/settings/settings.component';

export const routes: Routes = [
  { path: '', component: DevComponent },
  {
    path: 'lab',
    children: [
      { path: 'date', component: DateComponent },
      { path: 'pipe', component: PipeComponent },
    ],
  },
  {
    path: 'board',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];
