import React, { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Edit2, Building2, Factory, Tags, X, Check, Plus, ExternalLink } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import { BrandType, CompanyType, ManagementPageType, ManufacturerType } from '~/types';
import manage from '~styles/pages/staff/management.module.scss';

type TabType = 'brands' | 'companies' | 'manufacturers';
type ManageableItem = BrandType | CompanyType | ManufacturerType;

const Management = ({ brands, companies, manufacturers, countries }: ManagementPageType) => {
    const [activeTab, setActiveTab] = useState<TabType>('brands');
    const [modalItem, setModalItem] = useState<{ id?: number, type: TabType } | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        website_url: '',
        company_id: '',
        country_code: '',
        abbreviation: '',
        logo: null as File | null,
        _method: 'patch' // default to patch for file uploads in updates
    });

    const openEditModal = (type: TabType, item: ManageableItem) => {
        setModalItem({ id: item.id, type });
        clearErrors();
        const brandItem = item as BrandType;
        const companyItem = item as CompanyType;
        const manuItem = item as ManufacturerType;
        setData({
            name: item.name || '',
            website_url: item.website_url || '',
            company_id: brandItem.company?.toString() || '',
            country_code: companyItem.country_code || '',
            abbreviation: manuItem.abbreviation || '',
            logo: null,
            _method: 'patch'
        });
    };

    const openCreateModal = (type: TabType) => {
        setModalItem({ type });
        clearErrors();
        reset();
        setData('_method' as any, 'post');
    };

    const closeModal = () => {
        setModalItem(null);
        reset();
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const isEditing = !!modalItem?.id;
        const routeName = `staff.${modalItem!.type}.${isEditing ? 'update' : 'store'}`;

        post(isEditing ? route(routeName, modalItem!.id) : route(routeName), {
            onSuccess: () => closeModal(),
        });
    };

    const currentList: ManageableItem[] = activeTab === 'brands'
        ? brands
        : activeTab === 'companies'
            ? companies
            : manufacturers;

    return (
        <div className={manage['container']}>
            <Head>
                <title>Staff Management | Shelved.</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className={manage['title']}>
                <h2>Database Management</h2>
            </div>

            <div className={manage['header']}>
                <div className={manage['header__tabs-wrap']}>
                    <div className={manage['header__tabs-wrap__tabs']}>
                        <button className={activeTab === 'brands' ? manage['active'] : ''} onClick={() => setActiveTab('brands')}>
                            <Tags size={18} /> Brands ({brands.length})
                        </button>
                        <button className={activeTab === 'companies' ? manage['active'] : ''} onClick={() => setActiveTab('companies')}>
                            <Building2 size={18} /> Companies ({companies.length})
                        </button>
                        <button className={activeTab === 'manufacturers' ? manage['active'] : ''} onClick={() => setActiveTab('manufacturers')}>
                            <Factory size={18} /> Manufacturers ({manufacturers.length})
                        </button>
                    </div>

                    <button className={manage['add-btn']} onClick={() => openCreateModal(activeTab)}>
                        <Plus size={18} /> Add {activeTab.slice(0, -1)}
                    </button>
                </div>
            </div>

            <div className={manage['table-wrap']}>
                <table className={manage['table']}>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>{activeTab === 'brands' ? 'Parent Company' : activeTab === 'companies' ? 'Country' : 'Abbreviation'}</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentList.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className={manage['table__logo']}>
                                        <img src={item.logo_url?.card} alt="" />
                                    </div>
                                </td>
                                <td>
                                    <span className={manage['table__item-name']}>{item.name}</span>
                                </td>
                                <td>
                                    {activeTab === 'brands' && ((item as BrandType).company?.name || <span className={manage['table__missing']}>Missing Company</span>)}
                                    {activeTab === 'companies' && ((item as CompanyType).country_code || <span className={manage['table__missing']}>No Country</span>)}
                                    {activeTab === 'manufacturers' && ((item as ManufacturerType).abbreviation || '-')}
                                </td>
                                <td>
                                    {item.website_url ? (
                                        <a href={item.website_url} target="_blank" rel="noreferrer" className={manage['table__link-icon']}>
                                            <ExternalLink size={16} />
                                        </a>
                                    ) : <span className={manage['table__missing']}>No URL</span>}
                                </td>
                                <td>
                                    <button onClick={() => openEditModal(activeTab, item)} className={manage['edit-btn']}>
                                        <Edit2 size={14} /> Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalItem && (
                <div
                    className={manage['modal-wrap']}
                    onClick={closeModal}
                >
                    <div
                        className={manage['modal-wrap__modal']}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={manage['modal-wrap__modal__header']}>
                            <h3>{modalItem.id ? 'Edit' : 'Add'} {modalItem.type.slice(0, -1)}</h3>
                            <button onClick={closeModal}><X size={20} /></button>
                        </div>

                        <form onSubmit={submit} className={manage['form']}>
                            <div className={manage['form__field']}>
                                <label>Name</label>
                                <input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Name..." />
                                {errors.name && <span className={manage['error']}>{errors.name}</span>}
                            </div>

                            {modalItem.type === 'brands' && (
                                <div className={manage['form__field']}>
                                    <label>Parent Company</label>
                                    <select value={data.company_id} onChange={e => setData('company_id', e.target.value)}>
                                        <option value="">Select Company</option>
                                        {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    {errors.company_id && <span className={manage['error']}>{errors.company_id}</span>}
                                </div>
                            )}

                            {modalItem.type === 'companies' && (
                                <div className={manage['form__field']}>
                                    <label>Country</label>
                                    <select value={data.country_code} onChange={e => setData('country_code', e.target.value)}>
                                        <option value="">Select Country</option>
                                        {countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                    {errors.country_code && <span className={manage['error']}>{errors.country_code}</span>}
                                </div>
                            )}

                            {modalItem.type === 'manufacturers' && (
                                <div className={manage['form__field']}>
                                    <label>Abbreviation</label>
                                    <input value={data.abbreviation} onChange={e => setData('abbreviation', e.target.value)} maxLength={10} placeholder="e.g. AG" />
                                </div>
                            )}

                            <div className={manage['form__field']}>
                                <label>Website URL</label>
                                <input type="url" value={data.website_url} onChange={e => setData('website_url', e.target.value)} placeholder="https://..." />
                                {errors.website_url && <span className={manage['error']}>{errors.website_url}</span>}
                            </div>

                            <div className={manage['form__field']}>
                                <label>{modalItem.id ? 'Replace Logo' : 'Logo'}</label>
                                <div className={manage['field__upload-box']}>
                                    <input type="file" accept="image/png, image/webp, image/svg+xml, image/jpeg" onChange={e => setData('logo', e.target.files?.[0] || null)} />
                                </div>
                                {errors.logo && <span className={manage['error']}>{errors.logo}</span>}
                            </div>

                            <div className={manage['form__modal-actions']}>
                                <button type="button" onClick={closeModal} className={manage['cancel-btn']}>Cancel</button>
                                <button type="submit" disabled={processing} className={manage['save-btn']}>
                                    {processing ? 'Processing...' : <><Check size={16} /> {modalItem.id ? 'Save Changes' : 'Create Entry'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Management.layout = (page: any) => <Layout children={page} />;

export default Management;