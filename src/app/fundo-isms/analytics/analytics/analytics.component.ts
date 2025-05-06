import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, TooltipItem, registerables } from 'chart.js';
import { AuthService } from '../../../services/auth.service';

Chart.register(...registerables);

interface LowStockItem {
  name: string;
  quantity: number;
  threshold: number;
  category: string;
}

interface TopSellingProduct {
  id: string;
  name: string;
  price: number;
  totalSales: number;
  image: string;
  dateAdded: Date;
}

interface TaskSummary {
  completed: number;
  total: number;
  completionRate: number;
}

interface WarehouseAlert {
  count: number;
  severity: 'low' | 'medium' | 'high';
  type: string;
}

interface BinCountSummary {
  dailyCount: number;
  trend: 'up' | 'down';
  changePercent: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('inventoryChart') inventoryChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('maximizedChart') maximizedChart!: ElementRef<HTMLCanvasElement>;
  
  userName = '';
  totalInventoryCost = 1250000;
  costTrend: 'up' | 'down' = 'up';
  costChangePercent = 12;
  isMaximized = false;
  chart?: Chart;
  maximizedChartInstance?: Chart;
  currentProductIndex = 0;

  // Sample data for new features
  taskSummary: TaskSummary = {
    completed: 45,
    total: 60,
    completionRate: 75
  };

  warehouseAlerts: WarehouseAlert = {
    count: 8,
    severity: 'medium',
    type: 'Storage Issues'
  };

  binCountSummary: BinCountSummary = {
    dailyCount: 156,
    trend: 'up',
    changePercent: 15
  };

  // Sample top selling products data
  topSellingProducts: TopSellingProduct[] = [
    {
      id: '1',
      name: 'Premium Laptop X1',
      price: 1299.99,
      totalSales: 25000,
      image: '/assets/images/products/laptop.jpg',
      dateAdded: new Date()
    },
    {
      id: '2',
      name: 'Wireless Headphones Pro',
      price: 249.99,
      totalSales: 18500,
      image: '/assets/images/products/headphones.jpg',
      dateAdded: new Date()
    },
    {
      id: '3',
      name: 'Smart Watch Elite',
      price: 399.99,
      totalSales: 15000,
      image: '/assets/images/products/watch.jpg',
      dateAdded: new Date()
    },
    {
      id: '4',
      name: 'USB-C Dock Station',
      price: 79.99,
      totalSales: 12000,
      image: '/assets/images/products/dock.jpg',
      dateAdded: new Date()
    },
    {
      id: '5',
      name: 'Mechanical Keyboard',
      price: 159.99,
      totalSales: 9800,
      image: '/assets/images/products/keyboard.jpg',
      dateAdded: new Date()
    },
    {
      id: '6',
      name: '4K Gaming Monitor',
      price: 699.99,
      totalSales: 8500,
      image: '/assets/images/products/monitor.jpg',
      dateAdded: new Date()
    },
    {
      id: '7',
      name: 'Wireless Mouse',
      price: 49.99,
      totalSales: 7500,
      image: '/assets/images/products/mouse.jpg',
      dateAdded: new Date()
    }
  ];

  chartData = {
    labels: [
      'Electronics', 'Clothing', 'Books', 'Sports', 'Home', 'Garden', 
      'Toys', 'Beauty', 'Food', 'Health', 'Auto', 'Office', 
      'Furniture', 'Appliances', 'Tools', 'Outdoor'
    ],
    values: Array(16).fill(0).map(() => Math.floor(Math.random() * 3000) + 500)
  };

  lowStockItems: LowStockItem[] = [
    { name: 'Laptop Pro X1', quantity: 5, threshold: 10, category: 'Electronics' },
    { name: 'Office Chair Deluxe', quantity: 3, threshold: 15, category: 'Furniture' },
    { name: 'Wireless Mouse', quantity: 8, threshold: 20, category: 'Accessories' },
    { name: 'Premium Headphones', quantity: 4, threshold: 12, category: 'Electronics' },
    { name: 'Standing Desk', quantity: 2, threshold: 8, category: 'Furniture' },
    { name: 'USB-C Hub', quantity: 6, threshold: 25, category: 'Accessories' }
  ];

  constructor(private authService: AuthService) {}

  @HostListener('document:keydown.escape')
  onEscapePressed(): void {
    if (this.isMaximized) {
      this.toggleMaximize();
    }
  }

  @HostListener('document:keydown.arrowleft')
  navigatePrevious(): void {
    this.moveCarousel('prev');
  }

  @HostListener('document:keydown.arrowright')
  navigateNext(): void {
    this.moveCarousel('next');
  }

  moveCarousel(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentProductIndex = (this.currentProductIndex + 1) % this.topSellingProducts.length;
    } else {
      this.currentProductIndex = this.currentProductIndex === 0 
        ? this.topSellingProducts.length - 1 
        : this.currentProductIndex - 1;
    }
  }

  getVisibleProducts(): TopSellingProduct[] {
    const totalProducts = this.topSellingProducts.length;
    const visibleProducts: TopSellingProduct[] = [];
    
    for (let i = 0; i < 5; i++) {
      const index = (this.currentProductIndex + i) % totalProducts;
      visibleProducts.push(this.topSellingProducts[index]);
    }
    
    return visibleProducts;
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.userName = currentUser.firstName || 'User';
    }
  }

  ngAfterViewInit(): void {
    this.createInventoryChart();
  }

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
    
    setTimeout(() => {
      if (this.isMaximized) {
        this.createMaximizedChart();
      } else {
        if (this.maximizedChartInstance) {
          this.maximizedChartInstance.destroy();
        }
      }
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);

    if (this.isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private getChartConfig(fontSize: number = 10): ChartConfiguration<'bar'> {
    const gradient = this.inventoryChart.nativeElement.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    gradient?.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient?.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    return {
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: [{
          label: 'Inventory Amount',
          data: this.chartData.values,
          backgroundColor: gradient || 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          borderRadius: 4,
          barThickness: 20,
          maxBarThickness: 30
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1F2937',
            bodyColor: '#1F2937',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            padding: 10,
            bodyFont: { size: fontSize + 1 },
            titleFont: { 
              size: fontSize + 1, 
              weight: 'bold'
            },
            callbacks: {
              label: (context: TooltipItem<'bar'>) => {
                const value = context.raw as number;
                return `Amount: $${value.toLocaleString()}`;
              }
            },
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: { size: fontSize },
              autoSkip: true,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.4)'
            },
            border: {
              dash: [4, 4]
            },
            ticks: {
              font: { size: fontSize },
              callback: (value: number | string) => `$${Number(value).toLocaleString()}`
            },
            title: {
              display: true,
              text: 'Amount ($)',
              font: {
                size: fontSize + 2,
                weight: 'bold'
              }
            }
          }
        }
      }
    };
  }

  private createInventoryChart(): void {
    const canvas = this.inventoryChart.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Could not get chart context');
      return;
    }

    this.chart = new Chart(ctx, this.getChartConfig(10));
  }

  private createMaximizedChart(): void {
    if (this.maximizedChart) {
      const canvas = this.maximizedChart.nativeElement;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Could not get maximized chart context');
        return;
      }

      this.maximizedChartInstance = new Chart(ctx, this.getChartConfig(12));
    }
  }

  getTotalAlerts(): number {
    return this.lowStockItems.length;
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.maximizedChartInstance) {
      this.maximizedChartInstance.destroy();
    }
  }
}
