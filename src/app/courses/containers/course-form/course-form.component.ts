import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { createCourse } from '../../../store/course.action';
import { AppStateModel } from '../../../store/global/app-state.model';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../shared/form/form-utils.service';
import { FormArrayLessonType } from '../../types/form.type';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  public readonly formUtilsService: FormUtilsService = inject(FormUtilsService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
    private store: Store<AppStateModel>,
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(
        this.retrieveLessons(course),
        Validators.required,
      ),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(createCourse({ inputCourse: this.form.value }));
      this.onSuccess();
    } else {
      this.formUtilsService.validateAllFormFields(this.form);
    }
  }

  onCancel(): void {
    this.location.back();
  }

  addNewLesson(): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number): void {
    const lessons: UntypedFormArray = this.form.get(
      'lessons',
    ) as UntypedFormArray;
    lessons.removeAt(index);
  }

  getLessonsFormArray(): AbstractControl<any, any>[] {
    return (<UntypedFormArray>this.form?.get('lessons')).controls;
  }

  private retrieveLessons(course: Course): FormArrayLessonType[] {
    const lessons: FormArrayLessonType[] = [];

    if (course?.lessons) {
      course.lessons.forEach((lesson: Lesson) =>
        lessons.push(this.createLesson(lesson)),
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(
    lesson: Lesson = { id: '', name: '', youtubeUrl: '' },
  ): FormArrayLessonType {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 3000 });
  }
}
