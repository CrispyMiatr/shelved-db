import { Link, router } from '@inertiajs/react';
import { Layout } from '~/components';
import profile from '~styles/pages/profile.module.scss';

const Profile = ({ user, collection, isOwner }: any) => {

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };


    return (
        <div className={profile['profile-container']}>
            <h2>Profile</h2>

            <div className={profile['info-wrap']}>
                <div className={profile['info-wrap__avatar']}>
                    {/* Placeholder for PFP */}
                    <img src={`https://ui-avatars.com/api/?name=${user.username}`} alt="avatar" />
                </div>

                <div className={profile['info-wrap__info']}>
                    <div className={profile['info-wrap__info__actions']}>
                        {isOwner && (
                            <>
                                <Link href={route('profile.edit')}>
                                    <button>Edit Profile</button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={profile['logout-btn']}
                                    style={{ color: 'red', marginLeft: '10px' }}
                                >
                                    Log Out
                                </button>
                            </>
                        )}
                    </div>

                    <div className={profile['info-wrap__info__name']}>
                        <p>{user.username}</p>
                        <h3>{user.name}'s Profile</h3>
                    </div>

                    <div className={profile['info-wrap__info__bio']}>
                        <p>{user.bio || 'No bio yet.'}</p>
                    </div>

                    <div className={profile['info-wrap__info__data']}>

                    </div>

                    <div className={profile['info-wrap__info__socials']}>
                        <div className={profile['social-links-list']}>
                            {user.social_links && Object.entries(user.social_links).map(([platform, url]) => {
                                const linkUrl = url as string;

                                // only render if the string is not empty
                                if (!linkUrl || linkUrl.trim() === '') return null;

                                return (
                                    <a
                                        key={platform}
                                        href={linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ marginRight: '10px' }}
                                    >
                                        {/* capitalise the name (facebook -> Facebook) */}
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </a>
                                );
                            })}
                        </div>
                        <button onClick={handleShare}>Share Profile</button>
                    </div>
                </div>
            </div>

            <div className={profile['collection-wrap']}>
                <div className={profile['collection-wrap__header']}>
                    <h3>My Collection</h3>
                    <p>{user.collection_count || 0} collectibles</p>

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
                    {collection && collection.length > 0 ? (
                        collection.map((item: any) => (
                            <div key={item.id} className={profile['item']}>
                                {item.name}
                            </div>
                        ))
                    ) : (
                        <p>This collection is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

Profile.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Profile;