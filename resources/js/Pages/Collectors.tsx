import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Layout, Searchbar } from '~/components';
import styles from '~styles/pages/collectors.module.scss';

const Collectors = ({ collectors, filters }: any) => {
    // local state to store the growing list of collectors
    const [list, setList] = useState(collectors.data);

    // update list when the search results change or new data is fetched
    useEffect(() => {
        if (collectors.current_page === 1) {
            setList(collectors.data);
        } else {
            setList((prev: any) => [...prev, ...collectors.data]);
        }
    }, [collectors.data]);

    const loadMore = () => {
        if (!collectors.next_page_url) return;

        router.get(collectors.next_page_url, {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['collectors'],
        });
    };

    return (
        <div className={styles['container']}>
            <Head title="Collectors" />

            <header className={styles['header']}>
                <h1>Collectors</h1>
                <Searchbar
                    variant="default"
                    placeholder="Search collectors..."
                    initialValue={filters.search}
                />
            </header>

            <div className={styles['grid']}>
                {list.length > 0 ? (
                    list.map((collector: any) => (
                        <Link
                            key={collector.id}
                            href={`/@${collector.username}`}
                            className={styles['card']}
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${collector.username}&background=random`}
                                alt=""
                            />
                            <div className={styles['card-info']}>
                                <h3>{collector.name}</h3>
                                <p className={styles['username']}>@{collector.username}</p>

                                <div className={styles['stats']}>
                                    <span><strong>{collector.collection_count}</strong> Items</span>
                                    <span><strong>{collector.followers_count}</strong> Followers</span>
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