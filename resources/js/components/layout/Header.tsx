import { Link, usePage } from '@inertiajs/react';
import { NavButton, Searchbar } from "~/components";
import { PageProps } from '~/types';
import { Plus, Info, Home, LayoutGrid, Users, UserRound, User } from 'lucide-react';
import logo from "~assets/logo_small-w.svg"
import header from '~styles/components/layout/header.module.scss'

export const Header = () => {
    const { auth } = usePage<PageProps>().props;
    const { url } = usePage();
    const user = auth.user;

    const profilePath = user ? `/@${user.username}` : route('login');
    const createPath = user ? route('beverage.create') : route('login');

    const isHomeActive = url === '/';
    const isCatalogueActive = url.startsWith('/catalogue');
    const isCollectorsActive = url.startsWith('/collectors');
    const isAboutActive = url.startsWith('/about');
    const isCreateActive = url.startsWith('/beverages/create') || route().current('beverage.create');
    const isProfileActive = (user && url.startsWith(`/@${user.username}`)) || route().current('login');

    return (
        <>
            <nav className={header['navbar']}>
                <div className={header['navbar__container']}>
                    <div className={header['navbar__container__top']}>
                        <div className={header['mobile-actions']}>
                            <Link href="/about" className={`${header['icon-info']} ${isAboutActive ? header['icon-info--active'] : ''}`}>
                                <Info size={24} />
                            </Link>

                            <Link href="/" className={header['logo-link']}>
                                <img src={logo} alt="Shelved." className={header['logo']} />
                            </Link>

                            <Searchbar variant="header" />

                            <Link href={createPath} className={`${header['icon-plus']} ${isCreateActive ? header['icon-plus--active'] : ''}`}>
                                <Plus size={24} />
                            </Link>

                            <Link href={profilePath} className={`${header['icon-profile']} ${isProfileActive ? header['icon-profile--active'] : ''}`}>
                                {user ? (
                                    <img src={user.avatar_url?.thumb} alt="Profile" className={header['avatar-img']} />
                                ) : (
                                    <UserRound size={24} strokeWidth={2} />
                                )}
                            </Link>
                        </div>
                    </div>

                    <div className={header['navbar__container__bottom']}>
                        <ul className={header['links']}>
                            <li className={header['links__link-item']}>
                                <NavButton name="Home" link="/" isActive={isHomeActive} />
                            </li>
                            <li className={header['links__link-item']}>
                                <NavButton name="Catalogue" link="/catalogue" isActive={isCatalogueActive} />
                            </li>
                            <li className={header['links__link-item']}>
                                <NavButton name="+ Create" link={createPath} isActive={isCreateActive} />
                            </li>
                            <li className={header['links__link-item']}>
                                <NavButton name="Collectors" link="/collectors" isActive={isCollectorsActive} />
                            </li>
                            <li className={header['links__link-item']}>
                                <NavButton name="About" link="/about" isActive={isAboutActive} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className={header['mobile-nav']}>
                <Link href="/" className={`${header['mobile-nav__link']} ${isHomeActive ? header['mobile-nav__link--active'] : ''}`}>
                    <Home size={24} />
                </Link>

                <Link href="/catalogue" className={`${header['mobile-nav__link']} ${isCatalogueActive ? header['mobile-nav__link--active'] : ''}`}>
                    <LayoutGrid size={24} />
                </Link>

                <Link href="/collectors" className={`${header['mobile-nav__link']} ${isCollectorsActive ? header['mobile-nav__link--active'] : ''}`}>
                    <Users size={24} />
                </Link>

                <Link href={profilePath} className={`${header['mobile-nav__link']} ${isProfileActive ? header['mobile-nav__link--active'] : ''}`}>
                    {user ? (
                        <img src={user.avatar_url?.thumb} alt="Profile" className={header['avatar-img-mobile']} />
                    ) : (
                        <User size={24} />
                    )}
                </Link>
            </nav>
        </>
    );
};