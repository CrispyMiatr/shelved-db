import { BeverageType } from "../beverage.types";
import { BrandType } from "../brand.types";

export interface BrandPageType {
    brand: BrandType;
    beverages: BeverageType[];
    filters: Record<string, string | number | null>;
    options: {
        volumes: { label: string; value: string }[];
        years: { label: string; value: number }[];
        flavors: { label: string; value: string }[];
        countries: { label: string; value: string }[];
    };
    sort: {
        field: string;
        direction: 'asc' | 'desc';
    };
}