import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {NonNullableFormBuilder} from "@angular/forms";

import {CoursesService} from "../../services/courses.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {}

  onSubmit(){
    this.courseService.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError()
    })

  }

  onCancel(){
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }

}
