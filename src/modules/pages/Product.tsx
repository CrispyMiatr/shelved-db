import prod from '~styles/pages/product.module.scss';
import icon from "~styles/components/icons.module.scss";
import chevron from "~assets/chevron-left.svg";

// dynamic product information
// breadcrumbs across pages
// carousel for images
// scrollable right, static left
// collapsible for extra product info

export const Product = () => {
    return (
        <div className={prod['product-container']}>
            <div className={prod['breadcrumbs']}>
                <p>Catalogue • Brand Name • Product Name</p>
            </div>

            <div className={prod['product-wrap']}>
                <div className={prod['product-wrap__left']}>
                    <img src={chevron} alt="left" className={icon['chevron']}/>

                    <div className={prod['product-wrap__left__images']}>
                        <div className={prod['product-wrap__left__images__preview']}>
                            <img src="" alt="product image"/>
                        </div>

                        <div className={prod['product-wrap__left__images__selection']}>

                        </div>
                    </div>

                    <img src={chevron} alt="right" className={`${icon['chevron']} ${icon['chevron--right']}`}/>
                </div>

                <div className={prod['product-wrap__right']}>
                    <div className={prod['product-wrap__right__title']}>

                    </div>

                    <div className={prod['product-wrap__right_info']}>
                        <div className={prod['product-wrap__right_info_basic']}>

                        </div>

                        <div className={prod['product-wrap__right_info__ingredients']}>

                        </div>

                        <div className={prod['product-wrap__right_info__warning']}>

                        </div>

                        <div className={prod['product-wrap__right_info__nutrition']}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};