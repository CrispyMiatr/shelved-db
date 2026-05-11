import { PropsWithChildren } from 'react';
import { Footer, Header } from '~/components';

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='container-wrapper'>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}