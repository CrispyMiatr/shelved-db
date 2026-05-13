import { useForm, Head } from '@inertiajs/react';
import { Layout } from '~/components';
import '~styles/pages/login.scss'

const ForgotPassword = ({ status }: { status?: string }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="auth-container">
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <input
                    type="email"
                    value={data.email}
                    placeholder="Email address"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <button disabled={processing}>Email Password Reset Link</button>
            </form>
        </div>
    );
}

ForgotPassword.layout = (page: React.ReactNode) => <Layout children={page} />;

export default ForgotPassword;