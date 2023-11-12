import { Routes } from '@angular/router';
import { CustomServiceComponent } from './components/custom-service/custom-service.component';

export const routes: Routes = [
  {
    component: CustomServiceComponent,
    path: 'custom-service',
  },
  {
    loadChildren: () =>
      import('./module/custom-module/custom-module.module').then(
        (m) => m.CustomModuleModule
      ),
    path: 'with-module',
  },
];
