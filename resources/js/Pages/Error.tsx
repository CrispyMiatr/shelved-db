import { Head, Link } from '@inertiajs/react';
import { Layout } from '~/components';
import { TriangleAlert, Home, Search, Lock, Beer } from 'lucide-react';
import error from '~styles/pages/error.module.scss';

interface Props {
    status: number;
}

const Error = ({ status }: Props) => {
    const content = {
        503: {
            title: '503: Service Unavailable',
            description: 'The shelf is being restocked! We are currently down for maintenance. Please check back shortly.',
            icon: <TriangleAlert size={48} strokeWidth={3} />,
        },
        500: {
            title: '500: Server Error',
            description: 'Whoops, something went wrong on our end. We probably spilled a drink. We are looking into it!',
            icon: <TriangleAlert size={48} />,
        },
        404: {
            title: '404: Page Not Found',
            description: "Sorry, we couldn't find the beverage (or page) you were looking for. It might have been removed.",
            icon: <Search size={48} strokeWidth={2.5} />,
        },
        403: {
            title: '403: Forbidden',
            description: "You don't have permission to access this shelf. This area is for staff or mutual followers only.",
            icon: <Lock size={48} />,
        },
    }[status] || {
        title: `Error ${status}`,
        description: 'An unexpected error occurred on the shelf. Please try again.',
        icon: <TriangleAlert size={48} />,
    };

    return (
        <div className={error['error-container']}>
            <Head title={content.title} />

            <div className={error['content']}>
                <div className={error['icon-wrap']}>
                    {content.icon}
                </div>

                <h1 className={error['status-code']}>{status}</h1>
                <h2 className={error['title']}>{content.title}</h2>
                <p className={error['description']}>{content.description}</p>

                <div className={error['actions']}>
                    <Link href="/" className={error['home-btn']}>
                        Back to Home
                    </Link>
                    <Link href="/catalogue" className={error['browse-btn']}>
                        Browse Catalogue
                    </Link>
                </div>
            </div>
        </div>
    );
}

Error.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Error;