import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import Chart from 'chart.js/auto';

interface DailySalesRate {
  date: string;
  totalSales: number;
  daysInPeriod: number;
  averageRate: number;
}

interface StockLevelStatus {
  productId: string;
  productName: string;
  currentStock: number;
  maxCapacity: number;
  status: 'Stable' | 'Warning' | 'Urgent';
  percentageLevel: number;
}

interface ReorderProduct {
  id: string;
  name: string;
  currentStock: number;
  price: number;
  suggestedQuantity: number;
  priorityScore: number;
  status: 'Stable' | 'Warning' | 'Urgent';
}

interface ExpiringProduct {
  id: string;
  name: string;
  barcode: string;
  catalogNumber: string;
  quantity: number;
  expiryDate: string;
  daysUntilExpiry: number;
  status: 'Expiring Soon' | 'Expired';
}

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouse.component.html',
  animations: [
    trigger('expand', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([
          animate('200ms ease-out', style({ height: '*' })),
          animate('300ms ease-out', style({ opacity: 1 }))
        ])
      ]),
      transition(':leave', [
        group([
          animate('200ms ease-in', style({ height: '0' })),
          animate('300ms ease-in', style({ opacity: 0 }))
        ])
      ])
    ])
  ]
})
export class WarehouseComponent implements OnInit {
  @ViewChild('salesRateChart') salesRateChart!: ElementRef;
  @ViewChild('stockLevelsChart') stockLevelsChart!: ElementRef;
  @ViewChild('heatMapContainer') heatMapContainer!: ElementRef;

  private salesRateChartInstance: Chart | null = null;
  private stockLevelsChartInstance: Chart | null = null;
  showExpandedReorderList = false;
  showExpiringStock = false;
  expiringProducts: ExpiringProduct[] = [];

  showFilterDropdown = false;
  showSortDropdown = false;
  filterOptions = {
    category: '',
    urgency: '',
    location: '',
    status: ''
  };

  // Modal states
  showAddStockModal = false;
  showDispatchModal = false;

