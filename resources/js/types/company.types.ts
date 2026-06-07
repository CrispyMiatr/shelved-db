import { ImageSetType } from "./imageSet.types";

export interface CompanyType {
    id: number;
    name: string;
    logo_url: ImageSetType;
    country_code?: string;
    website_url?: string | null;
}