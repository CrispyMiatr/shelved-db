import { useForm, usePage, Head, Link } from '@inertiajs/react';
import { PageProps, SocialLinks } from '~/types';
import { Layout } from '~/components';
import edit from '~styles/pages/profile/edit.module.scss';
import { ArrowLeft, ChevronLeft, Pencil, Save } from 'lucide-react';

export default function Edit() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const emptySocials: SocialLinks = {
        facebook: '', instagram: '', threads: '',
        twitter: '', bluesky: '', tiktok: '',
        youtube: '', ebay: ''
    };

    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || '',
        is_private: user.is_private,
        // using fallback emptySocials in case user never set them
        social_links: user.social_links || emptySocials,
    });

    const handleSocialChange = (platform: keyof SocialLinks, value: string) => {
        setData('social_links', {
            ...data.social_links,
            [platform]: value
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <div className={edit['edit-profile-container']}>
            <Head title="Edit Profile" />

            <div className={edit['title']}>
                <h2>Profile</h2>
            </div>

            <form onSubmit={submit} className={edit['edit-form']}>
                {/* Mobile/Tablet Action Bar */}
                <div className={edit['action-bar']}>
                    <Link href={route('profile.show', user.username)} className={edit['action-bar__back']}>
                        <ArrowLeft size={20} />
                    </Link>

                    <p className={edit['action-bar__title']}>Edit profile</p>

                    <button
                        type="submit"
                        className={edit['action-bar__save']}
                        disabled={processing}
                    >
                        {processing ? '...' : <Save size={20} />}
                    </button>
                </div>

                <section className={edit['form-section']}>
                    <h3 className={edit['section-title']}>General information</h3>

                    <div className={edit['field']}>
                        <label className={edit['label']}>Display Name</label>
                        <input
                            type="text"
                            className={edit['input']}
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <span className={edit['error']}>{errors.name}</span>}
                    </div>

                    <div className={edit['field']}>
                        <label className={edit['label']}>Username</label>
                        <input
                            type="text"
                            className={edit['input']}
                            value={data.username}
                            onChange={e => setData('username', e.target.value)}
                        />
                        {errors.username && <span className={edit['error']}>{errors.username}</span>}
                    </div>

                    <div className={edit['field']}>
                        <label className={edit['label']}>Email Address</label>
                        <input
                            type="email"
                            className={edit['input']}
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <span className={edit['error']}>{errors.email}</span>}
                    </div>

                    <div className={edit['field']}>
                        <div className={edit['label-group']}>
                            <label className={edit['label']}>Bio</label>
                            <span className={edit['char-counter']}>
                                {data.bio.length}/200
                            </span>
                        </div>
                        <textarea
                            className={edit['textarea']}
                            value={data.bio}
                            onChange={e => setData('bio', e.target.value)}
                            placeholder="Tell us about your collection..."
                            maxLength={200}
                            rows={4}
                        />
                        {errors.bio && <span className={edit['error']}>{errors.bio}</span>}
                    </div>

                    <div className={edit['field-checkbox']}>
                        <label>
                            <input
                                type="checkbox"
                                checked={data.is_private}
                                onChange={e => setData('is_private', e.target.checked)}
                            />
                            <span>Private Profile (Mutual followers only)</span>
                        </label>
                    </div>
                </section>

                <section className={edit['social-links']}>
                    <h3 className={edit['section-title']}>Social media links</h3>
                    {(Object.keys(emptySocials) as Array<keyof SocialLinks>).map((platform) => {
                        const platformName = platform as string;
                        return (
                            <div key={platformName} className={edit['field']}>
                                <label className={edit['label']}>
                                    <img
                                        src={`/assets/icons/icon_${platform}.svg`}
                                        alt=""
                                        className={edit['social-icon']}
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                    {platformName.charAt(0).toUpperCase() + platformName.slice(1)}
                                </label>
                                <input
                                    type="url"
                                    className={edit['input']}
                                    value={data.social_links[platform] || ''}
                                    onChange={e => handleSocialChange(platform, e.target.value)}
                                    placeholder={`Link to your ${platformName}...`}
                                />
                                {errors[`social_links.${platform}` as any] && (
                                    <span className={edit['error']}>{errors[`social_links.${platform}` as any]}</span>
                                )}
                            </div>
                        );
                    })}
                </section>

                {/* Desktop Actions */}
                <div className={edit['form-actions']}>
                    <Link href={route('profile.show', user.username)} className={edit['btn-cancel']}>
                        Cancel
                    </Link>
                    <button type="submit" className={edit['btn-save']} disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

Edit.layout = (page: React.ReactNode) => <Layout children={page} />;