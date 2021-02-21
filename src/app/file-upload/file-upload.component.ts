import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';


@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent,
  }, {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: FileUploadComponent,
  }]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input() requiredFileType: string;

  fileName = '';
  fileUploadError = false;
  uploadProgress: number;
  disabled = false;
  fileUploadSuccess = false;

  constructor(private http: HttpClient) {
  }

  onValidatorChange = () => {
  };

  onChange = (fileName: string) => {
  };

  onTouched = () => {
  };

  onFileSelected($event: Event): void {
    const file: File = ($event.target as HTMLInputElement).files[0];

    if (!file) {
      return;
    }

    this.fileName = file.name;

    const formData = new FormData();
    formData.append('thumbnail', file);
    this.fileUploadError = false;

    this.http.post('/api/thumbnail-upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(error => {
        this.fileUploadError = true;

        return of(error);
      }),
      finalize(() => this.uploadProgress = null),
    ).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      } else if (event.type === HttpEventType.Response) {
        this.fileUploadSuccess = true;
        this.onChange(this.fileName);
        this.onValidatorChange();
      }
    });
  }

  writeValue(obj: any): void {
    this.fileName = obj;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  onClick(fileUpload: HTMLInputElement): void {
    this.onTouched();
    fileUpload.click();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }

    return {
      requiredFileType: this.requiredFileType,
      ...this.fileUploadError && {uploadFailed: true},
    };
  }

  registerOnValidatorChange(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

}
