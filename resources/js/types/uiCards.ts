export interface ProductCardType {
    name: string;
    brand?: string;
    volume: number;
    country: string;
    img: string;
    isSmall?: boolean;
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