export interface ProductCardType {
    name: string;
    brand?: string;
    volume: string | number;
    country: string;
    img: string;
    isSmall?: boolean;
    href: string;
}

export interface BrandCardType {
    brand: string;
    count: number;
    img: string;
}

export interface ProfileCardType {
    name: string;
    username: string;
    img: string;
}