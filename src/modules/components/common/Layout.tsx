import { Outlet } from 'react-router';
import { Footer, Header } from '~/components/layout';
import '~styles/app.scss';

export const Layout = () => {
    return (
        <div className='container-wrapper'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};