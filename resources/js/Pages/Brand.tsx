import { Layout, ProductCard } from '~/components';
import { BeverageType, BrandType } from '~/types';
import { Link } from '@inertiajs/react';
import styles from '~styles/pages/brand.module.scss';
import global from '~styles/app.scss'

interface Props {
    brand: BrandType & { beverages: BeverageType[] };
}

const Brand = ({ brand }: Props) => {
    return (
        <div className={styles['brand-container']}>
            <div className={styles['breadcrumbs']}>
                <p>Catalogue • Brand Name</p>
            </div>

            <div className={styles['header']}>
                <div className={styles['header__brand-title']}>
                    <h2>The</h2>
                    <span className={styles['divider-v']}></span>

                    <img
                        src={brand.logo_path || 'https://placehold.co/100x100?text=Brand Logo'}
                        alt={`${brand.name} logo`}
                        className={styles['header__brand-title__image']}
                    />

                    <span className={styles['divider-v']}></span>
                    <h2>Shelf</h2>
                </div>

                <div className={styles['header__filter']}>
                    <p>{brand.beverages_count} Items total</p>
                </div>
            </div>

            <span className={styles['divider-h']}></span>

            <div className={styles['products']}>
                <div className={styles['products__sort']}>
                    <p>Sorted by: Newest</p>
                </div>

                <div className={styles['products__grid']}>
                    {brand.beverages && brand.beverages.length > 0 ? (
                        brand.beverages.map((beverage) => (
                            <ProductCard
                                key={beverage.id}
                                name={beverage.name}
                                volume={beverage.volume}
                                country={beverage.country_code}
                                img={beverage.img_url || 'https://placehold.co/150x200'}
                                isSmall={true}
                                href={`/catalogue/${brand.slug}/${beverage.slug}`}
                            />
                        ))
                    ) : (
                        <div className={styles['products__empty']}>
                            <p>No products found for this brand.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Brand.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Brand;