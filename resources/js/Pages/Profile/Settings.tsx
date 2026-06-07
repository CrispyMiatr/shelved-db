import { useForm, usePage, Head, Link } from '@inertiajs/react';
import { PageProps } from '~/types';
import { Layout } from '~/components';
import settings from '~styles/pages/profile/settings.module.scss';
import { ArrowLeft, Shield, Lock, Trash2, AlertTriangle, LogOut } from 'lucide-react';
import { FormEvent } from 'react';

const Settings = () => {
    const { auth, status } = usePage<PageProps>().props;
    const user = auth.user;

    const privacyForm = useForm({
        is_private: user.is_private,
        name: user.name,
        username: user.username,
        email: user.email,
        _method: 'patch',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({
        password: '',
    });

    const handlePrivacyToggle = (checked: boolean) => {
        privacyForm.setData('is_private', checked);

        privacyForm.patch(route('profile.update'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // TODO: "Saved" toast notification
            }
        });
    };

    const updatePassword = (e: FormEvent) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    const deleteAccount = (e: FormEvent) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete your account? This action is permanent.')) {
            deleteForm.delete(route('profile.destroy'), {
                preserveScroll: true,
                onFinish: () => deleteForm.reset(),
            });
        }
    };

    return (
        <div className={settings['settings-container']}>
            <Head>
                <title>Account Settings | Shelved.</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className={settings['header']}>
                <Link
                    href={route('profile.show', user.username)}
                    className={settings['header__back-btn']}
                    title="Back to profile"
                >
                    <ArrowLeft size={20} />
                </Link>

                <h2>Settings</h2>
            </div>

            <div className={settings['action-bar']}>
                <Link href={route('profile.show', user.username)} className={settings['action-bar__left']}>
                    <ArrowLeft size={20} />
                </Link>

                <p className={settings['action-bar__title']}>Settings</p>

                <div className={settings['action-bar__right']}></div>
            </div>

            <div className={settings['sections-wrapper']}>
                <section className={settings['card']}>
                    <div className={settings['card-header']}>
                        <Shield size={22} className={settings['icon']} />
                        <h3>Privacy</h3>
                    </div>
                    <div className={settings['card-body']}>
                        <div className={settings['setting-item']}>
                            <div className={settings['info']}>
                                <strong>Private Profile</strong>
                                <p>Only mutual followers can see your collection and social lists.</p>
                            </div>
                            <label className={settings['switch']}>
                                <input
                                    type="checkbox"
                                    checked={privacyForm.data.is_private}
                                    onChange={(e) => handlePrivacyToggle(e.target.checked)}
                                    disabled={privacyForm.processing}
                                />
                                <span className={settings['slider']}></span>
                            </label>
                        </div>
                    </div>
                </section>

                <section className={settings['card']}>
                    <div className={settings['card-header']}>
                        <Lock size={22} className={settings['icon']} />
                        <h3>Security</h3>
                    </div>
                    <form onSubmit={updatePassword} className={settings['card-body']}>
                        {status === 'password-updated' && (
                            <p className={settings['success-msg']}>Password updated successfully.</p>
                        )}

                        <div className={settings['field']}>
                            <label>Current Password</label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={e => passwordForm.setData('current_password', e.target.value)}
                                className={passwordForm.errors.current_password ? settings['input-error'] : ''}
                            />
                            {passwordForm.errors.current_password && <span className={settings['error']}>{passwordForm.errors.current_password}</span>}
                        </div>

                        <div className={settings['field']}>
                            <label>New Password</label>
                            <input
                                type="password"
                                value={passwordForm.data.password}
                                onChange={e => passwordForm.setData('password', e.target.value)}
                                className={passwordForm.errors.password ? settings['input-error'] : ''}
                            />
                            {passwordForm.errors.password && <span className={settings['error']}>{passwordForm.errors.password}</span>}
                        </div>

                        <div className={settings['field']}>
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className={settings['btn-secondary']}
                            disabled={passwordForm.processing}
                        >
                            Update Password
                        </button>
                    </form>
                </section>

                <section className={settings['card']}>
                    <div className={settings['card-header']}>
                        <LogOut size={22} className={settings['icon']} />
                        <h3>Log Out</h3>
                    </div>
                    <div className={settings['card-body']}>
                        <p className={settings['description']}>
                            Log out of your account on this device.
                        </p>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className={settings['btn-outline']}
                        >
                            Log Out
                        </Link>
                    </div>
                </section>

                <section className={`${settings['card']} ${settings['danger-zone']}`}>
                    <div className={settings['card-header']}>
                        <AlertTriangle size={22} className={settings['icon']} />
                        <h3>Danger Zone</h3>
                    </div>
                    <div className={settings['card-body']}>
                        <p>Once you delete your account, there is no going back. Please be certain.</p>

                        <form onSubmit={deleteAccount}>
                            <div className={settings['field']}>
                                <label>Confirm Password to Delete Account</label>
                                <input
                                    type="password"
                                    value={deleteForm.data.password}
                                    onChange={e => deleteForm.setData('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className={deleteForm.errors.password ? settings['input-error'] : ''}
                                />
                                {deleteForm.errors.password && <span className={settings['error']}>{deleteForm.errors.password}</span>}
                            </div>

                            <button
                                type="submit"
                                className={settings['btn-danger']}
                                disabled={deleteForm.processing}
                            >
                                <Trash2 size={16} />
                                Delete Account
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

Settings.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Settings;