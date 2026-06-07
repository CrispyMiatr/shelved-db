import { ImageSetType } from "./imageSet.types";

export interface SocialLinksType {
    facebook: string;
    instagram: string;
    threads: string;
    twitter: string;
    bluesky: string;
    tiktok: string;
    youtube: string;
    ebay: string;
    [key: string]: string;
}

export interface UserType {
    id: number;
    name: string;
    username: string;
    email: string;
    bio?: string | null;
    avatar_url: ImageSetType;
    is_private: boolean;
    social_links: SocialLinksType | null;
    role: 'user' | 'admin' | 'head_admin';
    followers_count?: number;
    following_count?: number;
    collection_count?: number;
}