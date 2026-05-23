import { CompanyType } from "./company.types";

export interface BrandType {
    id: number;
    name: string;
    slug: string;
    logo_path: string;
    company?: CompanyType;
    beverages_count?: number;
}