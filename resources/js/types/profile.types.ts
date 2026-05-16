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
    email: string;
    username: string;
    bio: string | null;
    is_private: boolean;
    social_links: SocialLinks | null;
}