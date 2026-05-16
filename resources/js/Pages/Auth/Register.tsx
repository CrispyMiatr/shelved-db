import { useForm, Head, Link } from '@inertiajs/react';
import { Layout } from '~/components';
import '~styles/pages/login.scss'

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => console.log('Request finished'),
            onError: (err) => console.log('Validation Errors:', err),
        });
    };

    return (
        <div className="auth-container">
            <Head title="Register" />
            <form onSubmit={submit}>
                {Object.keys(errors).length > 0 && (
                    <div className="error-summary" style={{ color: 'red', marginBottom: '1rem' }}>
                        Please fix the errors below to continue.
                    </div>
                )}

                <div className="field">
                    <input
                        placeholder="Email"
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="error-text" style={{ color: 'red' }}>{errors.email}</div>}
                </div>

                <div className="field">
                    <input
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <div className="error-text" style={{ color: 'red' }}>{errors.password}</div>}
                </div>

                <div className="field">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                    />
                </div>

                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                <button type="submit" disabled={processing}>
                    {processing ? 'Processing...' : 'Next Step'}
                </button>

                <div className="auth-footer">
                    <Link href={route('login')}>Already have an account? Log in</Link>
                </div>
            </form>
        </div>
    );
}

Register.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Register;