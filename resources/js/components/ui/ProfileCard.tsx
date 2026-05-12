import { ProfileCardType } from '~/types/uiCards.types';
import styles from '~styles/components/ui/profileCard.module.scss'

export const ProfileCard = ({ name, username, img }: ProfileCardType) => {
    return (
        <div className={styles['profile-card']}>
            <img src={img} alt="profile picture" />

            <div className={styles['profile-card__info']}>
                <p>{name}</p>
                <p>{username}</p>
            </div>
        </div>
    );
};