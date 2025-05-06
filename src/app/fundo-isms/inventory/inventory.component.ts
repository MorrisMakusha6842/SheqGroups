import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent {
  selectedPeriod = 'daily';
  isLoading = false;

  constructor(public router: Router) {}

  tabs = [
    { id: 'overview', label: 'Stock Overview', path: 'overview' },
    { id: 'warehouse', label: 'Warehouse', path: 'warehouse' },
    { id: 'bin-counts', label: 'Bin Counts', path: 'bin-counts' },
    { id: 'adjustments', label: 'Stock Adjustments', path: 'adjustments' }
  ];

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  switchTab(path: string) {
    this.router.navigate(['inventory', path]);
  }

  onPeriodChange(event: any) {
    this.selectedPeriod = event.target.value;
    this.refreshData();
  }

  refreshData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
