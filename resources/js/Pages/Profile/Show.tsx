import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Pencil, Share2, X } from 'lucide-react';
import { useState } from 'react';
import { FilterGroup, Layout, ProductCard, SortButton } from '~/components';
import { PageProps } from '~/types';
import show from '~styles/pages/profile/show.module.scss';

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
        <div className={show['profile-container']}>
            <div className={show['title']}>
                <h2>Profile</h2>
            </div>

            {isOwner ? (
                <div className={show['action-bar']}>
                    <button onClick={handleLogout} className={show['logout-btn']}>
                        <LogOut size={20} />
                    </button>
                    <p className={show['action-bar__username']}>@{user.username}</p>

                    <div className={show['action-bar__right']}>
                        <button onClick={handleShare} className={show['share-btn']}>
                            <Share2 size={20} />
                        </button>
                        <Link href={route('profile.edit')}>
                            <Pencil size={20} />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={show['action-bar']}>
                    <p className={show['action-bar__username']}>@{user.username}</p>
                    <button onClick={handleShare} className={show['share-btn']}>
                        <Share2 size={20} />
                    </button>
                </div>
            )}

            <div className={show['info']}>

                <div className={show['info__avatar']}>
                    <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="avatar" />
                </div>

                <div className={show['info__details']}>
                    <div className={show['info__details__header']}>
                        <div className={show['info__details__header__names']}>
                            <p className={show['username']}>@{user.username}</p>
                            <h4 className={show['display-name']}>{user.name}</h4>
                        </div>
                    </div>

                    <div className={show['info__details__stats']}>
                        <div className={show['stat-box']}>
                            <span className={show['stat-value']}>{user.collection_count || 0} </span>
                            <span className={show['stat-label']}>items</span>
                        </div>
                        <div
                            className={`${show['stat-box']} ${canSeeContent ? show['clickable'] : ''}`}
                            onClick={() => openModal('followers')}
                        >
                            <span className={show['stat-value']}>{user.followers_count} </span>
                            <span className={show['stat-label']}>followers</span>
                        </div>
                        <div
                            className={`${show['stat-box']} ${canSeeContent ? show['clickable'] : ''}`}
                            onClick={() => openModal('following')}
                        >
                            <span className={show['stat-value']}>{user.following_count} </span>
                            <span className={show['stat-label']}>following</span>
                        </div>
                    </div>
                </div>

                {user.bio && (
                    <div className={show['info__bio']}>
                        <p>{user.bio}</p>
                    </div>
                )}

                {user.social_links && Object.values(user.social_links).some(link => link && String(link).trim() !== '') && (
                    <div className={show['info__socials']}>
                        <div className={show['social-links']}>
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
                                        className={show['social-icon-link']}
                                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    >
                                        <img
                                            src={`/assets/icons/icon_${platform}.svg`}
                                            alt={platform}
                                            className={show['social-icon']}
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                        <button onClick={handleShare} className={show['share-btn']}>Share Profile</button>
                    </div>
                )}

                <div className={show['info__actions']}>
                    {isOwner ? (
                        <div className={show['profile-actions']}>
                            <Link href={route('profile.edit')}><button>Edit Profile</button></Link>
                            <button onClick={handleLogout} className={show['logout-btn']}>Log Out</button>
                        </div>
                    ) : (
                        !auth.user ? (
                            <Link href={route('login')}>
                                <button className={show['btn-follow']}>Follow</button>
                            </Link>
                        ) : (
                            <button
                                onClick={toggleFollow}
                                className={isFollowing ? show['btn-unfollow'] : show['btn-follow']}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )
                    )}
                </div>
            </div>

            {!canSeeContent ? (
                <div className={show['private-notice']}>
                    <p>This profile is private.</p>
                </div>
            ) : (
                <div className={show['collection']}>
                    <div className={show['collection__header']}>
                        <h4>{user.name}'s' Collection</h4>

                        {totalInCollection < 0 && (
                            <p>{totalInCollection} items total</p>
                        )}

                        {totalInCollection > 0 && (
                            <div className={show['collection__header__filter']}>
                                <FilterGroup filters={filters} options={options} />
                            </div>
                        )}
                    </div>


                    <div className={show['collection__products']}>
                        {totalInCollection > 0 && (
                            <div className={show['collection__products__sort']}>
                                <SortButton label="Name" field="name" currentSort={field} currentDirection={direction} />
                                <SortButton label="Country" field="country_code" currentSort={field} currentDirection={direction} />
                                <SortButton label="Year" field="release_date" currentSort={field} currentDirection={direction} />
                                <SortButton label="Volume" field="volume" currentSort={field} currentDirection={direction} />
                                <SortButton label="Flavour" field="lineup_flavor" currentSort={field} currentDirection={direction} />
                                <SortButton label="Brand" field="brand_id" currentSort={field} currentDirection={direction} />
                                <SortButton label="Newest" field="created_at" currentSort={field} currentDirection={direction} />
                            </div>
                        )}

                        <span className={show['divider-h']}></span>

                        <div className={show['collection__products__grid']}>
                            {collection.length > 0 ? (
                                <div className={show['collection__products__grid__items']}>
                                    {collection.map((item: any) => (
                                        <ProductCard
                                            key={item.id}
                                            name={item.name}
                                            brand={item.brand.name}
                                            volume={item.volume}
                                            country={item.country_code}
                                            img={item.img_url || 'https://placehold.co/150x200'}
                                            isSmall={true}
                                            href={`/catalogue/${item.brand.slug}/${item.slug}`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                /* no items visible */
                                <div className={show['empty-state']}>
                                    {totalInCollection > 0 ? (
                                        /* user has items, but filters hid them */
                                        <div className={show['empty-state__no-matches']}>
                                            <p>No items match your selected filters.</p>
                                            <Link
                                                href={route('profile.show', user.username)}
                                                className={show['empty-state__clear-link']}
                                            >
                                                Clear all filters
                                            </Link>
                                        </div>
                                    ) : (
                                        /* user has zero items in database */
                                        <div className={show['empty-state__empty']}>
                                            <p>This shelf is currently empty.</p>
                                            {isOwner ? (
                                                <Link href="/catalogue" className={show['empty-state__empty__browse-btn']}>
                                                    Browse <strong>Catalogue </strong>to add your first beverage or upload a new beverage to the database.
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
                </div>
            )}

            {modalConfig.show && (
                <div className={show['modal']} onClick={() => setModalConfig({ ...modalConfig, show: false })}>
                    <div className={show['modal__content']} onClick={e => e.stopPropagation()}>
                        <div className={show['modal__content__header']}>
                            <h3>{modalConfig.type === 'followers' ? 'Followers' : 'Following'}</h3>
                            <button onClick={() => setModalConfig({ ...modalConfig, show: false })} className={show['close-btn']}>
                                <X size={20} strokeWidth={5} />
                            </button>
                        </div>
                        <div className={show['modal__content__list']}>
                            {modalConfig.data.length > 0 ? modalConfig.data.map((user: any) => (
                                <Link
                                    key={user.id}
                                    href={`/@${user.username}`}
                                    className={show['user-item']}
                                    onClick={() => setModalConfig({ ...modalConfig, show: false })}
                                >
                                    <img src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="" />
                                    <div className={show['user-item__name']}>
                                        <p className={show['user-item__name__display-name']}>{user.name}</p>
                                        <p className={show['user-item__name__username']}>@{user.username}</p>
                                    </div>
                                </Link>
                            )) : (
                                <p className={show['empty-msg']}>No users found.</p>
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