import { router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import styles from '~styles/components/ui/filterGroup.module.scss';

interface FilterOption {
    label: string;
    value: string | number;
}

interface Props {
    filters: Record<string, string | number | null>;
    options: {
        brands?: FilterOption[];
        volumes?: FilterOption[];
        years?: FilterOption[];
        flavors?: FilterOption[];
        countries?: FilterOption[];
    };
}

export const FilterGroup = ({ filters, options }: Props) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFilterChange = (key: string, value: string | number | null) => {
        const newFilters = { ...filters };

        if (value === null || value === '') {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }

        // always reset page to 1 when changing filters
        router.get(window.location.pathname, newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
        setOpenDropdown(null);
    };

    const renderDropdown = (key: string, label: string, data?: FilterOption[], pluralLabel?: string) => {
        // only render if there are options available
        if (!data || data.length === 0) return null;

        const currentValue = filters[key];
        const activeOption = data.find(opt => String(opt.value) === String(currentValue));
        const displayAllLabel = pluralLabel ? `All ${pluralLabel}` : `All ${label}s`;

        return (
            <div className={styles['dropdown']}>
                <button
                    type="button"
                    className={`${styles['dropdown-trigger']} ${currentValue ? styles['is-active'] : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                >
                    <span className={styles['label-text']}>
                        {activeOption ? activeOption.label : label}
                    </span>
                    <span className={styles['chevron']}>▾</span>
                </button>

                {openDropdown === key && (
                    <ul className={styles['dropdown-menu']}>
                        <li
                            className={!currentValue ? styles['selected'] : ''}
                            onClick={() => handleFilterChange(key, null)}
                        >
                            {displayAllLabel}
                        </li>
                        {data.map((opt) => (
                            <li
                                key={opt.value}
                                className={String(currentValue) === String(opt.value) ? styles['selected'] : ''}
                                onClick={() => handleFilterChange(key, opt.value)}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div className={styles['filter-group']} ref={containerRef}>
            {renderDropdown('brand', 'Brand', options.brands)}
            {renderDropdown('flavor', 'Flavour', options.flavors)}
            {renderDropdown('volume', 'Volume', options.volumes)}
            {renderDropdown('year', 'Year', options.years)}
            {renderDropdown('country', 'Country', options.countries, 'Countries')}
        </div>
    );
};