  // Sample data
  // Sample products with expanded data
  products: ReorderProduct[] = Array.from({ length: 20 }, (_, i) => ({
    id: `PROD${i + 1}`,
    name: `Product ${i + 1}`,
    currentStock: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 1000) + 10,
    suggestedQuantity: Math.floor(Math.random() * 50) + 10,
    priorityScore: Math.random(),
    status: Math.random() > 0.7 ? 'Urgent' : Math.random() > 0.5 ? 'Warning' : 'Stable'
  }));

  // Sample sales rate data
  salesRateData: DailySalesRate[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      totalSales: Math.floor(Math.random() * 10000) + 1000,
      daysInPeriod: 1,
      averageRate: Math.floor(Math.random() * 1000) + 100
    };
  });

  // Sample stock level data
  stockLevelData: StockLevelStatus[] = this.products.map(product => ({
    productId: product.id,
    productName: product.name,
    currentStock: product.currentStock,
    maxCapacity: 100,
    status: product.status,
    percentageLevel: (product.currentStock / 100) * 100
  }));
  locations = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
  urgencyLevels = ['High', 'Medium', 'Low'];

  // Search and sort
  searchTerm = '';
  sortOptions = [
    { value: 'name-asc', label: 'Name (A to Z)' },
    { value: 'name-desc', label: 'Name (Z to A)' },
    { value: 'quantity-desc', label: 'Quantity (High to Low)' },
    { value: 'quantity-asc', label: 'Quantity (Low to High)' }
  ];
  sortField = 'name-asc';

  get priorityProducts(): ReorderProduct[] {
    return [...this.products]
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, 6);
  }

  ngOnInit() {
    this.generateExpiringProducts();
    setTimeout(() => {
      this.initializeCharts();
      this.renderHeatMap();
    }, 0);
  }

  private generateExpiringProducts() {
    // Sample data generation
    this.expiringProducts = Array.from({ length: 8 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 30)); // Random date within next 30 days
      const daysUntil = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      
      return {
        id: `EXP${i + 1}`,
        name: `Product ${i + 1}`,
        barcode: `BAR${String(i + 1).padStart(6, '0')}`,
        catalogNumber: `CAT${String(Math.floor(i / 3) + 1).padStart(3, '0')}`,
        quantity: Math.floor(Math.random() * 50) + 1,
        expiryDate: date.toISOString().split('T')[0],
        daysUntilExpiry: daysUntil,
        status: daysUntil <= 0 ? 'Expired' as const : 'Expiring Soon' as const
      };
    }).sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
  }

  toggleExpiringStock() {
    this.showExpiringStock = !this.showExpiringStock;
  }

  private initializeCharts() {
    this.createSalesRateChart();
  }

  private createSalesRateChart() {
    if (this.salesRateChartInstance) {
      this.salesRateChartInstance.destroy();
    }

    const ctx = this.salesRateChart.nativeElement.getContext('2d');
    this.salesRateChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.salesRateData.map(d => d.date),
        datasets: [{
          label: 'Average Sales Rate',
          data: this.salesRateData.map(d => d.averageRate),
          borderColor: 'rgb(59, 130, 246)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                return `$${value}/day`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Sales Rate ($/day)'
            }
          }
        }
      }
    });
  }

  isHeatMapScrollable = false;

  private renderHeatMap() {
    const container = this.heatMapContainer.nativeElement;
    container.innerHTML = ''; // Clear previous content
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(5, 1fr)';
    container.style.gap = '0.5rem';
    container.style.padding = '1rem';

    this.stockLevelData.forEach(item => {
      const cell = document.createElement('div');
      cell.className = 'p-2 rounded-lg text-xs';
      cell.style.cursor = 'pointer';
      
      const bgColor = this.getStatusColor(item.status);
      cell.style.backgroundColor = bgColor;
      cell.style.color = item.status === 'Stable' ? '#1a4731' : '#fff';
      
      cell.innerHTML = `
        <div class="font-medium">${item.productName}</div>
        <div>${Math.round(item.percentageLevel)}%</div>
      `;
      
      container.appendChild(cell);
    });

    // Check if content is scrollable
    setTimeout(() => {
      this.checkHeatMapScroll();
    });

    // Add scroll event listener
    container.addEventListener('scroll', () => {
      this.checkHeatMapScroll();
    });
  }

  private checkHeatMapScroll() {
    const container = this.heatMapContainer.nativeElement;
    this.isHeatMapScrollable = container.scrollHeight > container.clientHeight;
  }

  // Also update styles.scss to add the scrollbar-hide utility class
  private getStatusColor(status: 'Stable' | 'Warning' | 'Urgent'): string {
    switch (status) {
      case 'Stable': return 'rgb(167, 243, 208)'; // Green-100
      case 'Warning': return 'rgb(253, 230, 138)'; // Yellow-300
      case 'Urgent': return 'rgb(248, 113, 113)'; // Red-400
      default: return 'rgb(229, 231, 235)'; // Gray-200
    }
  }

  getStatusClass(status: 'Stable' | 'Warning' | 'Urgent'): string {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  toggleExpandedList() {
    this.showExpandedReorderList = !this.showExpandedReorderList;
  }

  toggleFilter(event: Event) {
    event.stopPropagation();
    this.showFilterDropdown = !this.showFilterDropdown;
    this.showSortDropdown = false;
  }

  toggleSort(event: Event) {
    event.stopPropagation();
    this.showSortDropdown = !this.showSortDropdown;
    this.showFilterDropdown = false;
  }

  get filteredProducts(): ReorderProduct[] {
    return this.products.filter(product => {
      const searchMatch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const statusMatch = !this.filterOptions.status || 
        product.status === this.filterOptions.status;
      
      return searchMatch && statusMatch;
    });
  }

  // Categories array for filtering
  categories = ['Electronics', 'Food & Beverages', 'Clothing', 'Automotive', 'Home & Garden', 'Office Supplies'];
}
