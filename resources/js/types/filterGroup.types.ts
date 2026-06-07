export interface FilterType {
    label: string;
    value: string | number;
}

export interface FilterGroupType {
    filters: Record<string, string | number | null>;
    options: {
        brands?: FilterType[];
        volumes?: FilterType[];
        years?: FilterType[];
        flavors?: FilterType[];
        countries?: FilterType[];
    };
}