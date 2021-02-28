export interface ReorderModel {
    month: number;
    year: number;
    reorders: IdOrder[];
}

export interface IdOrder {
    id: number;
    aorder: number;
}