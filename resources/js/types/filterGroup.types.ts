export interface FilterGroupType {
    label: string;
    value: string | number;
}

export interface FilterGroupProps {
    filters: Record<string, string | number | null>;
    options: {
        brands?: FilterGroupType[];
        volumes?: FilterGroupType[];
        years?: FilterGroupType[];
        flavors?: FilterGroupType[];
        countries?: FilterGroupType[];
    };
}