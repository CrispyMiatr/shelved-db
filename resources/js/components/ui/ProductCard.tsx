import { Link } from '@inertiajs/react';
import { ProductCardType } from '~/types/uiCards.types';
import styles from '~styles/components/ui/productCard.module.scss';


export const ProductCard = ({ name, brand, volume, country, img, isSmall, href }: ProductCardType) => {
    const cardClasses = `${styles['product-card']} ${isSmall ? styles['small'] : ''}`;

    return (
        <Link href={href} className={cardClasses}>
            <img src={img} alt={name} />

            <div className={styles['product-card__info']}>
                <div className={styles['product-card__info__left']}>
                    {!isSmall && brand && <p className={styles['product-card__info__left_brand-name']}>{brand}</p>}
                    <p className={styles['product-card__info__left_product-name']}>{name}</p>
                    <p className={styles['product-card__info__left_volume']}>{volume} mL</p>
                </div>

                <div className={styles['product-card__info__country-tag']}>
                    <p>{country}</p>
                </div>
            </div>
        </Link>
    );
};