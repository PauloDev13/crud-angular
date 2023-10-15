import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>(true);
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>(true);

  readonly displayedColumns = ['name', 'category', 'actions'];

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(course: Course): void {
    this.edit.emit(course);
  }

  onDelete(course: Course): void {
    this.delete.emit(course);
  }
}
