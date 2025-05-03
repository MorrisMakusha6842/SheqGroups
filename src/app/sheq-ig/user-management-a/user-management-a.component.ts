import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-management-a',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-management-a.component.html',
  styleUrls: ['./user-management-a.component.scss']
})
export class UserManagementAComponent implements OnInit, OnDestroy {
  currentStep = 1;
  clientForm!: FormGroup;
  summary: any = {};
  mapUrl: string = '';
  currentAddressFocusIndex: number | null = null;
  private dummyLocations = [
    {
      fullAddress: '123 Main Street, Johannesburg, Gauteng, South Africa',
      address: '123 Main Street',
      city: 'Johannesburg',
      province: 'Gauteng'
    },
    {
      fullAddress: '456 Church Street, Pretoria, Gauteng, South Africa',
      address: '456 Church Street',
      city: 'Pretoria',
      province: 'Gauteng'
    },
    {
      fullAddress: '789 Long Street, Cape Town, Western Cape, South Africa',
      address: '789 Long Street',
      city: 'Cape Town',
      province: 'Western Cape'
    },
    {
      fullAddress: '321 Smith Street, Durban, KwaZulu-Natal, South Africa',
      address: '321 Smith Street',
      city: 'Durban',
      province: 'KwaZulu-Natal'
    },
    {
      fullAddress: '654 President Avenue, Bloemfontein, Free State, South Africa',
      address: '654 President Avenue',
      city: 'Bloemfontein',
      province: 'Free State'
    }
  ];
  addressSuggestions: Array<{
    fullAddress: string;
    address: string;
    city: string;
    province: string;
  }> = [];
  selectedImage: string | null = null;
  isSubmitting: boolean = false;
  showAddressSuggestions: boolean[] = [false];

  private readonly destroy$ = new Subject<void>();

  // Custom validators
  private phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const validPhoneRegex = /^\+27\s\d{2}\s\d{3}\s\d{4}$/;
    return validPhoneRegex.test(control.value) ? null : { invalidPhone: true };
  }

  private postalCodeValidator(control: AbstractControl): ValidationErrors | null {
    const validPostalCodeRegex = /^\d{4}$/;
    return validPostalCodeRegex.test(control.value) ? null : { invalidPostalCode: true };
  }

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    this.clientForm = this.fb.group({
      fullName: ['', Validators.required],
      businessName: [''],
      contactInfo: ['', Validators.required],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator.bind(this)]],
      siteLocations: this.fb.array([this.createSiteLocation()]),
      areaSize: ['', Validators.required],
      clientCategory: ['', Validators.required],
      gpsLocation: [''],
      cleaningType: ['', Validators.required],
      serviceTime: ['', Validators.required],
      frequency: ['', Validators.required],
      notes: [''],
      riskLevel: ['', Validators.required],
      ppeHardHat: [false],
      ppeSafetyGlasses: [false],
      ppeGloves: [false]
    });
  }

  ngOnInit(): void {
    const siteLocations = this.siteLocations();
    for (let i = 0; i < siteLocations.length; i++) {
      this.setupAddressAutocomplete(i);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  siteLocations(): FormArray {
    return this.clientForm.get('siteLocations') as FormArray;
  }

  createSiteLocation(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, this.postalCodeValidator.bind(this)]]
    });
  }

  addSite(): void {
    const newSiteIndex = this.siteLocations().length;
    this.siteLocations().push(this.createSiteLocation());
    this.showAddressSuggestions[newSiteIndex] = false;
    this.setupAddressAutocomplete(newSiteIndex);
  }

  removeSite(index: number): void {
    this.siteLocations().removeAt(index);
    if (this.currentAddressFocusIndex === index) {
      this.currentAddressFocusIndex = null;
      this.addressSuggestions = [];
    } else if (this.currentAddressFocusIndex && this.currentAddressFocusIndex > index) {
      this.currentAddressFocusIndex--;
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setupAddressAutocomplete(index: number): void {
    const siteGroup = this.siteLocations().at(index) as FormGroup;
    const addressControl = siteGroup.get('address');

    if (addressControl) {
      addressControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter((value: string) => value.length > 2),
          takeUntil(this.destroy$)
        )
        .subscribe(value => {
          this.filterAddresses(value);
        });
    }
  }

  filterAddresses(searchText: string): void {
    if (!searchText || searchText.length < 3) {
      this.addressSuggestions = [];
      return;
    }

    this.ngZone.run(() => {
      const searchLower = searchText.toLowerCase();
      this.addressSuggestions = this.dummyLocations.filter(location =>
        location.fullAddress.toLowerCase().includes(searchLower) ||
        location.address.toLowerCase().includes(searchLower) ||
        location.city.toLowerCase().includes(searchLower) ||
        location.province.toLowerCase().includes(searchLower)
      );
      
      if (this.currentAddressFocusIndex !== null) {
        this.showAddressSuggestions[this.currentAddressFocusIndex] = true;
      }
    });
  }

  hideAddressSuggestions(index: number): void {
    setTimeout(() => {
      this.showAddressSuggestions[index] = false;
    }, 200);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  selectAddressSuggestion(index: number, prediction: {
    fullAddress: string;
    address: string;
    city: string;
    province: string;
  }): void {
    const siteGroup = this.siteLocations().at(index) as FormGroup;
    siteGroup.patchValue({
      address: prediction.address,
      city: prediction.city,
      state: prediction.province
    });
    this.showAddressSuggestions[index] = false;
    this.addressSuggestions = [];
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      console.log('Form submitted:', this.clientForm.value);
      this.isSubmitting = true;
      // Simulating API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Form submitted successfully!');
      }, 1500);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
