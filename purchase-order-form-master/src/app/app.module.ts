import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchaseOrderFormComponent } from './components/purchase-order-form/purchase-order-form.component';
import { MaterialModule } from "./modules/material/material.module";
import { PurchaseOrderListComponent } from './components/purchase-order-list/purchase-order-list.component';
import { EditPurchaseOrderComponent } from './components/edit-purchase-order/edit-purchase-order.component';
import { DeletePurchaseOrderComponent } from './components/delete-purchase-order/delete-purchase-order.component';

@NgModule({
  declarations: [
    AppComponent,
    PurchaseOrderFormComponent,
    PurchaseOrderListComponent,
    EditPurchaseOrderComponent,
    DeletePurchaseOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
