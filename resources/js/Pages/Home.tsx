import { Carousel, Layout, ProductCard, ProfileCard, SkeletonCard } from '~/components';
import home from '~styles/pages/home.module.scss'
import banner from '~assets/banner.jpg'
import logo from "~assets/logo_full-b.svg"

const Home = ({ newlyAdded, newlyReleased, popularProfiles }: any) => {
    const MIN_CAROUSEL_ITEMS = 20;

    return (
        <div className={home['home-container']}>
            <section className={home['hero']} id='hero'>
                <div className={home['hero__text']}>
                    <div className={home['hero__text__title']}>
                        <img src={logo} alt="Shelved." className={home['logo']} />
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
            </section>

            <section className={home['released']} id='released'>
                <div className={home['released__carousel']}>
                    <Carousel title="Newly Released">
                        {newlyReleased.map((item: any) => (
                            <ProductCard
                                key={item.id}
                                name={item.name}
                                brand={item.brand.name}
                                volume={item.volume}
                                country={item.country_code}
                                img={item.image_urls.front}
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

            </section>

            <section className={home['added']} id='added'>
                <div className={home['added__carousel']}>
                    <Carousel title="Newly Added">
                        {newlyAdded.map((item: any) => (
                            <ProductCard
                                key={item.id}
                                name={item.name}
                                brand={item.brand.name}
                                volume={item.volume}
                                country={item.country_code}
                                img={item.image_urls.front}
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
            </section>

            <section className={home['profiles']} id='profiles'>
                <div className={home['profiles__carousel']}>
                    <Carousel title="Popular Profiles">
                        {popularProfiles.map((user: any) => (
                            <ProfileCard
                                key={user.id}
                                name={user.name}
                                username={user.username}
                                img={user.avatar_url}
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
            </section>
        </div>
    );
};

Home.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Home;