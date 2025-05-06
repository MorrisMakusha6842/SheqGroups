import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StockAdjustment {
  id: string;
  productName: string;
  quantity: number;
  adjustmentType: 'Addition' | 'Reduction';
  reason: string;
  notes?: string;
  adjustedBy: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-stock-adjustments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-adjustments.component.html'
})
export class StockAdjustmentsComponent {
  searchTerm = '';
  selectedFilter = 'all';
  showNewAdjustmentForm = false;

  adjustmentReasons = [
    'Damaged Goods',
    'Expired Products',
    'Stock Count Discrepancy',
    'Quality Control Issues',
    'System Error Correction',
    'Lost Items',
    'Found Items',
    'Other'
  ];

  // Sample data
  adjustments: StockAdjustment[] = [
    {
      id: 'ADJ001',
      productName: 'Laptop Pro X1',
      quantity: 5,
      adjustmentType: 'Reduction',
      reason: 'Damaged Goods',
      notes: 'Water damage during storage',
      adjustedBy: 'John Doe',
      date: '2024-03-06T08:00:00',
      status: 'Approved'
    },
    {
      id: 'ADJ002',
      productName: 'Wireless Mouse',
      quantity: 10,
      adjustmentType: 'Addition',
      reason: 'Found Items',
      notes: 'Found in alternate storage location',
      adjustedBy: 'Jane Smith',
      date: '2024-03-06T09:30:00',
      status: 'Pending'
    },
    {
      id: 'ADJ003',
      productName: 'USB-C Cable',
      quantity: 15,
      adjustmentType: 'Reduction',
      reason: 'Stock Count Discrepancy',
      adjustedBy: 'Mike Johnson',
      date: '2024-03-06T10:15:00',
      status: 'Rejected'
    }
  ];

  newAdjustment: StockAdjustment = {
    id: '',
    productName: '',
    quantity: 0,
    adjustmentType: 'Addition',
    reason: '',
    notes: '',
    adjustedBy: '',
    date: new Date().toISOString(),
    status: 'Pending'
  };

  getStatusClass(status: StockAdjustment['status']): string {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getAdjustmentTypeClass(type: StockAdjustment['adjustmentType']): string {
    return type === 'Addition' ? 'text-green-600' : 'text-red-600';
  }

  submitAdjustment() {
    if (this.validateNewAdjustment()) {
      this.newAdjustment.id = `ADJ${(this.adjustments.length + 1).toString().padStart(3, '0')}`;
      this.adjustments.unshift({...this.newAdjustment});
      this.resetForm();
    }
  }

  private validateNewAdjustment(): boolean {
    return !!(this.newAdjustment.productName && 
              this.newAdjustment.quantity > 0 && 
              this.newAdjustment.reason &&
              this.newAdjustment.adjustedBy);
  }

  private resetForm() {
    this.showNewAdjustmentForm = false;
    this.newAdjustment = {
      id: '',
      productName: '',
      quantity: 0,
      adjustmentType: 'Addition',
      reason: '',
      notes: '',
      adjustedBy: '',
      date: new Date().toISOString(),
      status: 'Pending'
    };
  }

  get filteredAdjustments(): StockAdjustment[] {
    return this.adjustments.filter(adjustment => {
      const searchMatch = !this.searchTerm || 
        adjustment.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        adjustment.reason.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        adjustment.adjustedBy.toLowerCase().includes(this.searchTerm.toLowerCase());

      const filterMatch = this.selectedFilter === 'all' || adjustment.status === this.selectedFilter;

      return searchMatch && filterMatch;
    });
  }

  approveAdjustment(id: string) {
    const adjustment = this.adjustments.find(a => a.id === id);
    if (adjustment && adjustment.status === 'Pending') {
      adjustment.status = 'Approved';
    }
  }

  rejectAdjustment(id: string) {
    const adjustment = this.adjustments.find(a => a.id === id);
    if (adjustment && adjustment.status === 'Pending') {
      adjustment.status = 'Rejected';
    }
  }
}
