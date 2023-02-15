import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "../../services/data.service";
import {PurchaseOrder  } from "../../models/purchaseOrder";

@Component({
  selector: 'app-delete-purchase-order',
  templateUrl: './delete-purchase-order.component.html',
  styleUrls: ['./delete-purchase-order.component.css']
})
export class DeletePurchaseOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePurchaseOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data:PurchaseOrder ,
    private dataService: DataService
) { }

deleteItem(){
  this.dialogRef.close({isDeleted:true})
}
}
