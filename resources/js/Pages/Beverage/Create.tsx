import axios from 'axios';
import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Upload, FileText, Plus, Trash2, AlertCircle, Building2, Globe, ImageIcon } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import { CreatePageType } from '~/types';
import styles from '~styles/pages/beverage/create.module.scss';

export default function Create({ brands, companies, manufacturers, countries, languages }: CreatePageType) {
    const [isOcrLoading, setIsOcrLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [previews, setPreviews] = useState<Record<string, string>>({});

    // UI toggles for new brand/company/manufacturer
    const [isNewCompany, setIsNewCompany] = useState(false);
    const [isNewBrand, setIsNewBrand] = useState(false);
    const [isNewManufacturer, setIsNewManufacturer] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
        new_company_name: '',
        brand_id: '',
        new_brand_name: '',

        name: '',
        country_code: '',
        lineup_flavor: '',
        sku: '',
        release_date: '',
        volume: '',
        barcode: '',
        manufacturer_ids: [] as number[],
        new_manufacturer_name: '',

        img_front: null as File | null,
        img_back: null as File | null,
        img_left: null as File | null,
        img_right: null as File | null,
        img_top: null as File | null,
        img_bottom: null as File | null,

        translations: [{
            language_code: 'en',
            ingredients: '',
            warning_text: '',
            extra_info: '',
            is_original: false,
            can_delete: false
        }],

        nutrition_items: [
            { name: 'Energy', per_100ml: '', per_full_volume: '' },
            { name: 'Fat', per_100ml: '', per_full_volume: '' },
            { name: 'Sugars', per_100ml: '', per_full_volume: '' },
            { name: 'Protein', per_100ml: '', per_full_volume: '' },
            { name: 'Salt', per_100ml: '', per_full_volume: '' },
        ] as { name: string, per_100ml: string, per_full_volume: string, can_delete: boolean }[],

        add_to_collection: false,
    });

    const handleOcr = async () => {
        if (!data.img_front) return alert("Upload at least the front image first!");

        setIsOcrLoading(true);
        const formData = new FormData();

        ['front', 'back', 'left', 'right'].forEach(slot => {
            const file = (data as any)[`img_${slot}`];
            if (file) formData.append('images[]', file);
        });

        try {
            const response = await axios.post('/api/beverage/ocr', formData);
            const ai = response.data;

            setIsNewBrand(true);
            setIsNewCompany(true);

            setData(prev => ({
                ...prev,
                name: ai.name || prev.name,
                volume: ai.volume_ml || prev.volume,
                barcode: ai.barcode || prev.barcode,
                new_brand_name: ai.brand_name || '',
                new_company_name: ai.company_name || '',
                translations: ai.translations ? ai.translations.map((trans: any) => ({
                    language_code: trans.lang.toLowerCase(),
                    ingredients: trans.ingredients || '',
                    warning_text: trans.warning_text || '',
                    extra_info: trans.extra_info || '',
                    is_original: trans.lang.toLowerCase() !== 'en', // English translations marked non-original
                    can_delete: false
                })) : prev.translations,
                nutrition_items: ai.nutrition_items ? ai.nutrition_items.map((item: any) => ({
                    name: item.name,
                    per_100ml: item.per_100ml,
                    per_full_volume: item.per_total_volume,
                    can_delete: false
                })) : prev.nutrition_items,
            }));

            setShowForm(true);
        } catch (err) {
            alert("Extraction failed. Please fill manually.");
        } finally {
            setIsOcrLoading(false);
        }
    };

    // functions to modify rows dynamically
    const handleNutritionChange = (index: number, field: 'name' | 'per_100ml' | 'per_full_volume', value: string) => {
        const updated = [...data.nutrition_items];
        updated[index][field] = value;
        setData('nutrition_items', updated);
    };

    const addNutritionRow = () => {
        setData('nutrition_items', [
            ...data.nutrition_items,
            { name: '', per_100ml: '', per_full_volume: '', can_delete: true }
        ]);
    };

    const addTranslation = () => {
        setData('translations', [
            ...data.translations,
            {
                language_code: '',
                ingredients: '',
                warning_text: '',
                extra_info: '',
                is_original: false,
                can_delete: true
            }
        ]);
    };

    const removeNutritionRow = (index: number) => {
        setData('nutrition_items', data.nutrition_items.filter((_, i) => i !== index));
    };

    // filter brands based on selected company
    const filteredBrands = brands.filter(b => !data.company_id || b.company_id === Number(data.company_id));

    const primarySlots = ['front', 'back', 'left', 'right'];
    const secondarySlots = ['top', 'bottom'];
    const imageSlots = [...primarySlots, ...secondarySlots];
    const uploadedPrimaryCount = primarySlots.filter(slot => data[`img_${slot}` as keyof typeof data]).length;
    const hasMinimumImages = data.img_front !== null && uploadedPrimaryCount >= 3;
    const canExtract = hasMinimumImages;

    const handleImageChange = (slot: string, file: File | null) => {
        setData(`img_${slot}` as any, file);
        if (file) {
            setPreviews(prev => ({ ...prev, [slot]: URL.createObjectURL(file) }));
        } else {
            setPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[slot];
                return newPreviews;
            });
        }
    };

    const toggleManufacturer = (id: number) => {
        const current = [...data.manufacturer_ids];
        const index = current.indexOf(id);
        if (index > -1) {
            setData('manufacturer_ids', current.filter(i => i !== id));
        } else {
            setData('manufacturer_ids', [...current, id]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasMinimumImages) {
            alert("Please upload the FRONT image and at least two other sides (Back, Left, or Right).");
            return;
        }

        post(route('beverage.store'));
    };

    return (
        <div className={styles['container']}>
            <Head>
                <title>Add Beverage | Shelved. Database</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className={styles['title']}>
                <h2>Add New Beverage</h2>
                <p>Upload photos of all sides.</p>
            </div>

            <form onSubmit={submit} className={styles['main-form']}>

                <section className={styles['upload-section']}>
                    {(!hasMinimumImages && (errors.img_front || errors.img_back || errors.img_left || errors.img_right)) && (
                        <div className={styles['error-banner']}>
                            <AlertCircle size={16} />
                            <span>You must upload the Front and at least 2 other primary sides (Back, Left, or Right).</span>
                        </div>
                    )}

                    <div className={styles['image-grid']}>
                        {imageSlots.map(slot => (
                            <div key={slot} className={styles['slot-card']}>
                                <label className={styles['slot-label']}>
                                    {slot.toUpperCase()} {slot === 'front' ? '*' : ''}
                                </label>
                                <div
                                    className={`${styles['upload-box']} ${errors[`img_${slot}` as keyof typeof errors] ? styles['has-error'] : ''}`}
                                    style={previews[slot] ? { backgroundImage: `url(${previews[slot]})` } : {}}
                                >
                                    {!previews[slot] && <Upload size={32} />}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => handleImageChange(slot, e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showForm && (
                        <div className={styles['step-actions']}>
                            <button
                                type="button"
                                onClick={handleOcr}
                                className={styles['ocr-btn']}
                                disabled={isOcrLoading || !canExtract}
                            >
                                {isOcrLoading ? (
                                    <span className={styles['loader-container']}>
                                        <div className={styles['spinner']} />
                                        <span>Extracting...</span>
                                    </span>
                                ) : (
                                    'Extract Info'
                                )}
                            </button>
                            <p className={styles['hint-text']}>
                                {!canExtract && "Upload Front + at least 2 other info-containing sides to extract info."}
                            </p>
                        </div>
                    )}
                </section>

                {showForm && (
                    <div className={`${styles['form-details']} ${isOcrLoading ? styles['fade'] : ''}`}>

                        <div className={styles['section-title']}>
                            <Building2 size={20} /> <h4>Brand & Company</h4>
                        </div>

                        <div className={styles['field-grid']}>
                            <div className={styles['field']}>
                                <label>Company *</label>
                                {!isNewCompany ? (
                                    <div className={styles['input-group']}>
                                        <select value={data.company_id} onChange={e => setData('company_id', e.target.value)}>
                                            <option value="">Select Company</option>
                                            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                        <button type="button" onClick={() => { setIsNewCompany(true); setData('company_id', '') }} className={styles['add-inline']}><Plus size={14} /> New</button>
                                    </div>
                                ) : (
                                    <div className={styles['input-group']}>
                                        <input placeholder="New Company Name" value={data.new_company_name} onChange={e => setData('new_company_name', e.target.value)} />
                                        <button type="button" onClick={() => setIsNewCompany(false)} className={styles['cancel-inline']}>List</button>
                                    </div>
                                )}
                                {errors.company_id && <span className={styles['error']}>{errors.company_id}</span>}
                            </div>

                            <div className={styles['field']}>
                                <label>Brand *</label>
                                {!isNewBrand ? (
                                    <div className={styles['input-group']}>
                                        <select value={data.brand_id} onChange={e => setData('brand_id', e.target.value)}>
                                            <option value="">Select Brand</option>
                                            {filteredBrands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                        </select>
                                        <button type="button" onClick={() => { setIsNewBrand(true); setData('brand_id', '') }} className={styles['add-inline']}><Plus size={14} /> New</button>
                                    </div>
                                ) : (
                                    <div className={styles['input-group']}>
                                        <input placeholder="New Brand Name" value={data.new_brand_name} onChange={e => setData('new_brand_name', e.target.value)} />
                                        <button type="button" onClick={() => setIsNewBrand(false)} className={styles['cancel-inline']}>List</button>
                                    </div>
                                )}
                                {errors.brand_id && <span className={styles['error']}>{errors.brand_id}</span>}
                            </div>
                        </div>

                        <div className={styles['section-title']}>
                            <FileText size={20} /> <h4>Beverage Details</h4>
                        </div>

                        <div className={styles['field']}>
                            <label>Product Name *</label>
                            <input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="e.g. Pipeline Punch" />
                            {errors.name && <span className={styles['error']}>{errors.name}</span>}
                        </div>

                        <div className={styles['field-grid']}>
                            <div className={styles['field']}>
                                <label>Country *</label>
                                <select value={data.country_code} onChange={e => setData('country_code', e.target.value)}>
                                    <option value="">Select Country</option>
                                    {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                                </select>
                            </div>

                            <div className={styles['field']}>
                                <label>Lineup / Flavor</label>
                                <input value={data.lineup_flavor} onChange={e => setData('lineup_flavor', e.target.value)} placeholder="e.g. Juiced" />
                            </div>
                        </div>

                        <div className={styles['field-grid']}>
                            <div className={styles['field']}>
                                <label>Release Date *</label>
                                <input
                                    type="text"
                                    placeholder="YYYY, MM-YYYY, or DD-MM-YYYY"
                                    value={data.release_date}
                                    onChange={e => setData('release_date', e.target.value)}
                                />
                                <small>Accepted: 2024, 05-2024, or 15-05-2024</small>
                                {errors.release_date && <span className={styles['error']}>{errors.release_date}</span>}
                            </div>

                            <div className={styles['field']}>
                                <label>Volume (mL) *</label>
                                <input type="number" value={data.volume} onChange={e => setData('volume', e.target.value)} />
                            </div>
                        </div>

                        <div className={styles['field-grid']}>
                            <div className={styles['field']}>
                                <label>Barcode *</label>
                                <input value={data.barcode} onChange={e => setData('barcode', e.target.value)} />
                            </div>

                            <div className={styles['field']}>
                                <label>SKU (Internal Code)</label>
                                <input value={data.sku} onChange={e => setData('sku', e.target.value)} />
                            </div>
                        </div>

                        <div className={styles['manufacturer-selector']}>
                            <label>Select known manufacturers (Optional)</label>
                            <div className={styles['manufacturer-grid']}>
                                {manufacturers.map(m => (
                                    <div
                                        key={m.id}
                                        className={`${styles['m-card']} ${data.manufacturer_ids.includes(m.id) ? styles['selected'] : ''}`}
                                        onClick={() => toggleManufacturer(m.id)}
                                    >
                                        <div className={styles['m-logo']}>
                                            {m.logo_url?.card ? (
                                                <img src={m.logo_url.card} alt={m.name} />
                                            ) : (
                                                <ImageIcon size={20} className={styles['placeholder']} />
                                            )}
                                        </div>
                                        <span className={styles['m-name']}>{m.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles['new-m-toggle']}>
                                {!isNewManufacturer ? (
                                    <button type="button" className={styles['text-btn']} onClick={() => setIsNewManufacturer(true)}>
                                        <Plus size={14} /> Manufacturer not listed?
                                    </button>
                                ) : (
                                    <div className={styles['field']}>
                                        <label>Custom Manufacturer Name</label>
                                        <div className={styles['input-group']}>
                                            <input
                                                placeholder="e.g. Vintage Bottling Co."
                                                value={data.new_manufacturer_name}
                                                onChange={e => setData('new_manufacturer_name', e.target.value)}
                                            />
                                            <button type="button" onClick={() => { setIsNewManufacturer(false); setData('new_manufacturer_name', '') }} className={styles['cancel-inline']}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles['section-title']}>
                            <Globe size={20} /> <h4>Ingredients & Language</h4>
                        </div>

                        {data.translations.map((trans, index) => (
                            <div key={index} className={styles['translation-block']}>
                                <div className={styles['translation-header']}>
                                    <select
                                        value={trans.language_code}
                                        onChange={e => {
                                            const newTrans = [...data.translations];
                                            newTrans[index].language_code = e.target.value;
                                            setData('translations', newTrans);
                                        }}
                                    >
                                        <option value="">Select Language</option>
                                        {languages.map(lang => (
                                            <option key={lang.code} value={lang.code}>
                                                {lang.name} ({lang.code})
                                            </option>
                                        ))}
                                    </select>

                                    {trans.can_delete && (
                                        <button
                                            type="button"
                                            onClick={() => setData('translations', data.translations.filter((_, i) => i !== index))}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <label className={styles['checkbox-label']}>
                                    <input
                                        type="checkbox"
                                        checked={trans.is_original}
                                        onChange={e => {
                                            const newTrans = [...data.translations];
                                            newTrans[index].is_original = e.target.checked;
                                            setData('translations', newTrans);
                                        }}
                                    />
                                    <span>Original language on packaging</span>
                                </label>

                                <textarea
                                    placeholder="Ingredients..."
                                    value={trans.ingredients}
                                    onChange={e => {
                                        const newTrans = [...data.translations];
                                        newTrans[index].ingredients = e.target.value;
                                        setData('translations', newTrans);
                                    }}
                                />
                                <textarea
                                    placeholder="Warning text (optional)..."
                                    value={trans.warning_text}
                                    onChange={e => {
                                        const newTrans = [...data.translations];
                                        newTrans[index].warning_text = e.target.value;
                                        setData('translations', newTrans);
                                    }}
                                />
                                <textarea
                                    placeholder="Extra info (optional)..."
                                    value={trans.extra_info}
                                    onChange={e => {
                                        const newTrans = [...data.translations];
                                        newTrans[index].extra_info = e.target.value;
                                        setData('translations', newTrans);
                                    }}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addTranslation} className={styles['add-btn']}>
                            <Plus size={16} /> Add Language
                        </button>

                        {/* DYNAMIC NUTRITION INFORMATION */}
                        <div className={styles['section-title']}>
                            <FileText size={20} /> <h4>Nutrition Information</h4>
                        </div>

                        <div className={styles['nutrition-editor']}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nutrient / Compound</th>
                                        <th>Per 100 mL</th>
                                        <th>Per {data.volume || 'Full'} mL</th>
                                        <th style={{ width: '50px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.nutrition_items.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={e => handleNutritionChange(index, 'name', e.target.value)}
                                                    placeholder="e.g. Vitamin B12"
                                                    className={styles['nutrient-name-input']}
                                                    disabled={!item.can_delete}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={item.per_100ml}
                                                    onChange={e => handleNutritionChange(index, 'per_100ml', e.target.value)}
                                                    placeholder="-"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={item.per_full_volume}
                                                    onChange={e => handleNutritionChange(index, 'per_full_volume', e.target.value)}
                                                    placeholder="-"
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.can_delete && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeNutritionRow(index)}
                                                        className={styles['delete-row-btn']}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button
                                type="button"
                                onClick={addNutritionRow}
                                className={styles['add-row-btn']}
                            >
                                <Plus size={14} /> Add Nutrient Row
                            </button>
                        </div>

                        <div className={styles['submit-zone']}>
                            <label className={styles['checkbox-label']} style={{ marginBottom: '20px', justifyContent: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={data.add_to_collection}
                                    onChange={e => setData('add_to_collection', e.target.checked)}
                                />
                                <span>Add this beverage to my personal collection immediately</span>
                            </label>

                            <button type="submit" disabled={processing} className={styles['save-btn']}>
                                {processing ? 'Saving...' : 'Confirm and Save Beverage'}
                            </button>

                            {Object.keys(errors).length > 0 && (
                                <p className={styles['error-text']}>There are errors in the form. Please check the fields above.</p>
                            )}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

Create.layout = (page: any) => <Layout children={page} />;