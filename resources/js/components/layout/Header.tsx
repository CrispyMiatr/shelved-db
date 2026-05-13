import { Link, usePage } from '@inertiajs/react';
import { NavButton } from "~/components";
import { PageProps } from '~/types';
import logo from "~assets/logo-black.svg"
import '~styles/app.scss'

export const Header = () => {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <nav className='navbar'>
            <div className='navbar__container'>
                <Link href="/">
                    <img src={logo} alt="Shelved." className='navbar__container__logo' />
                </Link>

                <NavButton name="Home" link="/" />
                <NavButton name="Catalogue" link="/catalogue" />
                <NavButton name="Collectors" link="/collectors" />

                <NavButton
                    name="Profile"
                    link={user ? `/@${user.username}` : "/login"}
                />

                {!user && (
                    <NavButton name="Sign In" link="/login" />
                )}
            </div>
        </nav>
    );
};