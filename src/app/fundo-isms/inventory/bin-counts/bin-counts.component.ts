import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StockCategory {
  id: string;
  name: string;
  itemCount: number;
  lastCount?: string;
}

interface BinCount {
  id: string;
  binName: string;
  dateTime: string;
  countedBy: string;
  variance: number;
  status: 'Verified' | 'Discrepancy';
  verifiedBy?: string;
}

@Component({
  selector: 'app-bin-counts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bin-counts.component.html',
  styleUrls: ['./bin-counts.component.scss']
})
export class BinCountsComponent {
  selectedCategory: StockCategory | null = null;
  selectedFilter = 'all';
  showFilterDropdown = false;
  showSortDropdown = false;
  searchTerm = '';
  isLoading = true;
  showCategorySelection = false;

  ngOnInit() {
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // Sample categories
  stockCategories: StockCategory[] = [
    { id: 'CAT1', name: 'Electronics', itemCount: 150, lastCount: '2024-03-01' },
    { id: 'CAT2', name: 'Office Supplies', itemCount: 245, lastCount: '2024-03-03' },
    { id: 'CAT3', name: 'Furniture', itemCount: 75, lastCount: '2024-02-28' },
    { id: 'CAT4', name: 'Kitchen Equipment', itemCount: 180, lastCount: '2024-03-05' },
    { id: 'CAT5', name: 'Medical Supplies', itemCount: 320, lastCount: '2024-03-02' },
    { id: 'CAT6', name: 'Tools & Hardware', itemCount: 195, lastCount: '2024-03-04' }
  ];

  // Sample completed counts
  completedCounts: BinCount[] = [
    {
      id: 'BIN001',
      binName: 'Electronics Storage A1',
      dateTime: '2024-03-06T14:30:00',
      countedBy: 'John Smith',
      variance: -2.5,
      status: 'Verified',
      verifiedBy: 'Jane Wilson'
    },
    {
      id: 'BIN002',
      binName: 'Office Supplies B2',
      dateTime: '2024-03-06T15:45:00',
      countedBy: 'Sarah Johnson',
      variance: 0,
      status: 'Verified',
      verifiedBy: 'Mike Brown'
    },
    {
      id: 'BIN003',
      binName: 'Medical Storage C1',
      dateTime: '2024-03-06T16:15:00',
      countedBy: 'David Clark',
      variance: 5.8,
      status: 'Discrepancy'
    }
  ];

  filterOptions = {
    status: '',
    date: '',
    category: ''
  };

  sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'variance-desc', label: 'Variance (High to Low)' },
    { value: 'variance-asc', label: 'Variance (Low to High)' }
  ];

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

  getStatusClass(status: BinCount['status']): string {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Discrepancy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getVarianceClass(variance: number): string {
    if (variance === 0) return 'text-gray-600';
    return variance > 0 ? 'text-green-600' : 'text-red-600';
  }

  selectCategory(category: StockCategory) {
    this.selectedCategory = category;
    this.printBinSheet(category);
  }

  toggleCategorySelection() {
    this.showCategorySelection = !this.showCategorySelection;
    if (!this.showCategorySelection) {
      this.selectedCategory = null;
    }
  }

  printBinSheet(category: StockCategory) {
    // TODO: Implement print functionality
    console.log(`Printing bin sheet for category: ${category.name}`);
    this.showCategorySelection = false;
    this.selectedCategory = null;
  }

  get filteredCounts(): BinCount[] {
    return this.completedCounts.filter(count => {
      const searchMatch = !this.searchTerm || 
        count.binName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        count.countedBy.toLowerCase().includes(this.searchTerm.toLowerCase());

      const statusMatch = !this.filterOptions.status || count.status === this.filterOptions.status;

      return searchMatch && statusMatch;
    });
  }
}
