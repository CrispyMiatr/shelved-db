import { useForm, Head, usePage } from '@inertiajs/react';
import { Layout } from '~/components';
import { PageProps } from '~/types';
import '~styles/pages/login.scss';

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
        patch(route('profile.update'), {
            onError: (err) => console.log("Validation Failed:", err)
        });
    };

    return (
        <div className="auth-container">
            <Head title="Complete Profile" />

            <form onSubmit={submit}>
                <h2>Welcome, {auth.user.email}</h2>
                <p>Let's finish setting up your account.</p>

                <div className="field">
                    <label>Full Name</label>
                    <input
                        placeholder="Your Name"
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <div className="error-text" style={{ color: 'red' }}>{errors.name}</div>}
                </div>

                <div className="field">
                    <label>Username</label>
                    <input
                        placeholder="Choose a username"
                        type="text"
                        value={data.username}
                        // matches regex: letters, numbers, dots, dashes, underscores
                        pattern="[a-zA-Z0-9\.\-_]+"
                        onChange={e => setData('username', e.target.value)}
                    />
                    {errors.username && <div className="error-text" style={{ color: 'red' }}>{errors.username}</div>}
                </div>

                <div className="field">
                    <label>Bio</label>
                    <textarea
                        placeholder="Tell us about your collection..."
                        value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                    />
                    {errors.bio && <div className="error-text" style={{ color: 'red' }}>{errors.bio}</div>}
                </div>

                <button type="submit" disabled={processing}>
                    {processing ? 'Finishing...' : 'Finish & View Profile'}
                </button>
            </form>
        </div>
    );
}

RegisterSetup.layout = (page: React.ReactNode) => <Layout children={page} />;

export default RegisterSetup;