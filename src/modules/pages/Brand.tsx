import brand from '~styles/pages/brand.module.scss';
import CocaCola from '~assets/logo_coca-cola.png';

export const Brand = () => {
    return (
        <div className={brand['brand-container']}>
            <div className={brand['breadcrumbs']}>
                <p>Catalogue • Brand Name</p>
            </div>

            <div className={brand['header']}>
                <div className={brand['header__brand-title']}>
                    <h2>The</h2>
                    <span className={brand['divider-v']}></span>
                    <img src={CocaCola} alt="brand logo" className={brand['header__brand-title__image']} />
                    <span className={brand['divider-v']}></span>
                    <h2>Shelf</h2>
                </div>

                <div className={brand['header__filter']}>
                    <p>filter dropdowns</p>
                </div>
            </div>

            <span className={brand['divider-h']}></span>

            <div className={brand['products']}>
                <div className={brand['products__sort']}>
                    <p>sort buttons</p>
                </div>

                <p>products</p>
            </div>
        </div>
    );
};