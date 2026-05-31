export interface SocialLinks {
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

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    bio?: string | null;
    avatar_url: string;
    is_private: boolean;
    social_links: SocialLinks | null;
    role: 'user' | 'admin' | 'head_admin';
    followers_count?: number;
    following_count?: number;
    collection_count?: number;
}