import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild('stockChart') stockChart!: ElementRef;
  
  // Card properties
  maximizedCard: any = null;
  
  // Chart instance
  chart: Chart | null = null;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeChart();
  }

  ngAfterViewInit() {
    if (this.stockChart) {
      this.initializeChart();
    }
  }

  private initializeChart(): void {
    if (this.stockChart && this.stockChart.nativeElement) {
      const ctx = this.stockChart.nativeElement.getContext('2d');
      
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Stock Level',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  // Method to handle card maximization
  maximizeCard(cardName: string): void {
    this.maximizedCard = cardName;
    // Reinitialize chart when maximized to ensure proper rendering
    setTimeout(() => {
      this.initializeChart();
    }, 100);
  }

  // Method to handle card minimization
  minimizeCard(): void {
    this.maximizedCard = null;
    // Reinitialize chart when minimized
    setTimeout(() => {
      this.initializeChart();
    }, 100);
  }

  // Clean up chart instance when component is destroyed
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  navigateToAnalytics() {
    this.router.navigate(['analytics'], { relativeTo: this.router.routerState.root });
  }

  navigateToOrders() {
    this.router.navigate(['orders'], { relativeTo: this.router.routerState.root });
  }

  // Navigation methods for admin section
  navigateToProfile() {
    this.router.navigate(['profile'], { relativeTo: this.router.routerState.root });
  }

  navigateToUserManagement() {
    this.router.navigate(['users'], { relativeTo: this.router.routerState.root });
  }

  navigateToPos() {
    this.router.navigate(['pos'], { relativeTo: this.router.routerState.root });
  }

  getInitials(user: any): string {
    if (!user.firstName || !user.lastName) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }
}
