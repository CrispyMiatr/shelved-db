import { Link, usePage } from '@inertiajs/react';
import { NavButton } from '~/components';
import { PageProps } from '~/types';
import logo from "~assets/logo-white.svg"
import footer from '~styles/components/layout/footer.module.scss'

export const Footer = () => {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <footer className={footer['footer']}>
            <div className={footer['footer__container']}>
                <div className={footer['footer__container__brand']}>
                    <Link href="/">
                        <img src={logo} alt="Shelved." className={footer['footer__container__brand__logo']} />
                        <div className={footer['footer__container__brand__text']}>
                            <h3>Shelved.</h3>
                            <p>The Ultimate Beverage Database</p>
                        </div>
                    </Link>
                </div>

                <div className={footer['footer__container__socials']}>
                    <h4>Social links</h4>
                    <ul className={footer['links']}>
                        <li className={footer['links__link-item']}>
                            <a
                                href="https://www.instagram.com/crispy.drinks"
                                target='_blank'
                                rel="noopener noreferrer">

                                <img src="/assets/icons/icon_instagram-inv.svg" alt="instagram" />
                                <p>@crispy.drinks</p>
                            </a>
                        </li>
                        <li className={footer['links__link-item']}>
                            <a
                                href="https://bsky.app/profile/crispydrinks.bsky.social"
                                target='_blank'
                                rel="noopener noreferrer">

                                <img src="/assets/icons/icon_bluesky-inv.svg" alt="bluesky" />
                                <p>@crispydrinks.bsky.social</p>
                            </a>
                        </li>
                        <li className={footer['links__link-item']}>
                            <a
                                href="mailto:crispy.drinks@shelvedb.com"
                                target='_blank'
                                rel="noopener noreferrer">

                                <img src="/assets/icons/icon_email.svg" alt="email" />
                                <p>crispy.drinks@shelvedb.com</p>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={footer['footer__container__legal']}>
                    <h4>Legal</h4>
                    <ul className={footer['links']}>
                        <li className={footer['links__link-item']}><a href="">Terms of service</a></li>
                        <li className={footer['links__link-item']}><a href="">Cookie policy</a></li>
                        <li className={footer['links__link-item']}><a href="">Privacy notice</a></li>
                    </ul>
                </div>

                <div className={footer['footer__container__pages']}>
                    <h4>Legal</h4>
                    <ul className={footer['links']}>
                        <li className={footer['links__link-item']}><NavButton name="Home" link="/" /></li>
                        <li className={footer['links__link-item']}><NavButton name="Catalogue" link="/catalogue" /></li>
                        <li className={footer['links__link-item']}><NavButton name="Collectors" link="/collectors" /></li>
                        <li className={footer['links__link-item']}><NavButton
                            name="Profile"
                            link={user ? `/@${user.username}` : "/login"}
                        /></li>
                        {!user && (
                            <li className={footer['links__link-item']}><NavButton name="Sign In" link="/login" /></li>
                        )}
                    </ul>
                </div>
            </div>
        </footer>
    );
};