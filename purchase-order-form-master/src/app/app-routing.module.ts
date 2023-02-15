import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form.component';
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "form",
    pathMatch: "full"
  },
  {
    path: "form",
    component: PurchaseOrderFormComponent
  },
  {
    path: "list",
    component: PurchaseOrderListComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
