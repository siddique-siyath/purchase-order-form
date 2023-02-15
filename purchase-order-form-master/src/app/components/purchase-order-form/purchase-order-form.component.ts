import { Component, Inject } from '@angular/core';
import { DataService } from "../../services/data.service";
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-purchase-order-form',
    templateUrl: './purchase-order-form.component.html',
    styleUrls: ['./purchase-order-form.component.css'],
})
export class PurchaseOrderFormComponent {
    formDetails = { vendors: [], products: [], orderNo: '', orderDate: '' }
    order: any
    submitResponse = ''

    constructor(private dataService: DataService, public dialog: MatDialog) { }

    orderForm = new FormGroup({
        vendor: new FormControl(Validators.required),
        inventoryLocation: new FormControl('', Validators.required),
        itemDetails: new FormArray([new FormGroup(
            {
                productName: new FormControl(Validators.required),
                quantity: new FormControl({ value: 0, disabled: false }, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
                amount: new FormControl({ value: 0, disabled: false }, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
                discount: new FormControl({ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.max(99), Validators.pattern("^[0-9]*$")]),
            }
        )])
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
        ));
    }

    deleteSellingPoint(index: number) {
        this.item_details.removeAt(index);
    }

    saveForm() {
        console.log(this.order);
        this.order = this.orderForm.value
        console.log(this.order);
    }

    submitForm() {
        console.log(this.order);
        this.order = this.orderForm.value
        this.dataService.submitForm(this.order)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitResponse = res.response
                    this.orderForm.reset()
                    this.openDialog()
                },
                error: (err) => {
                    console.log(err);
                }
            })
    }
    openDialog() {
        this.dialog.open(PurchaseOrderFormDialog, {
            data: this.submitResponse
        });
    }

}

@Component({
    selector: 'purchase-order-form-dialog',
    templateUrl: 'purchase-order-form-dialog.html',
})
export class PurchaseOrderFormDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
