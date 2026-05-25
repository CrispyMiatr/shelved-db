import { useForm, Head, usePage } from '@inertiajs/react';
import { Layout } from '~/components';
import { PageProps } from '~/types';
import { User, AtSign, BookOpen } from 'lucide-react';
import authS from '~styles/pages/auth.module.scss';

const RegisterSetup = () => {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, patch, processing, errors } = useForm({
        name: '',
        username: '',
        bio: '',
        email: auth.user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'));
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