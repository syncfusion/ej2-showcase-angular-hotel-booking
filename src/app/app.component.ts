import { Component, OnInit } from '@angular/core';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';
import { SidebarControl } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SchedulerComponent } from './schedule/schedule.component';
import { CommonService } from './common.service';

// import User from '../assets/images/user.svg';
// import Logo from '../assets/images/logo.svg';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, RecurrenceEditorModule, CommonModule, RouterOutlet, AppBarModule, SidebarControl, HeaderComponent, SchedulerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  constructor(public commonService: CommonService) {}
}
