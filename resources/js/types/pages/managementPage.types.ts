import { BrandType } from "../brand.types";
import { CompanyType } from "../company.types";
import { ManufacturerType } from "../manufacturer.types";

export interface ManagementPageType {
    brands: BrandType[];
    companies: CompanyType[];
    manufacturers: ManufacturerType[];
    countries: { value: string, label: string }[];
}