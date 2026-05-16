import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ProductCardType } from '~/types/uiCards.types';
import styles from '~styles/components/ui/productCard.module.scss';

export const ProductCard = ({ name, brand, volume, country, img, isSmall, href }: ProductCardType) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const cardClasses = `${styles['product-card']} ${isSmall ? styles['small'] : ''}`;

    return (
        <Link href={href} className={cardClasses}>
            <div className={styles['product-card__product-img']}>
                {!isLoaded && <div className={styles['product-placeholder']} />}
                <img
                    src={img}
                    alt={name}
                    onLoad={() => setIsLoaded(true)}
                    className={isLoaded ? styles['loaded'] : styles['loading']}
                />
            </div>

            <div className={styles['product-card__info']}>
                <div className={styles['product-card__info__left']}>
                    {!isSmall && brand && <p className={styles['product-card__info__left__brand-name']}>{brand}</p>}
                    <p className={styles['product-card__info__left__product-name']}>{name}</p>
                    <p className={styles['product-card__info__left__volume']}>{volume} mL</p>
                </div>
                <div className={styles['product-card__info__country-tag']}>
                    <p>{country}</p>
                </div>
            </div>
        </Link>
    );
};