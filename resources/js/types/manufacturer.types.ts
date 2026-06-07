import { ImageSetType } from "./imageSet.types";

export interface ManufacturerType {
    id: number;
    name: string;
    abbreviation?: string | null;
    website_url?: string | null;
    logo_url: ImageSetType;
    beverages_count?: number;
}