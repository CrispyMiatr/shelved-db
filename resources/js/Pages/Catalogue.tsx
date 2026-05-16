import { Layout, BrandCard, Carousel, SkeletonCard } from '~/components';
import catalog from '~styles/pages/catalogue.module.scss';
import { BrandType } from '~/types';

interface CatalogueProps {
    brands: BrandType[];
    popularBrands: BrandType[];
}

const Catalogue = ({ brands, popularBrands }: CatalogueProps) => {

    const MIN_CAROUSEL_ITEMS = 10;

    return (
        <div className='catalogue-container'>
            <h2>Catalogue</h2>

            <div className={catalog['brands']}>
                <div className={catalog['brands__carousel']}>
                    <Carousel title="Popular Brands">
                        {popularBrands.map((brand: any) => (
                            <BrandCard
                                key={brand.id}
                                brand={brand.name}
                                count={brand.beverages_count}
                                img={brand.logo_path || 'https://placehold.co/200x200'}
                                href={`/catalogue/${brand.slug}`}
                            />
                        ))}
                        {popularBrands.length < MIN_CAROUSEL_ITEMS && (
                            <SkeletonCard
                                type="brand"
                                variant="empty"
                                count={MIN_CAROUSEL_ITEMS - popularBrands.length}
                            />
                        )}
                    </Carousel>
                </div>
            </div>

            <div className={catalog['index']}>
                <div className={catalog['index__header']}>
                    <div className={catalog['index__header__title']}>
                        <h3>All brands</h3>
                    </div>

                    <div className={catalog['index__header__filter']}>

                    </div>
                </div>

                <div className={catalog['index__group']}>
                    {brands.map(brand => (
                        <div key={brand.id} className={catalog['index__group__item']}>
                            {/* Use the .slug we created in the model! */}
                            <a href={`/catalogue/${brand.slug}`}>
                                {brand.name} [{brand.beverages_count}]
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Catalogue.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Catalogue;