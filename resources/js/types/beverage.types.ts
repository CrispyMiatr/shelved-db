import { BrandType } from "./brand.types";

interface BeverageImages {
    front: string | null;
    back: string | null;
    left: string | null;
    right: string | null;
    top: string | null;
    bottom: string | null;
}

export interface BeverageType {
    id: number;
    name: string;
    volume: string | number;
    country_code: string;
    slug: string;
    image_urls: BeverageImages;
    brand?: BrandType;
    lineup_flavor?: string;
    country_name?: string;
}