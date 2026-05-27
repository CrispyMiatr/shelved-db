import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '~/types';
import logo from "~assets/logo-white.svg"
import footer from '~styles/components/layout/footer.module.scss'

export const Footer = () => {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <footer className={footer['footer']}>
            <div className={footer['footer__container']}>

                {/* Brand Section */}
                <div className={footer['footer__brand']}>
                    <Link href="/">
                        <img src={logo} alt="Shelved." className={footer['footer__brand__logo']} />
                        <div className={footer['footer__brand__text']}>
                            <h3>Shelved.</h3>
                            <p>The Ultimate <br />Beverage <br />Database</p>
                        </div>
                    </Link>
                </div>

                {/* Socials Section */}
                <div className={footer['footer__socials']}>
                    <h4>Social links</h4>
                    <ul className={footer['links']}>
                        <li className={footer['links__link-item']}>
                            <a href="https://www.instagram.com/crispy.drinks" target='_blank' rel="noreferrer">
                                <img src="/assets/icons/icon_instagram-w.svg" alt="" />
                                @crispy.drinks
                            </a>
                        </li>
                        <li className={footer['links__link-item']}>
                            <a href="https://bsky.app/profile/crispydrinks.bsky.social" target='_blank' rel="noreferrer">
                                <img src="/assets/icons/icon_bluesky-w.svg" alt="" />
                                @crispydrinks.bsky.social
                            </a>
                        </li>
                        <li className={footer['links__link-item']}>
                            <a href="mailto:crispy.drinks@shelvedb.com">
                                <img src="/assets/icons/icon_email-w.svg" alt="" />
                                crispy.drinks@shelvedb.com
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Legal Section */}
                <div className={footer['footer__legal']}>
                    <h4>Legal</h4>
                    <ul className={footer['links']}>
                        <li className={footer['links__link-item']}><Link href="#">Terms of service</Link></li>
                        <li className={footer['links__link-item']}><Link href="#">Cookie policy</Link></li>
                        <li className={footer['links__link-item']}><Link href="#">Privacy notice</Link></li>
                    </ul>
                </div>

                {/* Navigation Section - Fixed Links */}
                <div className={footer['footer__pages']}>
                    <h4>Pages</h4>
                    <ul className={footer['links-grid']}>
                        <li className={footer['links__link-item']}><Link href="/">Home</Link></li>
                        <li className={footer['links__link-item']}><Link href="/catalogue">Catalogue</Link></li>
                        <li className={footer['links__link-item']}><Link href="/collectors">Collectors</Link></li>
                        <li className={footer['links__link-item']}><Link href="/manufacturers">Manufacturers</Link></li>
                        <li className={footer['links__link-item']}><Link href="/about">About</Link></li>
                        <li className={footer['links__link-item']}>
                            <Link href={user ? `/@${user.username}` : "/login"}>
                                {user ? 'Profile' : 'Sign In'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <p className={footer['footer__copyright']}>
                © 2026 Shelved.com
            </p>
        </footer>
    );
};