import { Breadcrumbs, Layout } from '~/components';
import { Factory, Globe, ExternalLink } from 'lucide-react';
import { Head } from '@inertiajs/react';
import styles from '~styles/pages/manufacturers.module.scss';
import { ImageSetType } from '~/types';

interface Manufacturer {
    id: number;
    name: string;
    abbreviation: string | null;
    website_url: string | null;
    logo_url: ImageSetType | null;
    beverages_count?: number;
}

interface Props {
    manufacturers: Manufacturer[];
}

const Index = ({ manufacturers }: Props) => {
    return (
        <div className={styles['manufacturer-container']}>
            <Head>
                <title>Beverage Packaging Manufacturers | Shelved.</title>
                <meta
                    head-key="description"
                    name="description"
                    content="A database of global beverage manufacturers, bottling companies, and canning facilities. See which companies produce your favorite drinks."
                />
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
                                <img src={manu.logo_url.original} alt={manu.name} />
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