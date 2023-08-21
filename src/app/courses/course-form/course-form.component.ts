import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CoursesService} from "../courses/services/courses.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    })
  }

  onSubmit(){
    this.courseService.save(this.form.value).subscribe({
      next: result => console.log(result),
      error: () => this.onError()
    })

  }

  onCancel(){
    console.log('onCancel');
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 3000})
  }


}
