import { BrandType } from "./brand.types";

export interface BeverageType {
    id: number;
    name: string;
    volume: string | number;
    country_code: string;
    slug: string;
    img_url?: string;
    brand?: BrandType;
}