import { Breadcrumbs, FilterGroup, Layout, ProductCard, SortButton } from '~/components';
import { BeverageType, BrandType } from '~/types';
import { Link } from '@inertiajs/react';
import styles from '~styles/pages/brand.module.scss';

interface Props {
    brand: BrandType;
    beverages: BeverageType[];
    filters: any;
    options: any;
    sort: {
        field: string;
        direction: 'asc' | 'desc';
    };
}

const Brand = ({ brand, beverages, filters, options, sort }: Props) => {
    const { field, direction } = sort;
    const fallBackImg = `https://placehold.co/400x200?text=${brand.name}`

    return (
        <div className={styles['brand-container']}>
            <div className={styles['breadcrumbs']}>
                <Breadcrumbs crumbs={[
                    { label: 'Catalogue', href: '/catalogue' },
                    { label: brand.name }
                ]} />
            </div>

            <div className={styles['header']}>
                <div className={styles['header__company']}>
                    <p>{brand.company?.name || 'Independent Brand'}</p>
                </div>

                <div className={styles['header__brand-title']}>
                    <h3 className={styles['header__brand-title__left']}>The</h3>
                    <span className={styles['divider-v']}></span>

                    <img
                        src={brand.logo_path}
                        onError={(e) => {
                            if (e.currentTarget.src !== fallBackImg) {
                                e.currentTarget.src = fallBackImg;
                            }
                        }}
                        alt={`${brand.name} logo`}
                        className={styles['header__brand-title__image']}
                    />

                    <span className={styles['divider-v']}></span>
                    <h3 className={styles['header__brand-title__right']}>Shelf</h3>
                </div>

                <div className={styles['header__filter']}>
                    <FilterGroup filters={filters} options={options} />
                    {/* <p className={styles['item-count']}>
                        {beverages.length} {beverages.length === 1 ? 'Item' : 'Items'} found
                    </p> */}
                </div>
            </div>

            <span className={styles['divider-h']}></span>

            <div className={styles['products']}>
                <div className={styles['products__sort']}>
                    <SortButton label="Added" field="created_at" currentSort={field} currentDirection={direction} />
                    <SortButton label="Name" field="name" currentSort={field} currentDirection={direction} />
                    <SortButton label="Country" field="country_code" currentSort={field} currentDirection={direction} />
                    <SortButton label="Year" field="release_date" currentSort={field} currentDirection={direction} />
                    <SortButton label="Volume" field="volume" currentSort={field} currentDirection={direction} />
                </div>

                <div className={styles['products__grid']}>
                    {beverages && beverages.length > 0 ? (
                        beverages.map((beverage) => (
                            <ProductCard
                                key={beverage.id}
                                name={beverage.name}
                                brand={brand.name}
                                volume={beverage.volume}
                                country={beverage.country_code}
                                img={beverage.image_urls.front}
                                isSmall={true}
                                href={`/catalogue/${brand.slug}/${beverage.slug}`}
                            />
                        ))
                    ) : (
                        <div className={styles['products__empty']}>
                            <p>No products match your selected filters.</p>
                            <Link href={window.location.pathname} className={styles['clear-link']}>
                                Clear all filters
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Brand.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Brand;