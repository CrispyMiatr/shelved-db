import { UserType } from "../user.types";

export interface CollectorPageType {
    collectors: {
        data: UserType[];
        current_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        last_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}