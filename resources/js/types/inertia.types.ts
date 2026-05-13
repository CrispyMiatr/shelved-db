import { PageProps as InertiaProps } from '@inertiajs/core';
import { Config } from 'ziggy-js';
import { User } from './profile.types';

export interface PageProps<T extends Record<string, unknown> = Record<string, unknown>> extends InertiaProps {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };

    flash: {
        message: string | null;
        success: string | null;
        error: string | null;
    };

    // allows controllers to send any other data 
    // without having to update this file every time.
    [key: string]: any;
}