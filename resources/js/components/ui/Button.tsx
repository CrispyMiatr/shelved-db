import { Link, usePage } from '@inertiajs/react';
import type { ButtonItem } from '~/types/button.types';
import '~styles/app.scss'

export const NavButton = ({ name, link }: ButtonItem) => {
    // Check if the current URL matches the link exactly, or starts with the link
    const { url } = usePage();
    const isActive = url === link || (link !== '/' && url.startsWith(link));

    return (
        <Link
            href={link}
            className={isActive ? 'nav-button button--active' : 'nav-button'}
        >
            <p className='nav-button__title'>{name}</p>
        </Link>
    );
};