import { useForm, Head, Link } from '@inertiajs/react';
import { Layout } from '~/components';
import '~styles/pages/login.scss'

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
        <div className="auth-container">
            <Head title="Log in" />
            <form onSubmit={submit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                        />
                        Remember me
                    </label>
                </div>

                <button disabled={processing}>Log in</button>

                <div className="auth-footer">
                    <Link href={route('password.request')}>Forgot password?</Link>
                    <span className="divider">|</span>
                    <Link href={route('register')}>Create an account</Link>
                </div>
            </form>
        </div>
    );
}

Login.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Login;