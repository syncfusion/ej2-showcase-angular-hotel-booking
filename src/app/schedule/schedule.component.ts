import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser'
import { addDays, EJ2Instance, EventRenderedArgs, PopupCloseEventArgs, PopupOpenEventArgs, RenderCellEventArgs, resetTime, ResourceDetails, ScheduleComponent, ScheduleModule, setTime } from '@syncfusion/ej2-angular-schedule'
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Query } from '@syncfusion/ej2-data';
import {
  WeekService, MonthService, AgendaService, TimelineViewsService, TimelineMonthService, EventSettingsModel, DayService,
  WorkWeekService,
  MonthAgendaService
} from '@syncfusion/ej2-angular-schedule';
import { DatePickerAllModule, DateTimePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Browser, createElement, Internationalization, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { FormValidator, NumericTextBox, NumericTextBoxModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastAllModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ScheduleModule, RadioButtonModule, TimePickerModule, SvgIconComponent, TextBoxAllModule,
    DropDownListAllModule, DateTimePickerModule, DatePickerAllModule, ReactiveFormsModule, CommonModule,
    DateTimePickerModule, ToastAllModule, NumericTextBoxModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService, TimelineMonthService],
  encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.None
  // providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService]

})
export class SchedulerComponent {
  roomPrice: number = 150;
  noOfNights: number = 2;
  adultCount: number = 2;
  childCount: number = 1;
  checkInTime: Date = new Date();
  checkOutTime: Date = new Date();
  roomQuery!: Query;
  bookingForm!: FormGroup;
  intl: Internationalization = new Internationalization();
currentDate: Date = new Date();
@ViewChild('eventTemplate', { static: true }) eventTemplate!: ElementRef;
  public selectedDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate()
  );
  public views: Array<string> = ['TimelineMonth'];
  public eventSettings: EventSettingsModel = {
    dataSource: this.commonService.bookingData,
    fields: {
      subject: { name: 'GuestName' },
      startTime: { name: 'CheckIn' },
      endTime: { name: 'CheckOut' },
    },
  };


  borderColor: any = {
    '1_1': '#E879F9',
    '2_1': '#4ADE80',
    '3_1': '#6F47FF',
    '4_1': '#22D3EE',
    '5_2': '#F472B6',
    '6_2': '#FDBA74',
    '7_2': '#C084FC',
    '8_2': '#22D3EE',
    '9_3': '#E879F9',
    '10_3': '#4ADE80',
    '11_3': '#6F47FF',
    '12_3': '#22D3EE',
    '13_4': '#F472B6',
    '14_4': '#FDBA74',
    '15_4': '#C084FC',
    '16_4': '#22D3EE',
    '17_5': '#E879F9',
    '18_5': '#4ADE80',
    '19_5': '#6F47FF',
    '20_5': '#22D3EE',
  };
  public allowMultipleOwner: Boolean = true;
  public ownerDataSource: Object[] = [
    { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
    { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
    { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
  ];
  scheduleHeight: any
  proofData: Record<string, any>[] = [
    { text: 'Passport', Value: '0,', id: 1 },
    { text: 'Driving License', Value: '1', id: 2 }
  ];
  isDevice = Browser.isDevice ? "300px" : "580px";
  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;
  @ViewChild('toastObj') toastObj!: ToastComponent;

  // current_date: Date = new Date();
  floorData: any
  roomData: any
  toastPosition: Record<string, any> = { X: "Right", Y: "Bottom" };
  toastWidth = Browser.isDevice ? "300px" : "580px";
  constructor(@Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private fb: FormBuilder
    , private commonService: CommonService) {
    this.bookingForm = this.fb.group({
      GuestName: [''],
      CheckIn: [this.checkInTime],
      Floor: [null],
      Room: [null],
      Price: [{ value: this.roomPrice, disabled: true }],
      Nights: [this.noOfNights],
      Adults: [this.adultCount],
      Child: [this.childCount],
      CheckOut: [this.checkOutTime],
      Purpose: [''],
      Proof: [null],
      ProofNumber: [''],
      Email: [''],
      ContactNumber: ['']
    });
  }

  ngOnInit(): void {
    this.floorData = this.commonService.floorData;
    this.roomData = this.commonService.roomData;
    L10n.load({
      'en-US': {
        schedule: {
          newEvent: 'New Booking Details',
        },
      },
    });

    if (isPlatformBrowser(this.platformId)) {
      this.updateHeight();  // Only run this in the browser
    }
    this.bookingForm = this.fb.group({
      GuestName: [''],
      CheckIn: [this.checkInTime],
      Floor: [null],
      Room: [null],
      Price: [{ value: this.roomPrice, disabled: true }],
      Nights: [this.noOfNights],
      Adults: [this.adultCount],
      Child: [this.childCount],
      CheckOut: [this.checkOutTime],
      Purpose: [''],
      Proof: [null],
      ProofNumber: [''],
      Email: [''],
      ContactNumber: ['']
    });

    this.commonService.emittedData.subscribe((res) => {
      if (res) {
        this.formData();
      }
    });

    this.commonService.filterData.subscribe((res:any) => {
      console.log(res);
      if(res && res.floorId.length > 0) {
        this.commonService.showSchedule = true;
        this.floorData = this.commonService.floorData.filter((obj: any ) => res.floorId.includes(obj.id));
        this.roomData = this.commonService.roomData.filter((item: any ) => res.floorId.includes(item.groupId));
        if(res?.featuresId?.length > 0) {
          this.roomData = this.roomData.filter((room:any) => 
            res.featuresId.every((featureId:any) => 
              room.amenities.some((amenity:any) => amenity?.id === featureId)
            )
          );
        }
      } else if(res && res.floorId.length === 0)  {
        // this.floorData = this.commonService.floorData;
        // this.roomData = this.commonService.roomData;
        this.commonService.showSchedule = false;
      }
    })
  }

  formData() {
    if (this.scheduleObj) {
      const selectedCells = this.scheduleObj.getSelectedCells() as Element[];
      const cellDetails = this.scheduleObj.getCellDetails(selectedCells);
      const details = this.scheduleObj.getResourcesByIndex(cellDetails?.groupIndex ?? 1);

      const cellData: Record<string, any> = {
        CheckIn: cellDetails?.startTime ?? resetTime(new Date()),
        CheckOut: cellDetails?.endTime ?? addDays(resetTime(new Date()), 1),
        IsAllDay: cellDetails?.isAllDay ?? false,
        ...(details.groupData as any),
        Price: details.resourceData['price'],
      };

      this.scheduleObj.openEditor(cellData, 'Add', true);
    } else {
      console.error('ScheduleComponent is not initialized.');
    }
  }

  updateHeight(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scheduleHeight = `${window.innerHeight - 160}px`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateHeight();
    }
  }
  // toast_position = { X: 'Right', Y: 'Bottom' };
  // toast_width = '580px';
  group = {
    resources: ['Floors', 'Rooms'],
    enableCompactView: false,
  };


  onRenderCell(args: RenderCellEventArgs): void {

    if (args.elementType == 'monthCells') {
      let weekEnds: number[] = [0, 6];
      // if (args.date && weekEnds.indexOf((args.date).getDay()) >= 0) {
        //   let ele: HTMLElement = createElement('div', {
        //     innerHTML: `<div className="template-wrap"><span className="price-tag">{`$${getPrice(data.groupIndex)}`}</span></div>`,
        //     className: 'templatewrap'
        //   });
        //   (args.element).appendChild(ele);
        const wrapperDiv = this.renderer.createElement('div');
        this.renderer.addClass(wrapperDiv, 'template-wrap');

        // Create the price span
        const priceSpan = this.renderer.createElement('span');
        this.renderer.addClass(priceSpan, 'price-tag');

        // Set innerHTML using Renderer2
        const price = this.getPrice(args.groupIndex?.valueOf());
        const text = this.renderer.createText(`$${price}`);
        this.renderer.appendChild(priceSpan, text);

        // Append the priceSpan to the wrapperDiv
        this.renderer.appendChild(wrapperDiv, priceSpan);

        // Finally, append the wrapperDiv to the component's root element (or wherever appropriate)
        // this.renderer.appendChild(this.el.nativeElement, wrapperDiv);
        (args.element).appendChild(wrapperDiv);
      // }
    }
  }

  // Function to calculate price
  getPrice(groupIndex: any): string {
    const resource = this.scheduleObj.getResourcesByIndex(groupIndex)?.resourceData;
    return resource ? resource['price'] : 'Price not found';
  }


  getDateHeaderDay(value: Date) {
    return this.intl.formatDate(value, { skeleton: 'E' });
  }

  getDateHeaderDate(value: Date) {
    return this.intl.formatDate(value, { skeleton: 'd' });
  }

  calculateNights(checkIn: Date, checkOut: Date): number {
    let noOfNights: number = 0;
    if (checkIn && checkOut) {
      const timeDifference: number = checkOut.getTime() - checkIn.getTime();
      const differenceInDays: number = timeDifference / (1000 * 60 * 60 * 24);
      noOfNights = Math.ceil(differenceInDays);
    }
    return noOfNights;
  };

  getRoomIndex(id: number, name: string): number {
    const roomIndex: number = this.scheduleObj?.getIndexFromResourceId(
      id,
      name,
    ) as number;
    return roomIndex;
  };

  editorTemplate(data: any) {
    const noOfNights: number = this.calculateNights(data.CheckIn, data.CheckOut);
    const roomIndex: number = this.getRoomIndex(data.Room, 'Rooms');
    const priceData: ResourceDetails = this.scheduleObj?.getResourcesByIndex(
      roomIndex,
    ) as ResourceDetails;
    const roomPrice: any = priceData?.resourceData['price'];
    const checkInTime = setTime(new Date(data.CheckIn), 12 * 60 * 60 * 1000);
    const checkOutTime = setTime(new Date(data.CheckOut), 12 * 60 * 60 * 1000);
    const childCount: any = data.Child;
    const adultCount: number = data.Adults;

  };

  timeChanged(event: any) {
    // Handle time change
  }

  disabledDate(args: any) {
    // Handle disabled dates
  }

  onFloorsChange(event: any) {
    // Handle floor change logic
  }

  onRoomsChange(event: any) {
    // Handle room change logic
  }

  checkOutValidation(args: any) {
    // Handle check-out validation
  }

  onEventCheck(args: any) {
    let eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return (eventObj.CheckIn < today);
  }



  // onPopupOpen(args: PopupOpenEventArgs) {
  //   if (
  //     (args.target && !args.target.classList.contains('e-appointment') && args.type === 'QuickInfo') ||
  //     args.type === 'Editor'
  //   ) {
  //     args.cancel = this.onEventCheck(args);
  //     if (args.cancel) {
  //       return;
  //     }
  //   }

  //   const popupType: string[] = ['Editor', 'RecurrenceAlert', 'DeleteAlert'];

  //   if (popupType.includes(args.type)) {
  //     const target = ['DeleteAlert', 'RecurrenceAlert'].includes(args.type) ? args.element : args.target;

  //     if (target?.classList.contains('e-work-cells')) {
  //       args.cancel = target.classList.contains('e-read-only-cells') ||
  //         !this.scheduleObj.isSlotAvailable(args.data as Record<string, any>);
  //     }

  //     const errorTarget: HTMLElement = document.getElementById('EventType_Error') as HTMLElement;

  //     if (!isNullOrUndefined(errorTarget)) {
  //       errorTarget.style.display = 'none';
  //       errorTarget.style.left = '351px';
  //     }

  //     setTimeout(() => {
  //       const formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;

  //       if (formElement == null) {
  //         return;
  //       }

  //       const validator: FormValidator = (formElement as any).ej2_instances[0] as FormValidator;
  //       validator.addRules('guestName', { required: true });
  //       validator.addRules('child', { required: true });
  //       validator.addRules('adults', { required: true });
  //       validator.addRules('purpose', { required: true });
  //       validator.addRules('proofNumber', { required: true });
  //       validator.addRules('email', { required: true });
  //       validator.addRules('guestProof', { required: true });
  //       validator.addRules('contactNumber', { required: true, minLength: [10, 'Please enter a valid phone number.'] });
  //     }, 100);
  //     this.scheduleObj.openEditor(args.data as Record<string, any>, 'Add', true);
  //   }
  // }
  onPopupClose(args: PopupCloseEventArgs) {
    if (args.type === 'Editor' && args.data) {
      const formElement: any = args.element.querySelectorAll(
        '.custom-event-editor .e-lib[data-name]',
      );
      const elements: HTMLElement[] = Array.from<HTMLElement>(formElement);
      const eventObj: Record<string, any> = args.data as Record<string, any>;
      for (const element of elements) {
        const fieldName: string = element.dataset['name'] as string;
        const instance: any = (element as EJ2Instance).ej2_instances[0];
        if (instance) {
          eventObj[fieldName] = instance.value;
        }
      }
      args.data = eventObj;
      console.log(args.data);
      this.commonService.bookingData.push(this.bookingForm.value);
    }
  }

  onEventRendered(args: any) {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    if (args.data.CheckOut < today) {
      args.element.classList.add('e-read-only');
    }
    this.applyCategoryColor(args);
    const workCell: Element = this.scheduleObj?.element.querySelector(
      '.e-work-cells:not(.e-resource-group-cells)',
    ) as Element;
    setTimeout(() => {
      args.element.style.height = `${workCell.clientHeight - 4}px`;
    }, 100);
  };


  applyCategoryColor(args: any) {
    const roomId: number = args.data.Room;
    const floorId: number = args.data.Floor;
    const borderColor = this.getBorderColor(roomId, floorId);
    args.element.style.setProperty(
      'border',
      `1px solid ${borderColor}`,
      'important',
    );
  };

  getBorderColor(roomId: number, floorId: number) {
    const key: any = `${roomId}_${floorId}`;
    return this.borderColor[key] || '#000';
  };


  onPopupOpen(args: PopupOpenEventArgs) {
  }


}