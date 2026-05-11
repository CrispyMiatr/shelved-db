import { Layout } from '~/components';
import profile from '~styles/pages/profile.module.scss';

const Profile = () => {
    return (
        <div className={profile['profile-container']}>
            <h2>Profile</h2>

            <div className={profile['info-wrap']}>
                <div className={profile['info-wrap__avatar']}>
                    <img src="" alt="avatar" />
                </div>

                <div className={profile['info-wrap__info']}>
                    <div className={profile['info-wrap__info__name']}>
                        
                    </div>

                    <div className={profile['info-wrap__info__bio']}>

                    </div>

                    <div className={profile['info-wrap__info__data']}>

                    </div>

                    <div className={profile['info-wrap__info__socials']}>

                    </div>
                </div>
            </div>

            <div className={profile['collection-wrap']}>
                <div className={profile['collection-wrap__header']}>
                    <h3>My Collection</h3>

                    <div className={profile['collection-wrap__header__buttons']}>

                    </div>

                    <div className={profile['collection-wrap__header__filter']}>
                        <p>filter dropdowns</p>
                    </div>
                </div>

                <span className={profile['divider-h']}></span>

                <div className={profile['collection-wrap__products']}>
                    <div className={profile['collection-wrap__products__sort']}>
                        <p>sort buttons</p>
                    </div>

                    <p>products</p>
                </div>
            </div>
        </div>
    );
};

Profile.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Profile;