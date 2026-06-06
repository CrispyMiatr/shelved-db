import { CompanyType } from "./company.types";
import { ImageSetType } from "./imageSet.types";

export interface BrandType {
    id: number;
    name: string;
    slug: string;
    logo_url: ImageSetType;
    company?: CompanyType;
    beverages_count?: number;
}