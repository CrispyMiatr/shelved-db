import { useEffect } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Layout } from '~/components';
import '~styles/pages/login.scss'

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
        <div className="auth-container">
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <input
                    type="password"
                    placeholder="New Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />
                {errors.password && <div className="error">{errors.password}</div>}

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                />
                {errors.password_confirmation && <div className="error">{errors.password_confirmation}</div>}

                <button disabled={processing}>Reset Password</button>
            </form>
        </div>
    );
}

ResetPassword.layout = (page: React.ReactNode) => <Layout children={page} />;

export default ResetPassword;