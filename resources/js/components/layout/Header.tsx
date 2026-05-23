import { Link, usePage } from '@inertiajs/react';
import { NavButton, Searchbar } from "~/components";
import { PageProps } from '~/types';
import { Plus, Info, Home, LayoutGrid, Users, User } from 'lucide-react';
import logo from "~assets/logo-black.svg"
import header from '~styles/components/layout/header.module.scss'

export const Header = () => {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <>
            <nav className={header['navbar']}>
                <div className={header['navbar__container']}>

                    <div className={header['navbar__container__top']}>
                        <div className={header['mobile-actions']}>
                            <Link href="/about" className={header['icon-link']}>
                                <Info size={24} />
                            </Link>

                            <Searchbar variant="header" />

                            <Link href="/add" className={header['icon-link']}>
                                <Plus size={24} />
                            </Link>
                        </div>
                    </div>

                    <div className={header['navbar__container__bottom']}>
                        <ul className={header['links']}>
                            <li className={header['links__link-item']}>
                                <Link href="/">
                                    <img src={logo} alt="Shelved." className={header['navbar__container__bottom__logo']} />
                                </Link>
                            </li>
                            <li className={header['links__link-item']}><NavButton name="Home" link="/" /></li>
                            <li className={header['links__link-item']}><NavButton name="Catalogue" link="/catalogue" /></li>
                            <li className={header['links__link-item']}><NavButton name="Collectors" link="/collectors" /></li>
                            <li className={header['links__link-item']}><NavButton name="About" link="/about" /></li>
                            <li className={header['links__link-item']}>
                                <NavButton name="Profile" link={user ? `/@${user.username}` : "/login"} />
                            </li>
                            {!user && (
                                <li className={header['links__link-item']}><NavButton name="Sign In" link="/login" /></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className={header['mobile-nav']}>
                <Link href="/" className={header['mobile-nav__link']}>
                    <Home size={24} />
                </Link>
                <Link href="/catalogue" className={header['mobile-nav__link']}>
                    <LayoutGrid size={24} />
                </Link>
                <Link href="/collectors" className={header['mobile-nav__link']}>
                    <Users size={24} />
                </Link>
                <Link href={user ? `/@${user.username}` : "/login"} className={header['mobile-nav__link']}>
                    <User size={24} />
                </Link>
            </nav>
        </>
    );
};