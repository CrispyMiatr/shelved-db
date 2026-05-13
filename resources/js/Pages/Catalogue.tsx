import { Layout, BrandCard } from '~/components';
import catalog from '~styles/pages/catalogue.module.scss';
import icon from "~styles/components/icons.module.scss";
import chevron from "~assets/icons/chevron-left.svg";
import { BrandType } from '~/types';

const Catalogue = ({ brands }: { brands: BrandType[] }) => {
    return (
        <div className='catalogue-container'>
            <h2>Catalogue</h2>

            <div className={catalog['brands']}>
                <div className={catalog['brands__title']}>
                    <h3>Popular Brands</h3>
                </div>
                <div className={catalog['brands__carousel']}>
                    <img src={chevron} alt="left" className={icon['chevron']} />

                    <div className={catalog['brands__carousel__items']}>
                        <BrandCard brand={'Brand Name'} count={9812} img={'https://placehold.co/200x200'} />
                    </div>

                    <img src={chevron} alt="right" className={`${icon['chevron']} ${icon['chevron--right']}`} />
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