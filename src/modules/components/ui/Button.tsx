import '~styles/app.scss'
import type {ButtonItem} from '~/shared/services/button.types';
import {NavLink} from "react-router";

export const NavButton = ({name, link}: ButtonItem) => {
    return (
        <NavLink
            to={link}
            className={({isActive}) =>
                isActive ? 'nav-button button--active' : 'nav-button'
            }
        >
            <p className='nav-button__title'>{name}</p>
        </NavLink>
    );
};