import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { CourseEffect } from './app/store/course.effect';
import { AppEffect } from './app/store/global/app.effect';
import { AppStore } from './app/store/global/app.store';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatToolbarModule,
      MatSnackBarModule,
      MatDialogModule,
      StoreModule.forRoot(AppStore),
      EffectsModule.forRoot([CourseEffect, AppEffect]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: !isDevMode(),
        connectInZone: true,
      }),
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
  ],
}).catch(err => console.error(err));
