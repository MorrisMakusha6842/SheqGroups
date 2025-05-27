import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserData } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

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
    'admin',
    'manager',
    'supervisor',
    'employee',
    'trainee'
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
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
        this.toastService.error('Could not access camera. Please try uploading an image instead.');
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
      console.log('Component: Starting user creation...');
      console.log('User data being sent:', this.user);
      
      const { password, ...userData } = this.user;
      
      // Validate required fields
      if (!userData.email || !userData.fullName || !password) {
        throw new Error('Missing required fields');
      }
      
      // Create user account with timeout wrapper
      const createAccountPromise = this.authService.createUserAccount(userData as Omit<UserData, 'uid'>, password);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Overall operation timed out')), 25000);
      });
      
      const result = await Promise.race([createAccountPromise, timeoutPromise]) as { success: boolean; user?: any; firestoreSuccess?: boolean };
      
      if (result.success) {
        // SUCCESS! User was created in Firebase Auth
        console.log('✅ Account created successfully!');
        
        // Show appropriate success message
        if (result.firestoreSuccess) {
          this.toastService.success(
            `🎉 Welcome ${userData.fullName}! Your account has been created successfully.`,
            6000
          );
        } else {
          this.toastService.success(
            `🎉 Welcome ${userData.fullName}! Your account has been created successfully. Additional profile data will be synced shortly.`,
            8000
          );
          
          // Optional: Show a subtle warning about profile data
          setTimeout(() => {
            this.toastService.warning(
              'Profile data sync is pending. All features are available.',
              5000
            );
          }, 3000);
        }
        
        // Reset form
        this.resetForm();
        
        // Navigate to login after showing success
        setTimeout(() => {
          this.router.navigate(['/log-in']);
        }, 2000);
        
      } else {
        throw new Error('Account creation failed');
      }
      
    } catch (error: any) {
      console.error('Component: Error creating account:', error);
      this.errorMessage = this.getErrorMessage(error);
      
      // Show error toast only for actual failures
      this.toastService.error(
        this.getErrorMessage(error),
        8000
      );
    } finally {
      // Ensure loading state is always reset
      this.isSubmitting = false;
      console.log('Loading state reset, isSubmitting:', this.isSubmitting);
    }
  }

  private resetForm() {
    this.user = {
      profilePhoto: '',
      fullName: '',
      email: '',
      phone: '',
      department: '',
      province: '',
      role: '',
      password: ''
    };
    this.currentStep = 1;
    this.submitted = false;
    this.errorMessage = '';
  }

  private getErrorMessage(error: any): string {
    console.log('Error object:', error);
    
    // Don't show timeout as error if it's just Firestore sync
    if (error.message.includes('Overall operation timed out')) {
      return 'The operation is taking longer than expected. Please try again.';
    }
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/configuration-not-found':
        return 'Firebase configuration error. Please contact support.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
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

