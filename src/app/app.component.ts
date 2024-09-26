import { mockedCoursesList } from './shared/mocks/mocks';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  mockedCoursesList = mockedCoursesList;
}
