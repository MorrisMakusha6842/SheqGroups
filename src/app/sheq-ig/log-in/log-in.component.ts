import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  currentStep: number = 1;
  user = {
    profilePhoto: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    employmentType: 'Full-Time',
    role: 'Staff',
    location: '',
    password: ''
  };

  // Dummy credentials for testing
  dummyCredentials = {
    email: 'user@greenclean.com',
    password: 'SecurePass123!'
  };

  departments = ['Sanitation', 'Recycling', 'Hazardous Waste', 'Management'];
  employmentTypes = ['Full-Time', 'Part-Time', 'Contractor'];
  roles = ['Staff', 'Supervisor', 'Manager'];
  locations = ['Main Facility', 'West District', 'East District', 'Remote'];

  nextStep() {
    if (this.currentStep < 2) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.user.profilePhoto = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Add your authentication logic here
      if (this.user.email === this.dummyCredentials.email && 
          this.user.password === this.dummyCredentials.password) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  constructor(private router: Router) {}

  
}
