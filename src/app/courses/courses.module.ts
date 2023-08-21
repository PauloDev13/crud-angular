import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import { CoursesRoutingModule } from './courses-routing.module';
import {AppMaterialModule} from "./shared/app-material/app-material.module";
import {SharedModule} from "./shared/shared.module";
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './course-form/course-form.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent
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
