export interface ButtonItem {
    name: string;
    link: string;
}

export interface SortButtonType {
    label: string;
    field: string; // database column name
    currentSort: string | null; // e.g. 'volume'
    currentDirection: 'asc' | 'desc' | null;
}
