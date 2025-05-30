import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
      <div
        *ngFor="let toast of toasts; trackBy: trackByToastId"
        class="toast-container"
        [ngClass]="getToastClasses(toast.type)"
        [@slideInOut]>
        
        <div class="flex items-center justify-between p-4 rounded-lg shadow-lg max-w-sm">
          <!-- Icon -->
          <div class="flex-shrink-0 mr-3">
            <svg *ngIf="toast.type === 'success'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            
            <svg *ngIf="toast.type === 'error'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            
            <svg *ngIf="toast.type === 'warning'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            
            <svg *ngIf="toast.type === 'info'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
          </div>
          
          <!-- Message -->
          <div class="flex-1">
            <p class="text-sm font-medium">{{ toast.message }}</p>
          </div>
          
          <!-- Close button -->
          <button
            type="button"
            class="ml-3 flex-shrink-0 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            [ngClass]="getCloseButtonClasses(toast.type)"
            (click)="closeToast(toast.id)">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      animation: slideInUp 0.3s ease-out;
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription?: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  trackByToastId(index: number, toast: Toast): number {
    return toast.id;
  }

  getToastClasses(type: string): string {
    const baseClasses = 'transition-all duration-300 ease-in-out';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-50 text-green-800 border border-green-200`;
      case 'error':
        return `${baseClasses} bg-red-50 text-red-800 border border-red-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 text-yellow-800 border border-yellow-200`;
      case 'info':
        return `${baseClasses} bg-blue-50 text-blue-800 border border-blue-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-800 border border-gray-200`;
    }
  }

  getCloseButtonClasses(type: string): string {
    switch (type) {
      case 'success':
        return 'text-green-400 hover:text-green-600 focus:ring-green-600';
      case 'error':
        return 'text-red-400 hover:text-red-600 focus:ring-red-600';
      case 'warning':
        return 'text-yellow-400 hover:text-yellow-600 focus:ring-yellow-600';
      case 'info':
        return 'text-blue-400 hover:text-blue-600 focus:ring-blue-600';
      default:
        return 'text-gray-400 hover:text-gray-600 focus:ring-gray-600';
    }
  }

  closeToast(id: number) {
    this.toastService.remove(id);
  }
}
