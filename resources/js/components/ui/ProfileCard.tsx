import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { ProfileCardType } from '~/types/uiCards.types';
import styles from '~styles/components/ui/profileCard.module.scss'

export const ProfileCard = ({ name, username, img, href }: ProfileCardType) => {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Link href={href} className={styles['profile-card']}>
            <div className={styles['profile-card__avatar-img']}>
                {!isLoaded && <div className={styles['avatar-placeholder']} />}
                <img
                    src={img}
                    alt={name}
                    onLoad={() => setIsLoaded(true)}
                    style={{ opacity: isLoaded ? 1 : 0 }}
                />
            </div>

            <div className={styles['profile-card__info']}>
                <p className={styles['profile-card__info__name']}>{name}</p>
                <p className={styles['profile-card__info__username']}>@{username}</p>
            </div>
        </Link>
    );
};