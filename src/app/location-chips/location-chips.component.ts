import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {FormBuilder, FormControl} from '@angular/forms';
import {GeoServicesService} from '../services/geo-services.service';

@Component({
  selector: 'app-location-chips',
  templateUrl: './location-chips.component.html',
  styleUrls: ['./location-chips.component.css']
})
export class LocationChipsComponent implements OnInit, OnChanges {

  @Input()
  departements: any;

  newCountyCtrl: FormControl;
  countiesList: any[] = [];

  @ViewChild('countyInput') countyInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(fb: FormBuilder, private geoService: GeoServicesService){

    this.newCountyCtrl = fb.control('');
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  add(event: MatChipInputEvent): void {
    console.log(event);
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.departements.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.newCountyCtrl.setValue(null);
    }
  }
  remove(county: any): void {
    const index = this.departements.indexOf(county);

    if (index >= 0) {
      this.departements.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.departements.push(event.option.viewValue);
    this.countyInput.nativeElement.value = '';
    this.newCountyCtrl.setValue(null);
  }


  ngOnInit() {
    console.log('dept',this.departements);
    this.newCountyCtrl.valueChanges.subscribe(value => {
      this.geoService.getCounties(value).then((data: any[]) => this.countiesList = data);

    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES', changes);
  }
}


