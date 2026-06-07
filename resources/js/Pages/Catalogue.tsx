import React, { useMemo } from 'react';
import { Layout, BrandCard, Carousel, SkeletonCard } from '~/components';
import catalog from '~styles/pages/catalogue.module.scss';
import { BrandType } from '~/types';
import { Head } from '@inertiajs/react';

interface CatalogueProps {
    brands: BrandType[];
    popularBrands: BrandType[];
}

const Catalogue = ({ brands, popularBrands }: CatalogueProps) => {
    const MIN_CAROUSEL_ITEMS = 10;
    const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // grouping
    const groupedBrands = useMemo(() => {
        const groups: Record<string, BrandType[]> = {};

        // initialize groups
        ALPHABET.forEach(char => groups[char] = []);

        brands.forEach(brand => {
            const firstChar = brand.name.charAt(0).toUpperCase();
            if (/[A-Z]/.test(firstChar)) {
                groups[firstChar].push(brand);
            } else {
                groups["#"].push(brand);
            }
        });

        return groups;
    }, [brands]);

    return (
        <div className={catalog['catalogue-container']}>
            <Head>
                <title>Beverage Catalogue | All Brands | Shelved.</title>
                <meta
                    head-key="description"
                    name="description"
                    content={`Browse our complete index of ${brands.length} beverage brands. From major corporations to local craft producers, find every drink on the shelf.`}
                />
            </Head>

            <div className={catalog['title']}>
                <h2>Catalogue</h2>
            </div>

            <section className={catalog['brands']} id='brands'>
                <div className={catalog['brands__carousel']}>
                    <Carousel title="Popular Brands">
                        {popularBrands.map((brand: any) => (
                            <BrandCard
                                key={brand.id}
                                brand={brand.name}
                                count={brand.beverages_count}
                                img={brand.logo_url.card}
                                href={`/catalogue/${brand.slug}`}
                            />
                        ))}
                        {popularBrands.length < MIN_CAROUSEL_ITEMS && (
                            <SkeletonCard
                                type="brand"
                                variant="empty"
                                count={MIN_CAROUSEL_ITEMS - popularBrands.length}
                            />
                        )}
                    </Carousel>
                </div>
            </section>

            <section className={catalog['index']} id='index'>
                <div className={catalog['index__header']}>
                    <h3>All brands</h3>
                </div>

                <div className={catalog['index__alphabet']}>
                    {ALPHABET.map((letter) => (
                        <section key={letter} className={catalog['index__section']}>
                            <h4 className={catalog['index__letter-title']}>{letter}</h4>

                            <div className={catalog['index__group']}>
                                {groupedBrands[letter].length > 0 ? (
                                    groupedBrands[letter].map(brand => (
                                        <div key={brand.id} className={catalog['index__group__item']}>
                                            <a href={`/catalogue/${brand.slug}`}>
                                                <div className={catalog['index__group__item__name']}>
                                                    {brand.name}
                                                </div>
                                                <div className={catalog['index__group__item__count']}>
                                                    [{brand.beverages_count}]
                                                </div>
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className={catalog['index__empty']}>No brands here yet</p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        </div>
    );
};

Catalogue.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Catalogue;