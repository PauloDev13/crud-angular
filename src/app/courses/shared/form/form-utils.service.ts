import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control: AbstractControl<unknown> | null = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });

      if (
        control instanceof UntypedFormGroup ||
        control instanceof UntypedFormArray
      ) {
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string): string {
    const field: UntypedFormControl = formGroup.get(
      fieldName,
    ) as UntypedFormControl;
    return this.getErrorMessageFormField(field);
  }

  getErrorMessageFormField(field: UntypedFormControl): string {
    if (field.hasError('required')) {
      return 'Campo obrigatório.';
    }

    if (field.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Campo deve ter no mínimo ${requiredLength} caracteres.`;
    }

    if (field.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Campo deve ter no máximo ${requiredLength} caracteres.`;
    }

    return 'Campo inválido.';
  }

  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number,
  ): string {
    const formArray: UntypedFormArray = formGroup.get(
      formArrayName,
    ) as UntypedFormArray;

    const field: UntypedFormControl = formArray.controls[index].get(
      fieldName,
    ) as UntypedFormControl;

    return this.getErrorMessageFormField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray: UntypedFormArray = formGroup.get(
      formArrayName,
    ) as UntypedFormArray;
    return (
      formArray.invalid && formArray.hasError('required') && formArray.touched
    );
  }
}
