import { Link, usePage } from '@inertiajs/react';
import { NavButton } from "~/components";
import { PageProps } from '~/types';
import logo from "~assets/logo-black.svg"
import header from '~styles/components/layout/header.module.scss'

export const Header = () => {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <nav className={header['navbar']}>
            <div className={header['navbar__container']}>
                <div className={header['navbar__container__top']}>

                </div>

                <div className={header['navbar__container__bottom']}>
                    <ul className={header['links']}>
                        <li className={header['links__link-item']}>
                            <Link href="/">
                                <img src={logo} alt="Shelved." className={header['navbar__container__logo']} />
                            </Link>
                        </li>

                        <li className={header['links__link-item']}>
                            <NavButton name="Home" link="/" />
                        </li>

                        <li className={header['links__link-item']}>
                            <NavButton name="Catalogue" link="/catalogue" />
                        </li>

                        <li className={header['links__link-item']}>
                            <NavButton name="Collectors" link="/collectors" />
                        </li>

                        <li className={header['links__link-item']}>
                            <NavButton
                                name="Profile"
                                link={user ? `/@${user.username}` : "/login"}
                            />
                        </li>

                        {!user && (
                            <li className={header['links__link-item']}>
                                <NavButton name="Sign In" link="/login" />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};