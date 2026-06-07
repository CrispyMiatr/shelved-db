import { Head } from '@inertiajs/react';
import { Factory, Globe, ExternalLink } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import { ManufacturerPageType } from '~/types';
import styles from '~styles/pages/manufacturers.module.scss';

const Index = ({ manufacturers }: ManufacturerPageType) => {
    const seoTitle = "Beverage Packaging Manufacturers | Shelved.";
    const seoDescription = "A database of global beverage manufacturers, bottling companies, and canning facilities. See which companies produce your favorite drinks.";

    return (
        <div className={styles['manufacturer-container']}>
            <Head>
                <title>{seoTitle}</title>
                <meta head-key="description" name="description" content={seoDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary" />
            </Head>

            <div className={styles['title']}>
                <h2>Can Manufacturers</h2>
            </div>

            <div className={styles['list']}>
                {manufacturers.map((manu) => (

                    <div
                        key={manu.id}
                        id={`manu-${manu.id}`}
                        className={styles['row']}
                    >
                        <div className={styles['row__logo']}>
                            {manu.logo_url ? (
                                <img src={manu.logo_url.card} alt={manu.name} />
                            ) : (
                                <Factory size={24} />
                            )}
                        </div>

                        <div className={styles['row__info']}>
                            <div className={styles['row__name-group']}>
                                <h3 className={styles['row__name']}>{manu.name}</h3>
                                {manu.abbreviation && (
                                    <span className={styles['row__abbrev']}>
                                        ({manu.abbreviation})
                                    </span>
                                )}
                            </div>
                            <span className={styles['row__count']}>
                                {manu.beverages_count} {manu.beverages_count === 1 ? 'beverage' : 'beverages'} in database
                            </span>
                        </div>

                        <div className={styles['row__actions']}>
                            {manu.website_url ? (
                                <a href={manu.website_url} target="_blank" rel="noreferrer" className={styles['web-link']}>
                                    <Globe size={16} className={styles['web-link__icon-globe']} />
                                    <span className={styles['web-link__label']}>Website</span>
                                    <ExternalLink size={14} className={styles['web-link__icon-ext']} />
                                </a>
                            ) : (
                                <span className={styles['no-web']}>No website available</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {manufacturers.length === 0 && (
                <div className={styles['empty']}>
                    <p>No manufacturers found.</p>
                </div>
            )}
        </div>
    );
};

Index.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Index;