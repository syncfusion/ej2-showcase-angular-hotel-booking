import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SliderModule, SliderComponent } from '@syncfusion/ej2-angular-inputs'
@Component({
  selector: 'app-price',
  standalone: true,
  imports: [SliderModule, CommonModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent {
  // public rangeType: string = "Range";
  // public rangeValue: number[] = [30, 70];
  @ViewChild('sliderObj', { static: false }) sliderObj!: SliderComponent;
  leftHandlePosition: number = 0;
  rightHandlePosition: number = 0;
  leftHandleValue: number = 0;
  rightHandleValue: number = 500;
  priceRange: number[] = [0, 500];
  tooltip: Object = { isVisible: false, placement: 'Before', showOn: 'Focus' };

  onSliderChanged(event: any): void {
    // Your logic for handling slider change
    this.leftHandleValue = event.value[0];
    this.rightHandleValue = event.value[1];
    this.leftHandlePosition = this.calculatePosition(this.leftHandleValue);
    this.rightHandlePosition = this.calculatePosition(this.rightHandleValue);
  }

  onSliderCreated(): void {
    // Your logic for handling slider creation
    this.leftHandlePosition = this.calculatePosition(this.leftHandleValue);
    this.rightHandlePosition = this.calculatePosition(this.rightHandleValue);
  }

  calculatePosition(value: number): number {
    // Your logic to calculate the position based on the value
    return (value / 500) * 100; // Example calculation
  }
}
