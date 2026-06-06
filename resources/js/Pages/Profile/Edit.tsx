import { useForm, usePage, Head, Link, router } from '@inertiajs/react';
import { PageProps, SocialLinks } from '~/types';
import { Layout } from '~/components';
import edit from '~styles/pages/profile/edit.module.scss';
import { ArrowLeft, Camera, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

const Edit = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const emptySocials: SocialLinks = {
        facebook: '', instagram: '', threads: '',
        twitter: '', bluesky: '', tiktok: '',
        youtube: '', ebay: ''
    };

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || '',
        is_private: user.is_private,
        social_links: user.social_links || emptySocials, // using fallback emptySocials in case user never set them
        avatar: null as File | null,
        _method: 'patch', // method spoofing for files
    });

    useEffect(() => {
        if (!data.avatar) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.avatar);
        setPreview(objectUrl);

        // free memory when component unmounts or file changes
        return () => URL.revokeObjectURL(objectUrl);
    }, [data.avatar]);

    const dynamicInitials = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'New User')}&background=random`;
    const avatarUrl = user?.avatar_url?.original || '';
    const isUsingPlaceholder = avatarUrl.includes('ui-avatars.com') || avatarUrl === '';

    const handleSocialChange = (platform: keyof SocialLinks, value: string) => {
        setData('social_links', {
            ...data.social_links,
            [platform]: value
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('profile.update'), {
            onSuccess: () => {
                router.visit(route('profile.show', data.username));
            },
        });
    };

    return (
        <div className={edit['edit-profile-container']}>
            <Head title="Edit Profile" />

            <div className={edit['title']}>
                <h2>Edit Profile</h2>
            </div>

            <form onSubmit={submit} className={edit['edit-form']}>
                <div className={edit['action-bar']}>
                    <Link href={route('profile.show', user.username)} className={edit['action-bar__left']}>
                        <ArrowLeft size={20} />
                    </Link>

                    <p className={edit['action-bar__title']}>Edit profile</p>

                    <button
                        type="submit"
                        className={edit['action-bar__right']}
                        disabled={processing}
                    >
                        {processing ? '...' : <Save size={20} />}
                    </button>
                </div>

                <section className={edit['form-section']}>
                    <h3 className={edit['section-title']}>General information</h3>

                    <div className={edit['avatar-edit']}>
                        <div className={edit['avatar-edit__wrapper']}>
                            <img
                                src={preview || (isUsingPlaceholder ? dynamicInitials : avatarUrl)}
                                alt='Avatar preview'
                                className={edit['avatar-img']}
                            />
                            <label className={edit['avatar-edit__wrapper__overlay']}>
                                <Camera size={20} />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={e => setData('avatar', e.target.files?.[0] || null)}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className={edit['avatar-edit__info']}>
                            <p>Profile Picture</p>
                            <span>PNG, JPG, WEBP up to 2MB</span>
                        </div>
                    </div>

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

export default Edit;