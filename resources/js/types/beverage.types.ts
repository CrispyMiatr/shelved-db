import { BrandType } from "./brand.types";
import { ImageSetType } from "./imageSet.types";
import { ManufacturerType } from "./manufacturer.types";

export interface BeverageTranslationType {
    id: number;
    language_code: string;
    ingredients: string;
    warning_text?: string | null;
    extra_info?: string | null;
    is_original: boolean;
}

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
    brand: BrandType;
    lineup_flavor?: string;
    country_name: string;
    barcode: string;
    sku?: string | null;
    release_date_formatted?: string;
    nutrition_100ml: Record<string, string> | null;
    nutrition_full: Record<string, string> | null;
    translations: BeverageTranslationType[];
    manufacturers: ManufacturerType[];
}