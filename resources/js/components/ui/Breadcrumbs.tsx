import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { BreadcrumbType } from '~/types';
import styles from '~styles/components/ui/breadcrumbs.module.scss';

export const Breadcrumbs = ({ crumbs }: { crumbs: BreadcrumbType[] }) => {
    return (
        <nav className={styles['breadcrumbs']}>
            {crumbs.map((crumb, index) => (
                <Fragment key={index}>
                    {crumb.href ? (
                        <Link href={crumb.href} className={styles['breadcrumbs__link']}>
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className={styles['breadcrumbs__current']}>{crumb.label}</span>
                    )}

                    {index < crumbs.length - 1 && (
                        <span className={styles['breadcrumbs__separator']}> • </span>
                    )}
                </Fragment>
            ))}
        </nav>
    );
};