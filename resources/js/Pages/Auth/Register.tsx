import { useForm, Head, Link, usePage } from '@inertiajs/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Lock, Mail } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import auth from '~styles/pages/auth.module.scss';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',

        captcha_token: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className={auth['auth-container']}>
            <Head title="Create Account" />

            <form onSubmit={submit} className={auth['form']}>
                <div className={auth['form__title']}>
                    <img src={'/logo_small-b.svg'} alt="Shelved." className={auth['form__title__logo']} />
                    <h3>Create Account</h3>
                    <p><strong>Welcome to Shelved.!</strong> <br />Fill in your information to create an account.</p>
                </div>

                <div className={auth['form__element']}>
                    <label htmlFor='email'>
                        <Mail size={14} />
                        Email Address
                    </label>
                    <input
                        id='email'
                        name='email'
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        placeholder="example@mail.com"
                        required
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div className={auth['form__element']}>
                    <label htmlFor='password'>
                        <Lock size={14} />
                        Password
                    </label>
                    <input
                        id='password'
                        name='password'
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        placeholder='password'
                        required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>

                <div className={auth['form__element']}>
                    <label htmlFor='password_confirmation'>
                        <Lock size={14} />
                        Confirm Password
                    </label>
                    <input
                        id='password_confirmation'
                        name='password_confirmation'
                        type="password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        placeholder='password'
                        required
                    />
                </div>

                <div className={auth['form__turnstile']}>
                    <Turnstile
                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                        onSuccess={(token) => setData('captcha_token', token)}
                        options={{
                            theme: 'light',
                            size: 'flexible'
                        }}
                    />
                </div>

                <button disabled={processing}>
                    {processing ? 'Creating account...' : 'Register'}
                </button>

                <div className={auth['form__footer']}>
                    <p>Already have an account?</p>
                    <Link href={route('login')}>Sign In</Link>
                </div>
            </form>
        </div>
    );
}

Register.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Register;