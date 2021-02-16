import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {showError: true},
  }]
})
export class CreateCourseComponent implements OnInit {
  ngOnInit() {

  }
}
