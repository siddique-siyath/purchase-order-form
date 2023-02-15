import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PurchaseOrder } from "../models/purchaseOrder";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private submitFormUrl = "http://localhost:3000/api/form"
  private formDetailsUrl = "http://localhost:3000/api/form"
  private ordersListUrl = "http://localhost:3000/api/list"
  private updateOrderUrl = "http://localhost:3000/api/update"

  constructor(private http: HttpClient) { }

  submitForm(purchaseOrder: PurchaseOrder) {
    return this.http.post<{ response: string }>(this.submitFormUrl, purchaseOrder)
  }
  getFormDetails() {
    return this.http.get<{ vendors: [], products: [], orderNo: string, orderDate: string }>(this.formDetailsUrl)
  }
  getOrders() {
    return this.http.get<PurchaseOrder[]>(this.ordersListUrl)
  }
  updateOrder(purchaseOrder: PurchaseOrder){
    return this.http.post<PurchaseOrder[]>(this.updateOrderUrl, purchaseOrder)
  }
}
