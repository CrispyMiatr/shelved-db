import { PageProps as InertiaProps } from '@inertiajs/core';
import { Config } from 'ziggy-js';
import { UserType } from './user.types';

export interface PageProps<T extends Record<string, unknown> = Record<string, unknown>> extends InertiaProps {
    auth: {
        user: UserType;
    };
    ziggy: Config & { location: string };

    flash: {
        message: string | null;
        success: string | null;
        error: string | null;
    };

    // allows controllers to send any other data 
    // without having to update this file every time
    [key: string]: any;
}