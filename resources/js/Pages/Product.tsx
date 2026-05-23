import { useState, useRef } from 'react';
import { Breadcrumbs, Layout } from '~/components';
import { ChevronLeft, ChevronRight, AlertTriangle, List, Table } from 'lucide-react';
import prod from '~styles/pages/product.module.scss';

const Product = ({ beverage }: any) => {
    type SectionKey = 'ingredients' | 'warning' | 'nutrition';

    const [activeLang, setActiveLang] = useState('en');
    const [imgIndex, setImgIndex] = useState(0);
    const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
        ingredients: true,
        warning: false,
        nutrition: false
    });

    // Mocking 6 images (replace with beverage.media or similar library call)
    const images = beverage.media?.slice(0, 6) || [beverage.img_url, ...Array(5).fill(beverage.img_url)].filter(Boolean);

    const translation = beverage.translations.find((t: any) => t.language_code === activeLang)
        || beverage.translations[0];

    const toggleSection = (section: SectionKey) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const nextImg = () => setImgIndex((prev) => (prev + 1) % images.length);
    const prevImg = () => setImgIndex((prev) => (prev - 1 + images.length) % images.length);

    // Touch Swipe Logic for Mobile
    const touchStart = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => touchStart.current = e.touches[0].clientX;
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart.current - touchEnd > 50) nextImg();
        if (touchStart.current - touchEnd < -50) prevImg();
    };

    return (
        <div className={prod['product-container']}>
            <div className={prod['breadcrumbs']}>
                <Breadcrumbs crumbs={[
                    { label: 'Catalogue', href: '/catalogue' },
                    { label: beverage.brand.name, href: `/catalogue/${beverage.brand.slug}` },
                    { label: beverage.name }
                ]} />
            </div>

            <div className={prod['product-grid']}>
                {/* LEFT: CAROUSEL */}
                <div className={prod['carousel-column']}>
                    <div
                        className={prod['main-image-container']}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button className={`${prod['nav-btn']} ${prod['prev']}`} onClick={prevImg}><ChevronLeft /></button>
                        <img src={images[imgIndex]} alt={beverage.name} className={prod['main-image']} />
                        <button className={`${prod['nav-btn']} ${prod['next']}`} onClick={nextImg}><ChevronRight /></button>
                    </div>
                    <div className={prod['thumbnail-row']}>
                        {images.map((img: string, idx: number) => (
                            <div
                                key={idx}
                                className={`${prod['thumb']} ${imgIndex === idx ? prod['active'] : ''}`}
                                onClick={() => setImgIndex(idx)}
                            >
                                <img src={img} alt={`view ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: INFO */}
                <div className={prod['info-column']}>
                    <header className={prod['sticky-header']}>
                        <div className={prod['brand-label']}>{beverage.brand.name}</div>
                        <h1 className={prod['product-name']}>{beverage.name}</h1>
                    </header>

                    <section className={prod['basic-info']}>
                        <InfoRow label="Company" value={beverage.brand.company_name || 'N/A'} />
                        <InfoRow label="Brand" value={beverage.brand.name} />
                        <InfoRow label="Name" value={beverage.name} />
                        <InfoRow label="Country" value={`${beverage.country_name} [${beverage.country_code}]`} />
                        <InfoRow label="Line-up / Flavour" value={beverage.lineup_flavor} />
                        <InfoRow label="SKU" value={beverage.sku || 'N/A'} />
                        <InfoRow label="Date" value={beverage.release_date || 'Unknown'} />
                        <InfoRow label="Volume" value={`${beverage.volume} mL`} />
                        <InfoRow label="Barcode" value={beverage.barcode} />
                        <InfoRow label="Website" value={beverage.brand.website} isLink />

                        <div className={prod['producers-row']}>
                            <label>Producer(s)</label>
                            <div className={prod['manu-list']}>
                                {beverage.manufacturers.map((manu: any) => (
                                    <div key={manu.id} className={prod['manu-badge']} title={manu.name}>
                                        {/* <img src={manu.logo_path || '/assets/icons/default-factory.svg'} alt={manu.name} /> */}
                                        <img src={manu.logo_path || '/assets/icons/default-factory.svg'} />
                                    </div>
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

                        <Collapsible
                            title="Warning"
                            isOpen={openSections.warning}
                            onClick={() => toggleSection('warning')}
                            icon={<AlertTriangle size={18} />}
                            disabled={!translation?.warning_text}
                        >
                            <p className={prod['warning-text']}>{translation?.warning_text || 'No ingredients listed.'}</p>
                        </Collapsible>

                        <Collapsible
                            title="Nutrition Table"
                            isOpen={openSections.nutrition}
                            onClick={() => toggleSection('nutrition')}
                            icon={<Table size={18} />}
                        >
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
                                            <td>{key.replace(/_/g, ' ')}</td>
                                            <td>{val}</td>
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
                    <span className={prod['lang-label']}>Available Languages:</span>
                    <div className={prod['lang-buttons']}>
                        {beverage.translations.map((t: any) => (
                            <button
                                key={t.language_code}
                                onClick={() => setActiveLang(t.language_code)}
                                className={activeLang === t.language_code ? prod['active'] : ''}
                            >
                                {t.language_code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const InfoRow = ({ label, value, isLink }: any) => {
    if (!value) return null;
    return (
        <div className={prod['info-row']}>
            <label>{label}</label>
            {isLink ? <a href={value} target="_blank" rel="noreferrer">{value.replace('https://', '')}</a> : <span>{value}</span>}
        </div>
    );
};

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

Product.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Product;