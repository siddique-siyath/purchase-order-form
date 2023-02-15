import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "../../services/data.service";
import { PurchaseOrder, ItemDetails } from 'src/app/models/purchaseOrder';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-edit-purchase-order',
    templateUrl: './edit-purchase-order.component.html',
    styleUrls: ['./edit-purchase-order.component.css']
})
export class EditPurchaseOrderComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder,
        public dialogRef: MatDialogRef<EditPurchaseOrderComponent>,
        private dataService: DataService,
        public dialog: MatDialog,
        private fb: FormBuilder,
    ) { }

    formDetails = { vendors: [], products: [], orderNo: '', orderDate: '' }
    order: any
    submitResponse = ''
    itemDetails: ItemDetails[] = this.data.itemDetails

    orderForm = new FormGroup({
        vendor: new FormControl({ value: this.data.vendor, disabled: false }, Validators.required),
        inventoryLocation: new FormControl({ value: this.data.inventoryLocation, disabled: false }, Validators.required),
        itemDetails: this.fb.array(this.itemDetails.map((itemDetail) => {
            return this.fb.group({
                productName: new FormControl({ value: itemDetail.productName, disabled: false }, Validators.required),
                quantity: new FormControl({ value: itemDetail.quantity, disabled: false }, Validators.required),
                amount: new FormControl({ value: itemDetail.amount, disabled: false }, Validators.required),
                discount: new FormControl({ value: itemDetail.discount, disabled: false }, Validators.required),
            })
        }
        ))
    })


    ngOnInit() {
        this.dataService.getFormDetails()
            .subscribe({
                next: (res) => {
                    this.formDetails = res
                },
                error: (err) => {
                    console.log(err);
                }
            })
    }

    get item_details() {
        return this.orderForm.get('itemDetails') as FormArray;
    }

    addSellingPoint() {
        this.item_details.push(new FormGroup(
            {
                productName: new FormControl(Validators.required),
                quantity: new FormControl({ value: 0, disabled: false }, Validators.required),
                amount: new FormControl({ value: 0, disabled: false }, Validators.required),
                discount: new FormControl({ value: 0, disabled: false }, Validators.required),
            }
        ))
    }

    deleteSellingPoint(index: number) {
        this.item_details.removeAt(index);
    }

    saveForm() {
        console.log(this.order);
        this.order = this.orderForm.value
        this.order.orderNo=this.data.orderNo
        this.order.orderDate=this.data.orderDate
        console.log(this.order);
    }

    submitForm() {
        console.log(this.order);
        this.order = this.orderForm.value
        this.order.isDeleted=false
        this.order.orderNo=this.data.orderNo
        this.order.orderDate=this.data.orderDate
        console.log(this.order);
        this.dataService.updateOrder(this.order)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitResponse = "Data submitted successfully"
                    this.orderForm.reset()
                    this.openDialog()
                    this.dialogRef.close()
                },
                error: (err) => {
                    console.log(err);
                }
            })
    }
    openDialog() {
        this.dialog.open(PurchaseOrderFormDialog, {
            data: this.submitResponse
        })
    }
}

@Component({
    selector: 'purchase-order-form-dialog',
    templateUrl: '../purchase-order-form/purchase-order-form-dialog.html',
})
export class PurchaseOrderFormDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
