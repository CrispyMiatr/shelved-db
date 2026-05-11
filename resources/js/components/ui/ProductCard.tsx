import { ProductCardType } from '~/types/uiCards';
import styles from '~styles/components/ui/productCard.module.scss'

export const ProductCard = ({ name, brand, volume, country, img, isSmall }: ProductCardType) => {
    // always 'product-item', add 'small' if isSmall is true
    const cardClasses = `${styles['product-card']} ${isSmall ? styles['small'] : ''}`;

    return (
        <div className={cardClasses}>
            <img src={img} alt={name} />

            <div className={styles['product-card']}>
                <div className={styles['product-card']}>
                    {!isSmall && brand && <p>{brand}</p>}

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