import { SkeletonCardType } from '~/types';
import styles from '~styles/components/ui/skeletonCard.module.scss';

export const SkeletonCard = ({ type, count = 1, variant = 'empty' }: SkeletonCardType) => {
    const items = Array.from({ length: count });

    return (
        <>
            {items.map((_, i) => (
                <div key={i} className={`${styles['skeleton']} ${styles[type]} ${styles[variant]}`}>
                    {variant === 'loading' && <div className={styles['shimmer']} />}

                    <div className={styles['image-box']} />
                    <div className={styles['text-line-short']} />
                    <div className={styles['text-line-long']} />
                </div>
            ))}
        </>
    );
};