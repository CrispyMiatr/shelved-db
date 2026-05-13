import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Layout, Searchbar } from '~/components';
import styles from '~styles/pages/collectors.module.scss';

const Collectors = ({ collectors, filters }: any) => {
    // 1. Local state to store the growing list of collectors
    const [list, setList] = useState(collectors.data);

    // 2. Update the list when the search results change or new data is fetched
    useEffect(() => {
        if (collectors.current_page === 1) {
            setList(collectors.data); // Replace list with new search results
        } else {
            setList((prev: any) => [...prev, ...collectors.data]); // Append for "See More"
        }
    }, [collectors.data]);

    const loadMore = () => {
        if (!collectors.next_page_url) return;

        router.get(collectors.next_page_url, {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['collectors'], // Only fetch the 'collectors' prop
        });
    };

    return (
        <div className={styles['container']}>
            <Head title="Collectors" />

            <header className={styles['header']}>
                <h1>Collectors</h1>
                {/* 3. Pass the filter to the search bar so it remembers the query */}
                <Searchbar
                    placeholder="Search by name or username..."
                    initialValue={filters.search || ''}
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