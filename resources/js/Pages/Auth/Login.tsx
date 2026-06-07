import { useForm, Head, Link } from '@inertiajs/react';
import { Lock, User } from 'lucide-react';
import { Layout } from '~/components';
import auth from '~styles/pages/auth.module.scss';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className={auth['auth-container']}>
            <Head title="Sign In" />

            <form onSubmit={submit} className={auth['form']}>
                <div className={auth['form__title']}>
                    <img src={'/logo-black.svg'} alt="Shelved." className={auth['form__title__logo']} />
                    <h3>Sign In</h3>
                    <p><strong>Welcome back!</strong> <br />Fill in your credentials to sign in.</p>
                </div>
                <div className={auth['form__element']}>
                    <label htmlFor='email'>
                        <User size={14} />
                        Email or username
                    </label>
                    <input
                        id='email'
                        name='email'
                        type="text"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        placeholder='email or username'
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
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>

                <div className={auth['form__checkbox']}>
                    <label htmlFor='remember'>
                        <input
                            id='remember'
                            name='remember_password'
                            type="checkbox"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                        />
                        Remember me
                    </label>

                    <Link href={route('password.request')}>Forgot password?</Link>
                </div>

                <button disabled={processing}>Sign In</button>

                <div className={auth['form__footer']}>
                    <p>Don't have an account?</p>
                    <Link href={route('register')}>Register</Link>
                </div>
            </form>
        </div>
    );
}

Login.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Login;