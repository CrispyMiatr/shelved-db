import { useState, useRef } from 'react';
import { Breadcrumbs, Layout } from '~/components';
import { ChevronLeft, ChevronRight, AlertTriangle, List, Table, Info } from 'lucide-react';
import prod from '~styles/pages/product.module.scss';
import { Head, Link } from '@inertiajs/react';
import { BeverageType, ImageSetType } from '~/types';

const Collapsible = ({ title, isOpen, onClick, children, icon, disabled }: any) => {
    if (disabled) return null;
    return (
        <div className={`${prod['accordion']} ${isOpen ? prod['open'] : ''}`}>
            <button onClick={onClick} className={prod['accordion-trigger']}>
                <span className={prod['accordion-title']}>{icon} {title}</span>
                <ChevronRight className={prod['chevron']} />
            </button>
            <div className={prod['accordion-content']}>
                <div className={prod['inner']}>{children}</div>
            </div>
        </div>
    );
};

const Product = ({ beverage }: any) => {
    type SectionKey = 'ingredients' | 'warning' | 'nutrition' | 'extra_info';

    const [activeLang, setActiveLang] = useState('en');
    const [imgIndex, setImgIndex] = useState(0);
    const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
        ingredients: true,
        warning: false,
        nutrition: false,
        extra_info: false
    });

    // image logic
    const imageOrder: (keyof BeverageType['image_urls'])[] = ['front', 'right', 'back', 'left', 'top', 'bottom'];
    const loadImages = imageOrder
        .map((slot) => beverage.image_urls[slot])
        .filter((img): img is ImageSetType => img !== null);
    const placeholder: ImageSetType = {
        original: '/assets/images/placeholder_product.png',
        card: '/assets/images/placeholder_product.png',
        thumb: '/assets/images/placeholder_product.png'
    };
    const imagesToRender = loadImages.length > 0 ? loadImages : [placeholder];

    const nextImg = () => setImgIndex((prev) => (prev + 1) % imagesToRender.length);
    const prevImg = () => setImgIndex((prev) => (prev - 1 + imagesToRender.length) % imagesToRender.length);

    const translation = beverage.translations.find((trans: any) => trans.language_code === activeLang)
        || beverage.translations[0];

    const toggleSection = (section: SectionKey) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const InfoRow = ({ label, value, isLink }: any) => {
        if (!value) return null;
        return (
            <div className={prod['info-row']}>
                <label>{label}</label>
                {isLink ? <a href={value} target="_blank" rel="noreferrer">{value.replace('https://', '')}</a> : <p>{value}</p>}
            </div>
        );
    };

    // touch swipe logic for mobile
    const touchStart = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => touchStart.current = e.touches[0].clientX;
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart.current - touchEnd > 50) nextImg();
        if (touchStart.current - touchEnd < -50) prevImg();
    };

    // meta description
    const seoDescription = `View details for ${beverage.brand.name} ${beverage.name} (${beverage.volume}mL) from ${beverage.country_name}. ${translation?.ingredients?.substring(0, 100)}...`;

    return (
        <div className={prod['product-container']}>
            <Head>
                <title>{`${beverage.brand.name} ${beverage.name} | Shelved.`}</title>
                <meta name="description" content={seoDescription} />

                <meta property="og:title" content={`${beverage.brand.name} ${beverage.name} | Shelved.`} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={beverage.image_urls.front?.card || ''} />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${beverage.brand.name} ${beverage.name}`} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={beverage.image_urls.front?.card || ''} />
            </Head>

            <div className={prod['breadcrumbs']}>
                <Breadcrumbs crumbs={[
                    { label: 'Catalogue', href: '/catalogue' },
                    { label: beverage.brand.name, href: `/catalogue/${beverage.brand.slug}` },
                    { label: beverage.name }
                ]} />
            </div>

            <div className={prod['product-grid']}>
                <div className={prod['carousel-column']}>
                    <div
                        className={prod['main-image-container']}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button className={`${prod['nav-btn']} ${prod['prev']}`} onClick={prevImg}><ChevronLeft strokeWidth={3} /></button>
                        <img
                            src={imagesToRender[imgIndex].original}
                            alt={beverage.name}
                            className={prod['main-image']}
                        />
                        <button className={`${prod['nav-btn']} ${prod['next']}`} onClick={nextImg}><ChevronRight strokeWidth={3} /></button>
                    </div>
                    <div className={prod['thumbnail-row']}>
                        {imagesToRender.map((img, idx) => (
                            <div
                                key={idx}
                                className={`${prod['thumb']} ${imgIndex === idx ? prod['active'] : ''}`}
                                onClick={() => setImgIndex(idx)}
                            >
                                <img src={img.card} alt={`view ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={prod['info-column']}>
                    <header className={prod['sticky-header']}>
                        <div className={prod['brand-label']}>{beverage.brand.name}</div>
                        <h1 className={prod['product-name']}>{beverage.name}</h1>
                    </header>

                    <section className={prod['basic-info']}>
                        <InfoRow label="Company" value={beverage.brand.company?.name || 'N/A'} />
                        <InfoRow label="Brand" value={beverage.brand.name} />
                        <InfoRow label="Name" value={beverage.name} />
                        <InfoRow label="Country" value={`${beverage.country_name} [${beverage.country_code}]`} />
                        <InfoRow label="Line-up / Flavour" value={beverage.lineup_flavor} />
                        <InfoRow label="SKU" value={beverage.sku || 'N/A'} />
                        <InfoRow label="Date" value={beverage.release_date_formatted || 'Unknown'} />
                        <InfoRow label="Volume" value={`${beverage.volume} mL`} />
                        <InfoRow label="Barcode" value={beverage.barcode} />
                        <InfoRow label="Website" value={beverage.brand.website} isLink />

                        <div className={prod['manufacturers-row']}>
                            <label>Manufacturer(s)</label>
                            <div className={prod['manu-list']}>
                                {beverage.manufacturers.map((manu: any) => (
                                    <Link
                                        key={manu.id}
                                        href={`/manufacturers#manu-${manu.id}`}
                                        className={prod['manu-badge']}
                                        title={manu.name}
                                    >
                                        <img src={manu.logo_url.card || `<CircleQuestionMark />`} alt={manu.name} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className={prod['collapsibles']}>
                        <Collapsible
                            title="Ingredients"
                            isOpen={openSections.ingredients}
                            onClick={() => toggleSection('ingredients')}
                            icon={<List size={18} />}
                        >
                            <p>{translation?.ingredients || 'No ingredients listed.'}</p>
                        </Collapsible>

                        {translation?.warning_text && (
                            <Collapsible
                                title="Warning"
                                isOpen={openSections.warning}
                                onClick={() => toggleSection('warning')}
                                icon={<AlertTriangle size={18} />}
                            >
                                <p className={prod['warning-text']}>{translation.warning_text}</p>
                            </Collapsible>
                        )}

                        {translation?.extra_info && (
                            <Collapsible
                                title="Extra Information"
                                isOpen={openSections.extra_info}
                                onClick={() => toggleSection('extra_info')}
                                icon={<Info size={18} />}
                            >
                                <p>{translation.extra_info}</p>
                            </Collapsible>
                        )}

                        <Collapsible
                            title="Nutrition Table"
                            isOpen={openSections.nutrition}
                            onClick={() => toggleSection('nutrition')}
                            icon={<Table size={18} />}
                        >
                            <table className={prod['nutrition-table']}>
                                <thead>
                                    <tr>
                                        <th>VALUE</th>
                                        <th className={prod['text-right']}>PER 100 mL</th>
                                        <th className={prod['text-right']}>PER {beverage.volume || 'FULL'} mL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(beverage.nutrition_100ml || {}).map((key) => (
                                        <tr key={key}>
                                            <td className={prod['nutrition-label']}>
                                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                                            </td>
                                            <td className={prod['text-right']}>
                                                {beverage.nutrition_100ml[key]}
                                            </td>
                                            <td className={prod['text-right']}>
                                                {beverage.nutrition_full?.[key] ?? '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Collapsible>
                    </div>
                </div>
            </div>
            {beverage.translations.length > 1 && (
                <div className={prod['language-selector']}>
                    <div className={prod['lang-buttons']}>
                        {beverage.translations.map((trans: any) => (
                            <button
                                key={trans.language_code}
                                onClick={() => setActiveLang(trans.language_code)}
                                className={activeLang === trans.language_code ? prod['active'] : ''}
                            >
                                {trans.language_code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

Product.layout = (page: React.ReactNode) => <Layout children={page} hideFooter={true} />;

export default Product;