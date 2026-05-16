import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { BrandCardType } from '~/types/uiCards.types';
import styles from '~styles/components/ui/brandCard.module.scss'

export const BrandCard = ({ brand, count, img, href }: BrandCardType) => {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={href} className={styles['brand-card']}>
            <div className={styles['brand-card__brand-img']}>
                {!isLoaded && <div className={styles['brand-placeholder']} />}
                <img
                    src={img}
                    alt={`${brand} logo`}
                    onLoad={() => setIsLoaded(true)}
                    style={{ opacity: isLoaded ? 1 : 0 }}
                />
            </div>

            <div className={styles['brand-card__info']}>
                <p className={styles['brand-card__info__name']}>{brand}</p>
                <p className={styles['brand-card__info__count']}>{count}</p>
            </div>
        </Link>
    );
};