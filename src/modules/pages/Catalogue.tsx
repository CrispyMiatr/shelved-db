import '~styles/pages/catalogue.scss';
import home from "~styles/pages/home.module.scss";
import chevron from "~assets/chevron-left.svg";
import icon from "~styles/components/icons.module.scss";

export const Catalogue = () => {
    return (
        <div className='catalogue-container'>
            <h2>Catalogue</h2>

            <div className={home['brands']}>
                <div className={home['brands__title']}>
                    <h3>Popular Profiles</h3>
                </div>
                <div className={home['brands__carousel']}>
                    <img src={chevron} alt="left" className={icon['chevron']}/>

                    <div className={home['brands__carousel__items']}>
                        Temp.
                    </div>

                    <img src={chevron} alt="right" className={`${icon['chevron']} ${icon['chevron--right']}`}/>
                </div>
            </div>

            <div className={home['index']}>
                <div className={home['index__header']}>
                    <div className={home['index__header__title']}>
                        <h3>All brands</h3>
                    </div>

                    <div className={home['index__header__filter']}>

                    </div>
                </div>

                <div className={home['index__group']}>
                    <div className={home['index__group__item']}>
                        <div className={home['index__group__item__title']}>
                            3D Energy Drink
                        </div>

                        <div className={home['index__group__item__count']}>
                            [53]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};