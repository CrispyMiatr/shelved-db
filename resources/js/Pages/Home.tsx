import { Layout, ProductCard } from '~/components';
import home from '~styles/pages/home.module.scss'
import icon from '~styles/components/icons.module.scss'
import banner from '~assets/banner.jpg'
import chevron from '~assets/icons/chevron-left.svg'
import { ProfileCard } from '~/components/ui/ProfileCard';

const Home = () => {
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
                <div className={home['released__header']}>
                    <div className={home['released__header__title']}>
                        <h3>Newly Released</h3>
                    </div>

                    <div className={home['released__header__timestamp']}>
                        <img src="" alt="clock icon" />
                        <p>Next refresh in: 16:55:42</p>
                    </div>
                </div>
                <div className={home['released__carousel']}>
                    <img src={chevron} alt="left" className={icon['chevron']} />

                    <div className={home['released__carousel__items']}>
                        <ProductCard
                            name={'Product Name'}
                            brand={'Brand Name'}
                            volume={500}
                            country={'CC'}
                            img={'https://placehold.co/150x200'}
                            isSmall={false}
                        />
                    </div>

                    <img src={chevron} alt="right" className={`${icon['chevron']} ${icon['chevron--right']}`} />
                </div>

            </div>

            <div className={home['added']}>
                <div className={home['added__header']}>
                    <div className={home['added__header__title']}>
                        <h3>Newly Added</h3>
                    </div>

                    <div className={home['added__header__timestamp']}>
                        <img src="" alt="clock icon" />
                        <p>Next refresh in: 56 s</p>
                    </div>
                </div>
                <div className={home['added__carousel']}>
                    <img src={chevron} alt="left" className={icon['chevron']} />

                    <div className={home['added__carousel__items']}>
                        <ProductCard
                            name={'Product Name'}
                            brand={'Brand Name'}
                            volume={500}
                            country={'CC'}
                            img={'https://placehold.co/150x200'}
                            isSmall={false}
                        />
                    </div>

                    <img src={chevron} alt="right" className={`${icon['chevron']} ${icon['chevron--right']}`} />
                </div>
            </div>

            <div className={home['profiles']}>
                <div className={home['profiles__title']}>
                    <h3>Popular Profiles</h3>
                </div>
                <div className={home['profiles__carousel']}>
                    <img src={chevron} alt="left" className={icon['chevron']} />

                    <div className={home['profiles__carousel__items']}>
                        <ProfileCard name={'Name'} username={'user.name'} img={'https://placehold.co/150x150'} />
                    </div>

                    <img src={chevron} alt="right" className={`${icon['chevron']} ${icon['chevron--right']}`} />
                </div>
            </div>
        </div>
    );
};

Home.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Home;