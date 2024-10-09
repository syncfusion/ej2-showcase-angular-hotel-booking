import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ActionEventArgs, addDays, EJ2Instance, PopupCloseEventArgs, resetTime, ScheduleComponent, ScheduleModule, } from '@syncfusion/ej2-angular-schedule'
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
import { Browser, Internationalization, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { NumericTextBoxModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormBuilder, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush // Set OnPush strategy

})
export class SchedulerComponent {
  roomQuery!: Query;
  bookingForm!: UntypedFormGroup;
  intl: Internationalization = new Internationalization();
  currentDate!: Date
  @ViewChild('eventTemplate', { static: true }) eventTemplate!: ElementRef;
  public selectedDate!: Date
  public views: Array<string> = ['TimelineMonth'];
  public eventSettings: EventSettingsModel = {
    dataSource: this.commonService.bookingData,
    fields: {
      subject: { name: 'GuestName' },
      startTime: { name: 'CheckIn' },
      endTime: { name: 'CheckOut' },
    },
  };

  borderColor!: any
  scheduleHeight: any
  proofData: Record<string, any>[] = [
    { text: 'Passport', Value: '0,', id: 1 },
    { text: 'Driving License', Value: '1', id: 2 }
  ];
  isDevice = Browser.isDevice ? "300px" : "580px";
  isBrowser = Browser.isDevice;
  @ViewChild('scheduleObj') scheduleObj!: ScheduleComponent;
  @ViewChild('toastObj') toastObj!: ToastComponent;

  // current_date: Date = new Date();
  floorData: any;
  roomData: any;
  selectedRoomData: any = [];
  toastPosition: Record<string, any> = { X: "Right", Y: "Bottom" };
  toastWidth = Browser.isDevice ? "300px" : "580px";
  group = {
    resources: ['Floors', 'Rooms'],
    enableCompactView: false,
  };

  constructor(@Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private fb: FormBuilder
    , public commonService: CommonService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.borderColor = this.commonService.borderColor;
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

    this.bookingForm = new UntypedFormGroup({
      Id: new UntypedFormControl(null),
      GuestName: new UntypedFormControl(null, Validators.required),
      CheckIn: new UntypedFormControl(this.currentDate, Validators.required),
      Floor: new UntypedFormControl(1, Validators.required),
      Room: new UntypedFormControl(null, Validators.required),
      Price: new UntypedFormControl({ value: null, disabled: true }, Validators.required),
      Nights: new UntypedFormControl({ value: 1, disabled: true }, Validators.required),
      Adults: new UntypedFormControl(1, Validators.required),
      Child: new UntypedFormControl(1, Validators.required),
      CheckOut: new UntypedFormControl(this.currentDate, Validators.required),
      Purpose: new UntypedFormControl('', Validators.required),
      Proof: new UntypedFormControl(null, Validators.required),
      ProofNumber: new UntypedFormControl('', Validators.required),
      Email: new UntypedFormControl('', [Validators.required, Validators.email]),
      ContactNumber: new UntypedFormControl('', [Validators.required, Validators.maxLength(10)]),
      Color: new UntypedFormControl(null)
    });
    this.filteredRoomData(1);


    this.commonService.emittedData.subscribe((res) => {
      if (res) {
        this.formData();
      }
    });
    this.commonService.filterData.subscribe((res: any) => {
      if (res && res.floorId.length > 0) {
        this.commonService.showSchedule = true;
        this.floorData = this.commonService.floorData.filter((obj: any) => res.floorId.includes(obj.id));
        this.roomData = this.commonService.roomData.filter((item: any) => res.floorId.includes(item.groupId));
        if (res?.featuresId?.length > 0) {
          this.roomData = this.roomData.filter((room: any) =>
            res.featuresId.every((featureId: any) =>
              room.amenities.some((amenity: any) => amenity?.id === featureId)
            )
          );
        }
        if (String(res?.search).trim()) {
          this.roomData = this.roomData.filter((item: any) => item.text.toLowerCase().includes(String(res?.search).toLowerCase()));
        }
        if (res?.priceId?.length > 0) {
          this.roomData = this.roomData.filter((item: any) =>
            item.price >= res.priceId[0] && item.price <= res.priceId[1]
          );
        }
      } else if (res && res.floorId.length === 0) {
        this.commonService.showSchedule = false;
      }
      if (this.roomData.length === 0) {
        this.commonService.showSchedule = false;
      }
      this.bookingForm.reset();
      this.bookingForm.patchValue({ Floor: 1 })
      this.filteredRoomData(1);
    });

    this.commonService.currentDate.subscribe((res) => {
      this.currentDate = res;
      this.selectedDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      );
      if (this.scheduleObj)
        this.scheduleObj.refresh();
    })

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  filteredRoomData(floorId: number, roomId?: any) {
    this.selectedRoomData = this.commonService.roomData.filter((res: any) => res.groupId === floorId);
    this.bookingForm.patchValue({
      Room: roomId ? roomId : this.selectedRoomData[0].id,
      Price: roomId ? this.selectedRoomData.find((res: any) => res.id == roomId)['price']
        : this.selectedRoomData[0].price
    });
    this.bookingForm.get('Price')?.disable();

  }

