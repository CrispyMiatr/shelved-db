import { Head, Link } from '@inertiajs/react';
import { Layout } from '~/components/common/Layout';
import { Breadcrumbs, FilterGroup, ProductCard, SortButton } from '~/components';
import { BrandPageType } from '~/types';
import styles from '~styles/pages/brand.module.scss';

const Brand = ({ brand, beverages, filters, options, sort }: BrandPageType) => {
    const { field, direction } = sort;
    const fallBackImg = `https://placehold.co/400x200?text=${brand.name}`

    // SEO
    const companyText = brand.company ? ` by ${brand.company.name}` : '';
    const totalItems = brand.beverages_count ?? beverages.length;
    const seoTitle = `${brand.name} Beverage Database | Shelved.`;
    const seoDescription = `Explore the complete ${brand.name} beverage catalogue${companyText} on Shelved. Browse ${totalItems} unique cans and bottles.`;

    return (
        <div className={styles['brand-container']}>
            <Head>
                <title>{seoTitle}</title>
                <meta head-key="description" name="description" content={seoDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={brand.logo_url.card} />
                <meta property="og:url" content={window.location.href} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={brand.logo_url.card} />
            </Head>

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
                        src={brand.logo_url.original}
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
                                img={beverage.image_urls.front?.card ?? null}
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