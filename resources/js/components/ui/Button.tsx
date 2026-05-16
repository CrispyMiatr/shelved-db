import { Link, usePage } from '@inertiajs/react';
import type { ButtonItem } from '~/types/button.types';
import '~styles/app.scss'

export const NavButton = ({ name, link }: ButtonItem) => {
    const { url } = usePage();
    const isActive = url === link || (link !== '/' && url.startsWith(link));

    return (
        <Link
            href={link}
            className={`nav-button ${isActive ? 'button--active' : ''}`}
        >
            <p className='nav-button__title'>{name}</p>
        </Link>
    );
};