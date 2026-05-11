import { BrandCardType } from '~/types/uiCards';
import styles from '~styles/components/ui/brandCard.module.scss'

export const BrandCard = ({ brand, count, img }: BrandCardType) => {
    return (
        <div className={styles['brand-card']}>
            <img src={img} alt="product" />

            <div className={styles['brand-card__info']}>
                <p>{brand}</p>

                <p>{count}</p>
            </div>
        </div>
    );
};