  formData() {
    this.bookingForm.reset();
    if (this.scheduleObj) {
      const selectedCells = this.scheduleObj.getSelectedCells() as Element[];
      const cellDetails = this.scheduleObj.getCellDetails(selectedCells);
      const details = this.scheduleObj.getResourcesByIndex(cellDetails?.groupIndex ?? 1);

      const cellData: Record<string, any> = {
        CheckIn: cellDetails?.startTime ?? resetTime(new Date()),
        CheckOut: cellDetails?.endTime ?? addDays(resetTime(new Date()), 1),
        IsAllDay: cellDetails?.isAllDay ?? false,
        ...(details?.groupData as any),
        Price: details?.resourceData['price'],
      };
      this.scheduleObj.openEditor(cellData, 'Add', true);
      this.bookingForm.markAsPristine();
      const nextData = new Date();
      nextData.setDate(new Date().getDate() + 1)
      this.bookingForm.patchValue({
        Nights: 1,
        CheckIn: new Date(),
        CheckOut: nextData,
        Floor: 1,
        Adults: 1,
        Child: 1
      })
      this.bookingForm.get('Nights')?.disable();
      this.filteredRoomData(1);
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



  onRenderCell(args: any): void {

    if (args.elementType == 'monthCells') {
      let weekEnds: number[] = [0, 6];
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
      const today = new Date();
      today.setDate(today.getDate() - 1);
      if (args.elementType === "monthCells") {
        if (args?.date < today) {
          args.element.classList.add('past-cell');
        }
      }
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



  timeChanged(event: any, fromCheckIn?: boolean) {
    if (event?.value) {
      if (fromCheckIn) {
        this.bookingForm.patchValue({ CheckIn: new Date(event.value) });
        const nextDate = new Date(event.value);
        nextDate.setDate(new Date(event.value).getDate() + 1);
        this.bookingForm.patchValue({ CheckOut: new Date(nextDate) });

      } else {
        this.bookingForm.patchValue({ CheckOut: new Date(event.value) });
      }
      this.onRoomsChange({ value: this.bookingForm.get('Room')?.value });
    }
  }



  onFloorsChange(event: any) {
    if (event?.value) {
      this.selectedRoomData = this.roomData.filter((res: any) => res.groupId === event.value);
      this.bookingForm.patchValue({ Floor: event.value });
      this.filteredRoomData(event.value);
    }
  }

  onRoomsChange(event: any) {
    if (event?.value) {
      const selectedRoomIndex = this.selectedRoomData.findIndex((res: any) => res.id === event.value);
      if (selectedRoomIndex >= 0) {
        this.bookingForm.patchValue({ Price: this.selectedRoomData[selectedRoomIndex].price })
        this.bookingForm.get('Price')?.disable();
      }
    }
    if (this.bookingForm.get('CheckIn')?.value && this.bookingForm.get('CheckOut')?.value) {
      let nightCount = this.calculateNights(this.bookingForm.get('CheckIn')?.value, this.bookingForm.get('CheckOut')?.value)
      this.bookingForm.patchValue({ Price: nightCount * this.bookingForm.get('Price')?.value, Nights: nightCount })
    }
  }


  onEventCheck(args: any) {
    let eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return (eventObj.CheckIn < today);
  }



  onActionBegin(event: ActionEventArgs) {
    if (this.bookingForm.valid) {
      this.bookingForm.get('Nights')?.enable();
      this.bookingForm.get('Price')?.enable();
      this.bookingForm.patchValue({ Color: this.getBorderColor(this.bookingForm.get('Room')?.value, this.bookingForm.get('Floor')?.value) });
      this.bookingForm.patchValue({
        CheckIn: this.bookingForm.get('CheckIn')?.value.toISOString(),
        CheckOut: this.bookingForm.get('CheckOut')?.value.toISOString()
      })

      let slotAvail: boolean = false;
      if (
        ['eventCreate', 'eventChange', 'eventRemove'].includes(event.requestType)
      ) {
        event.cancel = true;
        switch (event.requestType) {
          case 'eventCreate':
            event.addedRecords?.forEach((data: Record<string, any>) => {
              if (this.scheduleObj.isSlotAvailable(this.bookingForm.value)) {
                slotAvail = true;
                this.bookingForm.get('Id')?.setValue(data['Id'])
                this.commonService.bookingData.push(this.bookingForm.value);
                this.bookingForm.get('Nights')?.disable();
                this.bookingForm.get('Price')?.disable();
                this.toastObj.content = "Booking has been created successfully.";
                this.toastObj.cssClass = "e-toast-success";
                this.toastObj.show();
              }
            });
            break;
          case 'eventChange':
            event.changedRecords?.forEach((data: Record<string, any>) => {
              if (this.scheduleObj.isSlotAvailable(this.bookingForm.value)) {
                slotAvail = true;
                this.commonService.bookingData = this.commonService.bookingData.filter((obj: any) => obj.Id !== this.bookingForm.get('Id')?.value);
                this.commonService.bookingData.push(this.bookingForm.value)
                this.eventSettings.dataSource = this.commonService.bookingData;
                this.scheduleObj?.saveEvent(this.bookingForm.value);
                this.scheduleObj.refresh();
                this.bookingForm.get('Nights')?.disable();
                this.bookingForm.get('Price')?.disable();
                this.toastObj.content = "Booking has been updated successfully.";
                this.toastObj.cssClass = "e-toast-success";
                this.toastObj.show();
              }
            });
            break;
          case 'eventRemove':
            event.deletedRecords?.forEach((data: Record<string, any>) => {
              slotAvail = true;
              let index = this.commonService.bookingData.findIndex((res: any) => res.Id === this.bookingForm.get('Id')?.value);
              if (index >= 0) {
                this.commonService.bookingData.splice(index, 1);
              }
              this.eventSettings.dataSource = this.commonService.bookingData;
              this.scheduleObj?.deleteEvent(this.bookingForm.get('Id')?.value);
              this.toastObj.content = "Booking has been deleted successfully.";
              this.toastObj.cssClass = "e-toast-success";
              this.toastObj.show();
            });
            break;
        }
        if (!slotAvail) {
          this.toastObj.content = "Room not available for booking on the selected Dates.";
          this.toastObj.cssClass = "e-toast-warning";
          this.toastObj.show();
        }
      }
      if (this.scheduleObj) {
        this.scheduleObj.refresh();
        this.bookingForm.reset();
        this.commonService.emittedSavedData.next(true);
      }
    }
  }

  onPopupClose(args: PopupCloseEventArgs) {
    if (args?.event?.target["innerText"] === "" && args?.data && this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      args.cancel = true;
      args.data = null;
    }
    if (args?.event?.target["innerText"] === "" || args?.event?.target["innerText"] === 'Cancel') {
      args.cancel = false;
    }
    if (args?.event?.target["innerText"] === "Save" && this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      args.cancel = true;
    }

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
    const color = this.getBorderColor(roomId, floorId);
    args.element.style.setProperty(
      'border',
      `1px solid ${color}`,
      'important',
    );
  };

  getBorderColor(roomId: number, floorId: number) {
    const key: any = `${roomId}_${floorId}`;
    return this.borderColor[key] || '#000';
  };


  checkoutValidation(event: any) {
    const checkIn: Date = this.bookingForm.get('CheckIn')?.value;
    if (checkIn) {
      if (event.date < checkIn) {
        event.isDisabled = true;
      }
    }
  }

  disabledDate(event: any) {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    if (event.date < today) {
      event.isDisabled = true;
    }
  }

  onPopupOpen(args: any) {
    this.bookingForm.markAsPristine();
    if ((args.target && !args.target.classList.contains('e-appointment') && (args.type === 'QuickInfo')) || (args.type === 'Editor')) {
      args.cancel = this.onEventCheck(args);
      if (args.cancel) {
        return;
      }
    }
    const popupType: string[] = ['Editor', 'RecurrenceAlert', 'DeleteAlert'];
    if (popupType.includes(args.type)) {
      const target = ['DeleteAlert', 'RecurrenceAlert'].includes(args.type)
        ? args.element
        : args.target;
      if (target?.classList.contains('e-work-cells')) {
        args.cancel =
          target.classList.contains('e-read-only-cells') ||
          !this.scheduleObj?.isSlotAvailable(
            args.data as Record<string, any>,
          );
      }
      const errorTarget: HTMLElement = document.getElementById(
        'EventType_Error',
      ) as HTMLElement;
      if (!isNullOrUndefined(errorTarget)) {
        errorTarget.style.display = 'none';
        errorTarget.style.left = '351px';
      }
    }
    if (args?.data) {
      this.bookingForm.patchValue({
        CheckIn: new Date(args?.data?.CheckIn),
        CheckOut: new Date(args?.data?.CheckOut),
        Floor: args?.data?.Floor,
        Child: args?.data?.Child ? args?.data?.Child : 1,
        Adults: args?.data?.Adults ? args?.data?.Adults : 1,
        Nights: args?.data?.Nights ? args?.data?.Nights : 1,
        Color: args?.data?.Color ? args?.data?.Color : null,
        Email: args?.data?.Email ? args?.data?.Email : null,
        ContactNumber: args?.data?.ContactNumber ? args?.data?.ContactNumber : null,
        GuestName: args?.data?.GuestName ? args?.data?.GuestName : null,
        Proof: args?.data?.Proof ? args?.data?.Proof : null,
        ProofNumber: args?.data?.ProofNumber ? args?.data?.ProofNumber : null,
        Purpose: args?.data?.Purpose ? args?.data?.Purpose : null,
        Id: args?.data?.Id ? args?.data?.Id : null,
        Room: args?.data?.Room,
        Price: args?.data?.Price ? args?.data?.Price : null
      });
      if (args?.data?.Guid) {
        this.bookingForm.addControl('Guid', new UntypedFormControl(args?.data?.Guid))
      }
      if (args?.data?.Id) {
        this.selectedRoomData = this.commonService.roomData.filter((res: any) => res.groupId === args?.data?.Floor);

      } else {
        this.filteredRoomData(args?.data?.Floor, args?.data?.Room);

      }
    }
  }
}

