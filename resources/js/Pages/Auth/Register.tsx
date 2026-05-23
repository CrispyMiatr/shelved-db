import { useForm, Head, Link } from '@inertiajs/react';
import { Lock, Mail, User, UserPlus } from 'lucide-react';
import { Layout } from '~/components';
import auth from '~styles/pages/auth.module.scss';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className={auth['auth-container']}>
            <Head title="Register" />

            <form onSubmit={submit} className={auth['form']}>
                <div className={auth['form__title']}>
                    <img src={'/logo-black.svg'} alt="Shelved." className={auth['form__title__logo']} />
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