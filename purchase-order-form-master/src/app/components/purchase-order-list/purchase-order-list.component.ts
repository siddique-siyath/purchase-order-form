import { Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { PurchaseOrder, ItemDetails } from "../../models/purchaseOrder";
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditPurchaseOrderComponent } from "../edit-purchase-order/edit-purchase-order.component";
import { DeletePurchaseOrderComponent } from "../delete-purchase-order/delete-purchase-order.component";

@Component({
    selector: 'app-purchase-order-list',
    templateUrl: './purchase-order-list.component.html',
    styleUrls: ['./purchase-order-list.component.css'],
})
export class PurchaseOrderListComponent {

    purchaseOrders!: PurchaseOrder[]
    purchaseOrder!: PurchaseOrder

    constructor(
        private dataService: DataService,
        private router: Router,
        public dialog: MatDialog
    ) { }
    displayedColumns: string[] = ['_id', 'vendor', 'orderNo', 'orderDate', 'inventoryLocation', 'edit', 'delete'];
    dataSource = new MatTableDataSource<PurchaseOrder>();

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
    }

    ngOnInit() {
        this.dataService.getOrders()
            .subscribe({
                next: (res) => {
                    this.purchaseOrders = res
                    this.dataSource.data = res
                },
                error: (err) => {
                    console.log(err);

                }
            })
    }
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editOrder(order: PurchaseOrder) {
        this.purchaseOrder = order
        const dialogRef = this.dialog.open(EditPurchaseOrderComponent, {
            data: order
        });
        dialogRef.afterClosed()
            .subscribe(
                res => {
                    this.dataService.getOrders()
                        .subscribe({
                            next: (res) => {
                                this.purchaseOrders = res
                                this.dataSource.data = res
                            },
                            error: (err) => {
                                console.log(err);

                            }
                        })
                }
            )
    }

    deleteOrder(order: PurchaseOrder) {
        const dialogRef = this.dialog.open(DeletePurchaseOrderComponent, {
            data: order
        });
        dialogRef.afterClosed()
            .subscribe(
                res => {
                    order.isDeleted = res.isDeleted
                    this.dataService.updateOrder(order)
                        .subscribe({
                            next: (res) => {
                                this.purchaseOrders = res
                                this.dataSource.data = res
                            },
                            error: (err) => {
                                console.log(err);
                            }
                        })
                }
            )
    }

}