import { useState } from 'react';
import { Breadcrumbs, Layout, ProductCard } from '~/components';
import prod from '~styles/pages/product.module.scss';

const Product = ({ beverage, relatedFromBrand }: any) => {
    // state for language toggle (default English 'EN')
    const [activeLang, setActiveLang] = useState('en');

    // find translation object for active language
    const translation = beverage.translations.find((t: any) => t.language_code === activeLang)
        || beverage.translations[0];

    return (
        <div className={prod['product-container']}>
            <div className={prod['breadcrumbs']}>
                <Breadcrumbs crumbs={[
                    { label: 'Catalogue', href: '/catalogue' },
                    { label: beverage.brand.name, href: `/catalogue/${beverage.brand.slug}` },
                    { label: beverage.name }
                ]} />
            </div>

            <div className={prod['product-wrap']}>
                <div className={prod['product-wrap__left']}>
                    <div className={prod['image-main']}>
                        <img src={beverage.img_url || 'https://placehold.co/400x600'} alt={beverage.name} />
                    </div>
                    {/* TO-DO: Map 6 images from external Library (Spatie Media?) */}
                </div>

                <div className={prod['product-wrap__right']}>
                    <div className={prod['product-header']}>
                        <h1>{beverage.brand.name} {beverage.name}</h1>
                        <p className={prod['lineup']}>{beverage.lineup_flavor}</p>
                    </div>

                    <div className={prod['info-grid']}>
                        <div className={prod['info-item']}>
                            <label>Country:</label>
                            <span>{beverage.country_name} [{beverage.country_code}]</span>
                        </div>
                        <div className={prod['info-item']}>
                            <label>Volume:</label>
                            <span>{beverage.volume} mL</span>
                        </div>
                        <div className={prod['info-item']}>
                            <label>Release Date:</label>
                            <span>{beverage.release_date || 'Unknown'}</span>
                        </div>
                        {beverage.barcode && (
                            <div className={prod['info-item']}>
                                <label>Barcode:</label>
                                <span>{beverage.barcode}</span>
                            </div>
                        )}
                    </div>

                    <div className={prod['manufacturers-section']}>
                        <h4>Producer(s):</h4>
                        <div className={prod['manufacturer-list']}>
                            {beverage.manufacturers.map((m: any) => (
                                <div key={m.id} className={prod['manu-badge']} title={m.name}>
                                    <img src={m.logo_path || '/assets/icons/default-factory.svg'} alt={m.name} />
                                    <span className={prod['hover-name']}>{m.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={prod['content-section']}>
                        <div className={prod['lang-tabs']}>
                            {beverage.translations.map((t: any) => (
                                <button
                                    key={t.language_code}
                                    onClick={() => setActiveLang(t.language_code)}
                                    className={activeLang === t.language_code ? prod['active'] : ''}
                                >
                                    {t.language_code.toUpperCase()} {t.is_original && '(Original)'}
                                </button>
                            ))}
                        </div>

                        <div className={prod['text-block']}>
                            <h4>Ingredients</h4>
                            <p>{translation?.ingredients}</p>
                        </div>

                        {translation?.warning_text && (
                            <div className={prod['text-block-warning']}>
                                <h4>Warning</h4>
                                <p>{translation.warning_text}</p>
                            </div>
                        )}
                    </div>

                    <div className={prod['nutrition-section']}>
                        <h4>Nutrition Facts</h4>
                        <table className={prod['nutrition-table']}>
                            <thead>
                                <tr>
                                    <th>Value</th>
                                    <th>per 100mL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(beverage.nutrition_100ml || {}).map(([key, val]: any) => (
                                    <tr key={key}>
                                        <td className={prod['nutrient-name']}>{key.replace('_', ' ')}</td>
                                        <td>{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

Product.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Product;