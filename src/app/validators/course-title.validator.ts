import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { defaultIfEmpty, filter, map, mapTo, switchMap } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';

export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
  return ({value}: AbstractControl) => {
    return courses.findAllCourses().pipe(
      switchMap(coursesList => coursesList),
      map(({description}) => description.toLowerCase()),
      filter(title => title === value.toLowerCase()),
      mapTo({titleExists: true}),
      defaultIfEmpty(null)
    );
  };
}
