import { Link } from "react-router";
import { NavButton } from "~/components";
import logo from "~assets/logo-black.svg"
import '~styles/app.scss'

export const Header = () => {
    return (
        <nav className='navbar'>
            <div className='navbar__container'>
                <Link to="/">
                    <img src={logo} alt="Shelved." className='navbar__container__logo'/>
                </Link>
                <NavButton name="Home" link="/"/>
                <NavButton name="Catalogue" link="/catalogue"/>
                <NavButton name="Brand" link="/catalogue/brand"/>
                <NavButton name="Product" link="/catalogue/brand/product"/>
                <NavButton name="Profile" link="/profile/id"/>
                <NavButton name="Sign In" link="/login"/>
            </div>
        </nav>
    );
};