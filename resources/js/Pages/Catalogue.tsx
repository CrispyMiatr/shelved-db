import { Layout } from '~/components';
import catalog from '~styles/pages/catalogue.module.scss';
import icon from "~styles/components/icons.module.scss";
import chevron from "~assets/icons/chevron-left.svg";

const Catalogue = () => {
    return (
        <div className='catalogue-container'>
            <h2>Catalogue</h2>

            <div className={catalog['brands']}>
                <div className={catalog['brands__title']}>
                    <h3>Popular Profiles</h3>
                </div>
                <div className={catalog['brands__carousel']}>
                    <img src={chevron} alt="left" className={icon['chevron']} />

                    <div className={catalog['brands__carousel__items']}>
                        Temp.
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
                    <div className={catalog['index__group__item']}>
                        <div className={catalog['index__group__item__title']}>
                            3D Energy Drink
                        </div>

                        <div className={catalog['index__group__item__count']}>
                            [53]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Catalogue.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Catalogue;