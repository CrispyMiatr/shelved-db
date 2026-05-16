import { Carousel, Layout, ProductCard, ProfileCard, SkeletonCard } from '~/components';
import home from '~styles/pages/home.module.scss'
import banner from '~assets/banner.jpg'

const Home = ({ newlyAdded, newlyReleased, popularProfiles }: any) => {

    const MIN_CAROUSEL_ITEMS = 10;

    return (
        <div className={home['home-container']}>
            <div className={home['hero']}>
                <div className={home['hero__text']}>
                    <div className={home['hero__text__title']}>
                        Shelved.
                    </div>

                    <div className={home['hero__text__subtitle']}>
                        The Ultimate Beverage Database
                    </div>

                    <div className={home['hero__text__description']}>
                        All beverages worldwide for everyone to see!
                    </div>
                </div>

                <img
                    className={home['hero__banner']}
                    src={banner}
                    alt="a wall of old cans"
                />
            </div>

            <div className={home['released']}>
                <div className={home['released__carousel']}>
                    <Carousel title="Newly Released" headerExtra={<p>Next refresh in: 16:55:42</p>}>
                        {newlyReleased.map((item: any) => (
                            <ProductCard
                                key={item.id}
                                name={item.name}
                                brand={item.brand.name}
                                volume={item.volume}
                                country={item.country_code}
                                img={item.img_url || 'https://placehold.co/150x200'}
                                href={`/catalogue/${item.brand.slug}/${item.slug}`}
                            />
                        ))}
                        {newlyReleased.length < MIN_CAROUSEL_ITEMS && (
                            <SkeletonCard
                                type="product"
                                variant="empty"
                                count={MIN_CAROUSEL_ITEMS - newlyReleased.length}
                            />
                        )}
                    </Carousel>
                </div>

            </div>

            <div className={home['added']}>
                <div className={home['added__carousel']}>
                    <Carousel title="Newly Added" headerExtra={<p>Next refresh in: 56s</p>}>
                        {newlyAdded.map((item: any) => (
                            <ProductCard
                                key={item.id}
                                name={item.name}
                                brand={item.brand.name}
                                volume={item.volume}
                                country={item.country_code}
                                img={item.img_url || 'https://placehold.co/150x200'}
                                href={`/catalogue/${item.brand.slug}/${item.slug}`}
                            />
                        ))}
                        {newlyAdded.length < MIN_CAROUSEL_ITEMS && (
                            <SkeletonCard
                                type="product"
                                variant="empty"
                                count={MIN_CAROUSEL_ITEMS - newlyAdded.length}
                            />
                        )}
                    </Carousel>
                </div>
            </div>

            <div className={home['profiles']}>
                <div className={home['profiles__carousel']}>
                    <Carousel title="Popular Profiles">
                        {popularProfiles.map((user: any) => (
                            <ProfileCard
                                key={user.id}
                                name={user.name}
                                username={user.username}
                                img={`https://ui-avatars.com/api/?name=${user.username}`}
                                href={`/@${user.username}`}
                            />
                        ))}
                        {popularProfiles.length < MIN_CAROUSEL_ITEMS && (
                            <SkeletonCard
                                type="profile"
                                variant="empty"
                                count={MIN_CAROUSEL_ITEMS - popularProfiles.length}
                            />
                        )}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

Home.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Home;