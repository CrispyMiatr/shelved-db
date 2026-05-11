import { ProductCardType } from '~/types/productCard.types';
import styles from '~styles/components/ui/productItem.module.scss'

export const ProductCard = ({ name, brand, volume, country, img }: ProductCardType) => {
    return (
        <div className={styles['product-item']}>
            <img src={img} alt="product" />

            <div className={styles['product-item__info']}>
                <div className={styles['product-item__info__left']}>
                    {brand && <p>{brand}</p>}

                    <p>{name}</p>
                    <p>{volume}</p>
                </div>

                <div className={styles['product-item__info__right']}>
                    <p>{country}</p>
                </div>
            </div>
        </div>
    );
};