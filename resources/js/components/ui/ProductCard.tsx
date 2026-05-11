import { ProductCardType } from '~/types/uiCards';
import styles from '~styles/components/ui/productCard.module.scss'

export const ProductCard = ({ name, brand, volume, country, img }: ProductCardType) => {
    return (
        <div className={styles['product-card']}>
            <img src={img} alt="product" />

            <div className={styles['product-card']}>
                <div className={styles['product-card']}>
                    {brand && <p>{brand}</p>}

                    <p>{name}</p>
                    <p>{volume}</p>
                </div>

                <div className={styles['product-card']}>
                    <p>{country}</p>
                </div>
            </div>
        </div>
    );
};