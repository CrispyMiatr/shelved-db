import { BrandType } from "./brand.types";
import { ImageSetType } from "./imageSet.types";

export interface BeverageType {
    id: number;
    name: string;
    volume: string | number;
    country_code: string;
    slug: string;
    image_urls: {
        front: ImageSetType | null;
        back: ImageSetType | null;
        left: ImageSetType | null;
        right: ImageSetType | null;
        top: ImageSetType | null;
        bottom: ImageSetType | null;
    };
    brand?: BrandType;
    lineup_flavor?: string;
    country_name?: string;
    // barcode?: string;
    // sku?: string;
    // release_date_formatted?: string;
    // nutrition_100ml?: any;
    // nutrition_full?: any;
    // translations?: any[];
    // manufacturers?: any[];
}