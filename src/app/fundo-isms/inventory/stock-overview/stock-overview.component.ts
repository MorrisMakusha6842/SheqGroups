import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

interface Product {
  name: string;
  barcode: string;
  catalogNumber: string;
  quantity: number;
  expiryDate: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category: string;
}

interface CategoryDemand {
  category: string;
  demandLevel: number;
  leadingProduct: string;
  productQuantity: number;
}

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-overview.component.html'
})
export class StockOverviewComponent implements OnInit {
  @ViewChild('valueChart') valueChart!: ElementRef;
  @ViewChild('categoryChart') categoryChart!: ElementRef;

  // Loading state
  isLoading = false;
  loadingMessage = '';

  // Dropdown states
  showFilterDropdown = false;
  showSortDropdown = false;

  searchTerm = '';
  showAddProductForm = false;

  // Filter options
  filterOptions = {
    catalog: '',
    status: ''
  };

  catalogNumbers = [
    'CAT001', 'CAT002', 'CAT003', 'CAT004', 'CAT005'
  ];

  // Sort options
  sortOptions = [
    { value: 'name-asc', label: 'Name (A to Z)' },
    { value: 'name-desc', label: 'Name (Z to A)' },
    { value: 'quantity-desc', label: 'Quantity (High to Low)' },
    { value: 'quantity-asc', label: 'Quantity (Low to High)' }
  ];
  sortField: string = 'name-asc';


  newProduct: Product = {
    name: '',
    barcode: '',
    catalogNumber: '',
    quantity: 0,
    expiryDate: '',
    status: 'In Stock',
    category: 'Electronics'
  };

  // Pagination
  currentPage = 1;
  itemsPerPage = 20;
  totalPages = 1;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown') && !target.closest('.filter-button')) {
      this.showFilterDropdown = false;
    }
    if (!target.closest('.sort-dropdown') && !target.closest('.sort-button')) {
      this.showSortDropdown = false;
    }
  }

  // Product categories
  categories = ['Electronics', 'Clothing', 'Food', 'Others'];

  products = Array.from({ length: 50 }, (_, i) => ({
    name: `Product ${i + 1}`,
    barcode: `BAR${String(i + 1).padStart(6, '0')}`,
    catalogNumber: `CAT${String(Math.floor(i / 10) + 1).padStart(3, '0')}`,
    quantity: Math.floor(Math.random() * 200),
    expiryDate: new Date(2024, Math.floor(i / 4), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    status: (Math.random() > 0.7 
            ? 'Out of Stock' 
            : Math.random() > 0.5 
              ? 'Low Stock' 
              : 'In Stock') as 'In Stock' | 'Low Stock' | 'Out of Stock',
    category: this.categories[Math.floor(Math.random() * this.categories.length)]
  })).sort((a, b) => a.name.localeCompare(b.name));

  ngOnInit() {
    this.calculateTotalPages();
    setTimeout(() => {
      this.createValueChart();
      this.createCategoryChart();
    }, 0);
  }

  // Pagination methods
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPagedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  getPaginationRange(): number[] {
    const range = [];
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxPages - 1);

    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
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

  applyFilter() {
    this.isLoading = true;
    this.loadingMessage = 'Applying filters...';
    
    setTimeout(() => {
      this.showFilterDropdown = false;
      this.currentPage = 1;
      this.calculateTotalPages();
      this.isLoading = false;
    }, 500);
  }

  applySort(field: string) {
    this.isLoading = true;
    this.loadingMessage = 'Sorting products...';
    
    setTimeout(() => {
      this.sortField = field;
      this.showSortDropdown = false;
      this.sortProducts();
      this.isLoading = false;
    }, 500);
  }

  private sortProducts() {
    const [field, direction] = this.sortField.split('-');
    this.products.sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
      }
      return direction === 'asc' ? comparison : -comparison;
    });
  }

  get filteredProducts() {
    return this.products.filter(product => {
      const searchMatch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.barcode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.catalogNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const catalogMatch = !this.filterOptions.catalog || 
        product.catalogNumber === this.filterOptions.catalog;
      
      const statusMatch = !this.filterOptions.status || 
        product.status === this.filterOptions.status;
      
      return searchMatch && catalogMatch && statusMatch;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.barcode) {
      this.products.push({...this.newProduct});
      this.showAddProductForm = false;
      this.newProduct = {
        name: '',
        barcode: '',
        catalogNumber: '',
        quantity: 0,
        expiryDate: '',
        status: 'In Stock',
        category: 'Electronics'
      };
    }
  }

  refreshData() {
    this.createValueChart();
    this.createCategoryChart();
  }

  private createValueChart() {
    const ctx = this.valueChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Stock Value',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: 'rgb(59, 130, 246)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Calculate demand level for each category
  private calculateDemandLevels(): CategoryDemand[] {
    const categoryDemand: CategoryDemand[] = [];
    
    this.categories.forEach(category => {
      const productsInCategory = this.products.filter(p => p.category === category);
      
      // Skip if no products in category
      if (productsInCategory.length === 0) {
        return;
      }

      // Calculate demand based on quantity and status
      const totalDemand = productsInCategory.reduce((sum, product) => {
        let demandFactor = product.quantity;
        if (product.status === 'Out of Stock') {
          demandFactor *= 2; // Higher demand weight for out of stock items
        } else if (product.status === 'Low Stock') {
          demandFactor *= 1.5; // Medium demand weight for low stock items
        }
        return sum + demandFactor;
      }, 0);

      // Find leading product (product with highest quantity)
      const leadingProduct = productsInCategory.reduce((prev, current) => {
        return prev.quantity > current.quantity ? prev : current;
      });

      categoryDemand.push({
        category,
        demandLevel: totalDemand,
        leadingProduct: leadingProduct.name,
        productQuantity: leadingProduct.quantity
      });
    });

    return categoryDemand;
  }

  private createCategoryChart() {
    const ctx = this.categoryChart.nativeElement.getContext('2d');
    const categoryDemand = this.calculateDemandLevels();
    
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categoryDemand.map(cd => cd.category),
        datasets: [{
          data: categoryDemand.map(cd => cd.demandLevel),
          backgroundColor: [
            'rgb(59, 130, 246)', // Blue
            'rgb(16, 185, 129)', // Green
            'rgb(249, 115, 22)', // Orange
            'rgb(107, 114, 128)' // Gray
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const categoryData = categoryDemand[context.dataIndex];
                return [
                  `Demand Level: ${Math.round(categoryData.demandLevel)}`,
                  `Leading Product: ${categoryData.leadingProduct}`,
                  `Quantity: ${categoryData.productQuantity}`
                ];
              }
            }
          },
          legend: {
            position: 'right'
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    });
  }
}
