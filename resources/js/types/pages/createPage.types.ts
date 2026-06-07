import { ImageSetType } from "../imageSet.types";

export interface CreatePageType {
    brands: { id: number, name: string, company_id: number }[];
    companies: { id: number, name: string }[];
    manufacturers: { id: number, name: string, logo_url: ImageSetType }[];
    countries: { code: string, name: string }[];
    languages: { code: string, name: string }[];
}