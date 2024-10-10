import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { CalendarControl } from '../calendar/calendar.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FiltersComponent } from '../filter/filters/filters.component';
import { Browser } from '@syncfusion/ej2-base';
import { CommonService } from '../common.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, CalendarControl, ButtonModule, FiltersComponent, CommonModule],
  exportAs: 'SidebarControl',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarControl {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  @ViewChild('sidebarOverlay', { static: false }) sidebarOverlay!: ElementRef;  // 
  enableGestures: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private commonService: CommonService) { }
  sidebarVisibility: boolean = false;
  mediaQuery!: MediaQueryList;
  openedWidth: any
  ngOnInit() {
    this.commonService.openSideBar.subscribe((res) => {
      if (res) {
        this.toggleSidebar()
      }
    })
  }

  onCreated(event: any): void {
    if (this.sidebar) {
      if (Browser.isDevice || window.innerWidth <= 1024) {
        this.sidebar.hide();
      } else if (window.innerWidth > 1024) {
        this.sidebar.show();
      }
    }

  }


  onSidebarClose() {
    this.sidebar.element.style.visibility = 'hidden';
    this.sidebar.hide();
    const overlay = this.sidebarOverlay?.nativeElement;
    if (overlay) {
      overlay.classList.remove('show');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.mediaQuery = window.matchMedia('(min-width: 1024px)');
        this.openedWidth = window.innerWidth > 1024
      }
    })

  }

  toggleSidebar() {
    const sidebarElement = this.sidebar.element; // Sidebar HTML element
    const overlay = this.sidebarOverlay?.nativeElement;  // Overlay HTML element

    if (sidebarElement.style.visibility === 'visible') {
      sidebarElement.style.visibility = 'hidden';
      this.sidebar.hide();
      if (overlay)
        overlay.classList.remove('show');
      this.sidebarVisibility = false;
    } else {
      sidebarElement.style.visibility = 'visible';
      this.sidebar.show();
      if (overlay)
        overlay.classList.add('show');
      this.sidebarVisibility = true;

    }
  }
}
