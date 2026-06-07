import { useEffect } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import auth from '~styles/pages/auth.module.scss';

const ResetPassword = ({ token, email }: { token: string, email: string }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className={auth['auth-container']}>
            <Head title="New Password" />

            <form onSubmit={submit} className={auth['form']}>
                <div className={auth['form__title']}>
                    <img src={'/logo-black.svg'} alt="Shelved." className={auth['form__title__logo']} />
                    <h3>New Password</h3>
                    <p>Please enter your email one more time and choose a secure new password.</p>
                </div>

                <div className={auth['form__element']}>
                    <label htmlFor="email">
                        <Mail size={14} />
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="example@mail.com"
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div className={auth['form__element']}>
                    <label htmlFor="password">
                        <Lock size={14} />
                        New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>

                <div className={auth['form__element']}>
                    <label htmlFor="password_confirmation">
                        <Lock size={14} />
                        Confirm New Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && (
                        <div className="error">{errors.password_confirmation}</div>
                    )}
                </div>

                <button disabled={processing} className={auth['form__submit']}>
                    {processing ? 'Updating...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}

ResetPassword.layout = (page: React.ReactNode) => <Layout children={page} />;

export default ResetPassword;