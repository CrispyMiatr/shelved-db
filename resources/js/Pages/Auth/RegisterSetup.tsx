import { useEffect, useState } from 'react';
import { useForm, Head, usePage, router } from '@inertiajs/react';
import { User, AtSign, BookOpen, Camera } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import { PageProps } from '~/types';
import authS from '~styles/pages/auth.module.scss';

const RegisterSetup = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        bio: '',
        email: auth.user.email,
        avatar: null as File | null,
        _method: 'patch', // spoof patch for file upload compatibility
    });

    useEffect(() => {
        if (!data.avatar) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.avatar);
        setPreview(objectUrl);

        // free memory when component unmounts || file changes
        return () => URL.revokeObjectURL(objectUrl);
    }, [data.avatar]);

    const namePlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username || 'New User')}&background=random`;
    const avatarUrlObj = auth.user?.avatar_url;
    const originalUrl = avatarUrlObj?.original || '';
    const isUsingPlaceholder = originalUrl.includes('ui-avatars.com') || originalUrl === '';

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.update'), {
            onSuccess: () => {
                router.visit(route('profile.show', data.username));
            }
        });
    };

    return (
        <div className={authS['auth-container']}>
            <Head title="Complete Profile" />

            <form onSubmit={submit} className={authS['form']}>
                <div className={authS['form__title']}>
                    <img src={'/logo-black.svg'} alt="Shelved." className={authS['form__title__logo']} />
                    <h3>Welcome!</h3>
                    <p>Let's finish setting up your account for <br /> <strong>{auth.user.email}</strong></p>
                </div>

                <div className={authS['form__avatar']}>
                    <div className={authS['form__avatar__preview']}>
                        <img
                            src={preview || (isUsingPlaceholder ? namePlaceholder : originalUrl)}
                            alt="Avatar preview"
                        />
                        <label htmlFor="avatar-input" className={authS['form__avatar__label']}>
                            <Camera size={20} />
                            <input
                                id="avatar-input"
                                type="file"
                                accept="image/*"
                                onChange={e => setData('avatar', e.target.files?.[0] || null)}
                                hidden
                            />
                        </label>
                    </div>
                    {errors.avatar && <div className="error">{errors.avatar}</div>}
                </div>

                <div className={authS['form__element']}>
                    <label htmlFor="name">
                        <User size={14} />
                        Display Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        placeholder="John Doe"
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div className={authS['form__element']}>
                    <label htmlFor="username">
                        <AtSign size={14} />
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={data.username}
                        pattern="[a-zA-Z0-9\.\-_]+"
                        onChange={e => setData('username', e.target.value)}
                        placeholder="john.doe"
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>

                <div className={authS['form__element']}>
                    <label htmlFor="bio">
                        <BookOpen size={14} />
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                        rows={4}
                        placeholder="Tell us about yourself..."
                    />
                    {errors.bio && <div className="error">{errors.bio}</div>}
                </div>

                <button type="submit" disabled={processing} className={authS['form__submit']}>
                    {processing ? 'Finishing...' : 'Finish & View Profile'}
                </button>
            </form>
        </div>
    );
}

RegisterSetup.layout = (page: React.ReactNode) => <Layout children={page} />;

export default RegisterSetup;