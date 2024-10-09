import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Output, ViewChild } from '@angular/core';
import { SliderModule, SliderComponent } from '@syncfusion/ej2-angular-inputs';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [SliderModule, CommonModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent {
  @ViewChild('sliderObj', { static: false }) sliderObj!: SliderComponent;

  leftHandleValue: number = 200;
  rightHandleValue: number = 300;
  tooltip: Object = { isVisible: true, placement: 'Before', showOn: 'Focus' };
  value: number[] = [200, 300];
  min: number = 0;
  max: number = 500;
  type: string = "Range";
  // limits: object = { enabled: true, minStart: 0, minEnd: 100, maxStart: 150, maxEnd: 500 };
  selectedData: any = [];

  constructor(private commonService: CommonService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateTooltipValues();
    if (this.sliderObj)
      this.sliderObj.value = [200, 350]
  }

  ngAfterViewInit() {
    // Detach change detection before making any changes
    this.cdRef.detach();

    this.updateTooltipValues();
    if (this.sliderObj)
      this.sliderObj.value = [200, 350]
    // Reattach change detection to refresh the view
    this.cdRef.reattach();
    this.cdRef.detectChanges(); // Manually trigger change detection
    // }, 0);
  }

  onSliderChanged(event: any): void {
    if (event?.isInteracted) {
      this.selectedData = [];
      this.leftHandleValue = event.value[0];
      this.rightHandleValue = event.value[1];
      this.selectedData.push(this.leftHandleValue);
      this.selectedData.push(this.rightHandleValue);
      this.detectionRef();
      this.updateTooltipValues();
    }
  }

  onSliderCreated(): void {
    this.updateTooltipValues();
  }

  calculatePosition(value: number): number {
    return (value / this.max) * 100; // Example calculation
  }

  updateTooltipValues(): void {
    this.tooltip = {
      ...this.tooltip,
      content: `\$${this.leftHandleValue} - \$${this.rightHandleValue}`
    };
  }

  detectionRef() {
    // setTimeout(() => {
    const currentValue = this.commonService.filterData.value;
    const newValue = {
      ...currentValue,
      priceId: this.selectedData
    };

    this.commonService.filterData.next(newValue);

    // Manually mark the component for changes
    this.cdRef.markForCheck();
    // }, 0);
  }
}
