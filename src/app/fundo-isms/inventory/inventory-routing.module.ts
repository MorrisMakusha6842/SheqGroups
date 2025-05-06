import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { StockOverviewComponent } from './stock-overview/stock-overview.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BinCountsComponent } from './bin-counts/bin-counts.component';
import { StockAdjustmentsComponent } from './stock-adjustments/stock-adjustments.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: StockOverviewComponent },
      { path: 'warehouse', component: WarehouseComponent },
      { path: 'bin-counts', component: BinCountsComponent },
      { path: 'adjustments', component: StockAdjustmentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
