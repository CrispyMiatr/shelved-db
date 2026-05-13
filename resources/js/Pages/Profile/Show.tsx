import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Layout, ProductCard } from '~/components';
import { PageProps } from '~/types';
import profile from '~styles/pages/profile.module.scss';

const Profile = ({ user, collection, followers, following, isOwner, isFollowing, canSeeContent }: any) => {

    const { auth } = usePage<PageProps>().props;

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    // Modal State
    const [modalConfig, setModalConfig] = useState<{ show: boolean, type: 'followers' | 'following', data: any[] }>({
        show: false,
        type: 'followers',
        data: []
    });

    const toggleFollow = () => {
        router.post(route('follow.toggle', user.id), {}, {
            preserveScroll: true
        });
    };

    const openModal = (type: 'followers' | 'following') => {
        if (!canSeeContent) return; // Prevent opening if private
        setModalConfig({
            show: true,
            type,
            data: type === 'followers' ? followers : following
        });
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
                        {isOwner ? (
                            <>
                                <Link href={route('profile.edit')}><button>Edit Profile</button></Link>
                                <button onClick={handleLogout} className={profile['logout-btn']}>Log Out</button>
                            </>
                        ) : (
                            // If not logged in, clicking Follow should take them to Login
                            !auth.user ? (
                                <Link href={route('login')}>
                                    <button className={profile['btn-follow']}>Follow</button>
                                </Link>
                            ) : (
                                <button
                                    onClick={toggleFollow}
                                    className={isFollowing ? profile['btn-unfollow'] : profile['btn-follow']}
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            )
                        )}
                    </div>

                    <div className={profile['info-wrap__info__name']}>
                        <p>{user.username}</p>
                        <h3>{user.name}'s Profile</h3>
                    </div>

                    <div className={profile['info-wrap__info__bio']}>
                        <p>{user.bio || 'No bio yet.'}</p>
                    </div>

                    {/* Stats Section with Modal Trigger */}
                    <div className={profile['info-wrap__info__stats']}>
                        <div className={profile['stat-box']}>
                            <strong>{user.collection_count}</strong>
                            <span>Items</span>
                        </div>
                        <div
                            className={`${profile['stat-box']} ${canSeeContent ? profile['clickable'] : ''}`}
                            onClick={() => openModal('followers')}
                        >
                            <strong>{user.followers_count}</strong>
                            <span>Followers</span>
                        </div>
                        <div
                            className={`${profile['stat-box']} ${canSeeContent ? profile['clickable'] : ''}`}
                            onClick={() => openModal('following')}
                        >
                            <strong>{user.following_count}</strong>
                            <span>Following</span>
                        </div>
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

            {!canSeeContent ? (
                <div className={profile['private-notice']}>
                    <p>This profile is private. Follow each other to see their collection.</p>
                </div>
            ) : (
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
                                <ProductCard
                                    key={item.id}
                                    name={item.name}
                                    brand={item.brand.name}
                                    volume={item.volume}
                                    country={item.country_code}
                                    img={item.img_url || 'https://placehold.co/150x200'}
                                    isSmall={false}
                                    href={`/catalogue/${item.brand.slug}/${item.slug}`}
                                />
                            ))
                        ) : (
                            <p>This collection is empty.</p>
                        )}
                    </div>
                </div>
            )}

            {/* modal */}
            {modalConfig.show && (
                <div className={profile['modal-overlay']} onClick={() => setModalConfig({ ...modalConfig, show: false })}>
                    <div className={profile['modal-content']} onClick={e => e.stopPropagation()}>
                        <div className={profile['modal-header']}>
                            <h3>{modalConfig.type === 'followers' ? 'Followers' : 'Following'}</h3>
                            <button onClick={() => setModalConfig({ ...modalConfig, show: false })}>X</button>
                        </div>
                        <div className={profile['user-list']}>
                            {modalConfig.data.length > 0 ? modalConfig.data.map((u: any) => (
                                <Link
                                    key={u.id}
                                    href={`/@${u.username}`}
                                    className={profile['user-item']}
                                    onClick={() => setModalConfig({ ...modalConfig, show: false })}
                                >
                                    <img src={`https://ui-avatars.com/api/?name=${u.username}&size=40`} alt="" />
                                    <div>
                                        <p className={profile['user-item__name']}>{u.name}</p>
                                        <p className={profile['user-item__username']}>@{u.username}</p>
                                    </div>
                                </Link>
                            )) : (
                                <p className={profile['empty-msg']}>No users found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Profile.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Profile;