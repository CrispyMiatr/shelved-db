import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Layout } from '~/components/common/Layout';
import { Searchbar } from '~/components';
import { CollectorPageType, UserType } from '~/types';
import styles from '~styles/pages/collectors.module.scss';

const Collectors = ({ collectors, filters }: CollectorPageType) => {
    // local state to store growing list of collectors
    const [list, setList] = useState(collectors.data);

    // update list when search results change || new data fetched
    useEffect(() => {
        if (collectors.current_page === 1) {
            setList(collectors.data);
        } else {
            setList((prev) => [...prev, ...collectors.data]);
        }
    }, [collectors.data, collectors.current_page]);

    const loadMore = () => {
        if (!collectors.next_page_url) return;

        router.get(collectors.next_page_url, {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['collectors'],
        });
    };

    return (
        <div className={styles['collector-container']}>
            <Head>
                <title>Collectors | Shelved. Community</title>
                <meta name="description" content="Meet the global community of beverage collectors on Shelved. Explore unique shelves and find fellow enthusiasts." />
            </Head>

            <div className={styles['title']}>
                <h2>Collectors</h2>
            </div>

            <Searchbar
                variant="default"
                placeholder="Search collectors..."
                initialValue={filters.search}
            />

            <div className={styles['grid']}>
                {list.length > 0 ? (
                    list.map((collector: UserType) => (
                        <Link
                            key={collector.id}
                            href={`/@${collector.username}`}
                            className={styles['grid__card']}
                        >
                            <img
                                src={collector.avatar_url.card}
                                alt={collector.name}
                                className={styles['grid__card__avatar']}
                            />

                            <div className={styles['grid__card__info']}>
                                <div className={styles['grid__card__info__user']}>
                                    <h3>{collector.name}</h3>
                                    <p>@{collector.username}</p>
                                </div>

                                <div className={styles['grid__card__info__stats']}>
                                    <div className={styles['stat']}>
                                        <strong>{collector.collection_count}</strong>
                                        <span>{collector.collection_count === 1 ? 'item' : 'items'}</span>
                                    </div>

                                    <div className={styles['stat']}>
                                        <strong>{collector.followers_count}</strong>
                                        <span>{collector.followers_count === 1 ? 'follower' : 'followers'}</span>
                                    </div>

                                    <div className={styles['stat']}>
                                        <strong>{collector.following_count}</strong>
                                        <span>following</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className={styles['empty']}>No collectors found.</p>
                )}
            </div>

            {collectors.next_page_url && (
                <div className={styles['actions']}>
                    <button onClick={loadMore} className={styles['load-more']}>
                        See More
                    </button>
                </div>
            )}
        </div>
    );
};

Collectors.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Collectors;