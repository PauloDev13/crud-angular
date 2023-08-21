import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import { CoursesRoutingModule } from './courses-routing.module';
import {AppMaterialModule} from "./shared/app-material/app-material.module";
import {SharedModule} from "./shared/shared.module";
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesListComponent } from './courses-list/courses-list.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule,
  ]
})
export class CoursesModule { }
