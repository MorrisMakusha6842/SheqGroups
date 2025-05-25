import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserData } from '../../services/auth.service';

@Component({
  selector: 'app-create-user-account',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.scss']
})
export class CreateUserAccountComponent {
  @ViewChild('userForm') userForm!: NgForm;
  submitted = false;
  isSubmitting = false;
  currentStep: number = 1;
  errorMessage: string = '';
  
  user = {
    profilePhoto: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    province: '',
    role: '',
    password: ''
  };

  departments = [
    'SHEQ',
    'Operations',
    'Human Resources',
    'Finance',
    'IT',
    'Maintenance'
  ];

  provinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Free State',
    'Northern Cape'
  ];

  roles = [
    'Admin',
    'Manager',
    'Supervisor',
    'Employee',
    'Trainee'
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  nextStep() {
    this.submitted = true;
    
    if (this.currentStep === 1) {
      if (this.userForm?.controls['fullName']?.valid &&
          this.userForm?.controls['email']?.valid &&
          this.userForm?.controls['phone']?.valid &&
          this.userForm?.controls['department']?.valid &&
          this.userForm?.controls['province']?.valid) {
        this.currentStep++;
        this.submitted = false;
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePhoto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  captureImage() {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        video.srcObject = stream;
        video.play();
  
        video.onplaying = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          setTimeout(() => {
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');
            this.user.profilePhoto = imageData;
            stream.getTracks().forEach(track => track.stop());
          }, 1000);
        };
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        this.errorMessage = 'Could not access camera';
      });
  }
  
  async onSubmit(form: NgForm) {
    this.submitted = true;
    this.errorMessage = '';
    
    if (form.valid && this.currentStep === 2) {
      await this.createUserAccount();
    } else if (this.currentStep === 1) {
      this.nextStep();
    }
  }

  async createUserAccount() {
    this.isSubmitting = true;
    
    try {
      const { password, ...userData } = this.user;
      
      // Create user account
      await this.authService.createUserAccount(userData as Omit<UserData, 'uid'>, password);
      
      alert('Account created successfully!');
      this.router.navigate(['/log-in']);
      
    } catch (error: any) {
      console.error('Error creating account:', error);
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return error.message || 'An error occurred while creating your account.';
    }
  }

  navigateTo(route: string): void {
    if (route === 'LogIn') {
      this.router.navigateByUrl('/log-in');
    }
  }
}

