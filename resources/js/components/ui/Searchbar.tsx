import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import styles from '~styles/components/ui/searchbar.module.scss';

interface Props {
    placeholder?: string;
    initialValue?: string;
}

export const Searchbar = ({ placeholder, initialValue = "" }: Props) => {
    const [query, setQuery] = useState(initialValue);

    useEffect(() => {
        // 1. Set a timer to wait 300ms after the user stops typing
        const delayDebounceFn = setTimeout(() => {

            // 2. Only trigger search if the query actually changed 
            // (prevents unnecessary reloads on first mount)
            if (query !== initialValue) {
                router.get(window.location.pathname,
                    { search: query },
                    {
                        preserveState: true, // IMPORTANT: Keeps the input focused
                        replace: true,       // IMPORTANT: Prevents clogging browser history
                        only: ['collectors', 'filters'], // Only update these props
                    }
                );
            }
        }, 300);

        // 3. Cleanup the timer if the user types another letter before 300ms
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className={styles['search-bar-container']}>
            <input
                type="text"
                value={query}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className={styles['search-input']}
                autoComplete="off"
            />
            {/* Optional: Add a small spinner icon here that shows when router is processing */}
        </div>
    );
};