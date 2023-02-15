export interface PurchaseOrder {
    isDeleted:boolean;
    vendor: string;
    orderNo: string;
    orderDate: Date;
    inventoryLocation: string;
    itemDetails: ItemDetails[];
}

export interface ItemDetails {
    productName: string;
    quantity: number;
    amount: number;
    discount: number;
    tax: number;
    total: number;
}