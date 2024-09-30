import { Component } from '@angular/core';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import {  ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { CalendarControl } from '../calendar/calendar.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FiltersComponent } from '../filter/filters/filters.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, CalendarControl, ButtonModule, FiltersComponent],
  exportAs: 'SidebarControl',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarControl {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  public onCreated(args: any) {
      (this.sidebar as SidebarComponent).element.style.visibility = '';
 }
}
