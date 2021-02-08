import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(allErrors: any, errorsPriority: string[]): any {
    if (!allErrors) {
      return null;
    }

    if (!errorsPriority?.length) {
      const [firstKey] = Object.keys(allErrors);

      return allErrors[firstKey];
    }

    return allErrors[errorsPriority[0]]
      ? { [errorsPriority[0]]: allErrors[errorsPriority[0]] }
      : this.transform(allErrors, errorsPriority.slice(1));
  }
}
