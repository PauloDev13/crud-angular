import { Component } from '@angular/core';
import {Course} from "./model/course";
import {CoursesService} from "./services/courses.service";
import {Observable, of} from "rxjs";
import {catchError } from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions']

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.courses$ = coursesService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar curso.')
          return of([]);
        })
      )
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

}
