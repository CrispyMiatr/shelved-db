import { useForm, usePage, Head } from '@inertiajs/react';
import { PageProps, SocialLinks } from '~/types';
import { Layout } from '~/components';

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
        <div className="edit-profile-container">
            <Head title="Edit Profile" />

            <form onSubmit={submit} className="edit-form">
                <section>
                    <h3>General Information</h3>
                    <div className="field">
                        <label>Display Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={e => setData('username', e.target.value)}
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>

                    <div className="field">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="field">
                        <label>Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={e => setData('bio', e.target.value)}
                            placeholder="Tell us about your collection..."
                        />
                    </div>

                    <div className="field-checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={data.is_private}
                                onChange={e => setData('is_private', e.target.checked)}
                            />
                            Private Profile (Mutual followers only)
                        </label>
                    </div>
                </section>

                <section className="social-links-section">
                    <h3>Social Media & Shop Links</h3>
                    {(Object.keys(emptySocials) as Array<keyof SocialLinks>).map((platform) => {
                        const platformName = platform as string;
                        return (
                            <div key={platformName} className="field">
                                <label>{platformName.charAt(0).toUpperCase() + platformName.slice(1)}</label>
                                <input
                                    type="url"
                                    value={data.social_links[platform] || ''}
                                    onChange={e => handleSocialChange(platform, e.target.value)}
                                    placeholder={`Link to your ${platformName}...`}
                                />
                                {errors[`social_links.${platform}` as any] && (
                                    <span className="error">{errors[`social_links.${platform}` as any]}</span>
                                )}
                            </div>
                        );
                    })}
                </section>

                <div className="form-actions">
                    <button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

Edit.layout = (page: React.ReactNode) => <Layout children={page} />;