import { router } from '@inertiajs/react';
import { SortButtonType } from '~/types';
import styles from '~styles/components/ui/sortButton.module.scss';

export const SortButton = ({ label, field, currentSort, currentDirection }: SortButtonType) => {
    const isActive = currentSort === field;

    const handleSort = () => {
        let nextDirection: string | null = 'asc';

        if (isActive) {
            if (currentDirection === 'asc') nextDirection = 'desc';
            else if (currentDirection === 'desc') nextDirection = null; // clear sort
        }

        const query: any = {
            ...route().params,
            sort: nextDirection ? field : null,
            direction: nextDirection,
            page: 1
        };

        // clean up nulls
        if (!nextDirection) {
            delete query.sort;
            delete query.direction;
        }

        router.get(window.location.pathname, query, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <button
            className={`${styles['sort-btn']} ${isActive ? styles['active'] : ''}`}
            onClick={handleSort}
        >
            {label}
            <span className={styles['icon']}>
                {!isActive && '↕'}
                {isActive && currentDirection === 'asc' && '↑'}
                {isActive && currentDirection === 'desc' && '↓'}
            </span>
        </button>
    );
};