import { BeverageType } from "../beverage.types";
import { UserType } from "../user.types";

export interface ProfilePageType {
    user: UserType;
    collection: BeverageType[];
    followers: UserType[];
    following: UserType[];
    isOwner: boolean;
    isFollowing: boolean;
    canSeeContent: boolean;
    totalInCollection: number;
    filters: Record<string, string | number | null>;
    options: {
        brands: { label: string; value: number }[];
        volumes: { label: string; value: string }[];
        countries: { label: string; value: string }[];
        years: { label: string; value: number }[];
        flavors: { label: string; value: string }[];
    };
    sort: {
        field: string;
        direction: 'asc' | 'desc';
    };
}