import { useForm, Head, Link } from '@inertiajs/react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import auth from '~styles/pages/auth.module.scss';

const ForgotPassword = ({ status }: { status?: string }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className={auth['auth-container']}>
            <Head title="Reset Password" />

            <form onSubmit={submit} className={auth['form']}>
                <div className={auth['form__title']}>
                    <img src={'/logo-black.svg'} alt="Shelved." className={auth['form__title__logo']} />
                    <h3>Reset Password</h3>
                    <p><strong>No worries.</strong> <br />Enter your email and we'll send you a link to reset it.</p>
                </div>

                {status && (
                    <div className={auth['form__status']}>
                        {status}
                    </div>
                )}

                <div className={auth['form__element']}>
                    <label htmlFor="email">
                        <Mail size={14} />
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        placeholder="example@mail.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                <button disabled={processing} className={auth['form__submit']}>
                    {processing ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className={auth['form__footer']}>
                    <Link href={route('login')}>
                        <ArrowLeft size={14} />
                        Back to Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
}

ForgotPassword.layout = (page: React.ReactNode) => <Layout children={page} />;

export default ForgotPassword;