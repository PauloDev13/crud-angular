import { FormControl, FormGroup } from '@angular/forms';

export type FormArrayLessonType = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  youtubeUrl: FormControl<string>;
}>;
