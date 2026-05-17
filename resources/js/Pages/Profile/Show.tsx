import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FilterGroup, Layout, ProductCard, SortButton } from '~/components';
import { PageProps } from '~/types';
import profile from '~styles/pages/profile.module.scss';

const Profile = ({ user, collection, followers, following, isOwner, isFollowing, canSeeContent, totalInCollection, filters, options, sort }: any) => {

    const { auth } = usePage<PageProps>().props;
    const { field, direction } = sort;

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    // modal state
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
        // prevent opening if private
        if (!canSeeContent) return;
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

                                // only render if URL string exists & not empty
                                if (!linkUrl || linkUrl.trim() === '') return null;

                                return (
                                    <a
                                        key={platform}
                                        href={linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={profile['social-icon-link']}
                                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    >
                                        <img
                                            src={`/assets/icons/icon_${platform}.svg`}
                                            alt={platform}
                                            className={profile['social-icon']}
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                        <button onClick={handleShare} className={profile['share-btn']}>Share Profile</button>
                    </div>
                </div>
            </div>

            {!canSeeContent ? (
                <div className={profile['private-notice']}>
                    <p>This profile is private.</p>
                </div>
            ) : (
                <div className={profile['collection-wrap']}>
                    <div className={profile['collection-wrap__header']}>
                        <h3>My Collection</h3>
                        <p>{totalInCollection} items total</p>

                        {totalInCollection > 0 && (
                            <div className={profile['collection-wrap__header__filter']}>
                                <FilterGroup filters={filters} options={options} />
                            </div>
                        )}
                    </div>

                    <div className={profile['collection-wrap__products__sort']}>
                        <SortButton label="Name" field="name" currentSort={field} currentDirection={direction} />
                        <SortButton label="Country" field="country_code" currentSort={field} currentDirection={direction} />
                        <SortButton label="Year" field="release_date" currentSort={field} currentDirection={direction} />
                        <SortButton label="Volume" field="volume" currentSort={field} currentDirection={direction} />
                        <SortButton label="Flavour" field="lineup_flavor" currentSort={field} currentDirection={direction} />
                        <SortButton label="Brand" field="brand_id" currentSort={field} currentDirection={direction} />
                        <SortButton label="Newest" field="created_at" currentSort={field} currentDirection={direction} />
                    </div>


                    <span className={profile['divider-h']}></span>

                    <div className={profile['collection-wrap__products']}>
                        {collection.length > 0 ? (
                            <div className={profile['products__grid']}>
                                {collection.map((item: any) => (
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
                                ))}
                            </div>
                        ) : (
                            /* no items visible */
                            <div className={profile['empty-state']}>
                                {totalInCollection > 0 ? (
                                    /* user has items, but filters hid them */
                                    <div className={profile['no-matches']}>
                                        <p>No items match your selected filters.</p>
                                        <Link
                                            href={route('profile.show', user.username)}
                                            className={profile['clear-link']}
                                        >
                                            Clear all filters
                                        </Link>
                                    </div>
                                ) : (
                                    /* user has zero items in database */
                                    <div className={profile['completely-empty']}>
                                        <p>This shelf is currently empty.</p>
                                        {isOwner ? (
                                            <Link href="/catalogue" className={profile['browse-btn']}>
                                                Browse Catalogue to add your first beverage or upload a new beverage to the database.
                                            </Link>
                                        ) : (
                                            <p>This collector hasn't added anything yet.</p>
                                        )}
                                    </div>
                                )}
                            </div>
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