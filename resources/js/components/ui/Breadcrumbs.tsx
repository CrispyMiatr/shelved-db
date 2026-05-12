import { Link } from '@inertiajs/react';
import { BreadcrumbType } from '~/types';
import styles from '~styles/components/ui/breadcrumbs.module.scss';

export const Breadcrumbs = ({ crumbs }: { crumbs: BreadcrumbType[] }) => {
    return (
        <nav className={styles['breadcrumbs']}>
            {crumbs.map((crumb, index) => (
                <span key={index}>
                    {crumb.href ? (
                        <Link href={crumb.href}>{crumb.label}</Link>
                    ) : (
                        <span className={styles['breadcrumbs__current']}>{crumb.label}</span>
                    )}

                    {index < crumbs.length - 1 && (
                        <span className={styles['breadcrumbs__separator']}> • </span>
                    )}
                </span>
            ))}
        </nav>
    );
};