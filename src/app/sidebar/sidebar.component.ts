import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { CalendarControl } from '../calendar/calendar.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FiltersComponent } from '../filter/filters/filters.component';
import { Browser } from '@syncfusion/ej2-base';


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
  enableGestures: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  onCreated(event: any): void {
    if (this.sidebar) {
      if (Browser.isDevice || window.innerWidth <= 1024) {
        this.sidebar.hide();
      } else if (window.innerWidth > 1024) {
        this.sidebar.show();
      }
    }

  }
}
