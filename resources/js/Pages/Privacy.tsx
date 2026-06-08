import { Head } from '@inertiajs/react';
import { ShieldCheck, Lock, Eye, Database, Cpu } from 'lucide-react';
import { Layout } from '~/components/common/Layout';
import styles from '~styles/pages/legal.module.scss';

const Privacy = () => {
    const lastUpdated = "June 2026";

    return (
        <div className={styles['legal-container']}>
            <Head title="Privacy Policy" />

            <header className={styles['title']}>
                <h2>Privacy Policy</h2>
                <p>Last Updated: {lastUpdated}</p>
            </header>

            <section className={styles['section']}>
                <div className={styles['icon-title']}>
                    <h3>Introduction</h3>
                </div>
                <p>
                    At Shelved., we believe in transparency. This policy explains how we collect,
                    use, and protect your data when you use our beverage database and community features.
                </p>
            </section>

            <section className={styles['section']}>
                <div className={styles['icon-title']}>
                    <h3>Information We Collect</h3>
                </div>
                <ul>
                    <li><strong>Account Data:</strong> We collect your email address, username, and password when you register.</li>
                    <li><strong>Profile Data:</strong> Any information you choose to add to your profile, including your display name, bio, social media links, and avatar.</li>
                    <li><strong>Content Data:</strong> Images of beverages you upload and data generated about your personal collection.</li>
                </ul>
            </section>

            <section className={styles['section']}>
                <div className={styles['icon-title']}>
                    <h3>AI & Third-Party Processing</h3>
                </div>
                <p>To provide our features, we work with trusted partners:</p>
                <ul>
                    <li><strong>Google Gemini AI:</strong> When you use the "Extract Info" feature, your uploaded images are processed by Google's AI to identify beverage details.</li>
                    <li><strong>Cloudflare R2:</strong> Your images (beverages and avatars) are stored securely on Cloudflare's global storage network.</li>
                    <li><strong>Cloudflare Turnstile:</strong> We use Turnstile to protect our site from spam and automated bot attacks. This involves processing browser telemetry to verify you are a human.</li>
                </ul>
            </section>

            <section className={styles['section']}>
                <div className={styles['icon-title']}>
                    <h3>Cookies & Tracking</h3>
                </div>
                <p>
                    Shelved. does <strong>not</strong> use marketing or tracking cookies. We only use essential
                    functional cookies required for you to stay logged in and to prevent security threats (CSRF protection).
                    Because we do not track you for advertising, a cookie consent banner is not required.
                </p>
            </section>

            <section className={styles['section']}>
                <div className={styles['icon-title']}>
                    <h3>Your Rights</h3>
                </div>
                <p>
                    You have full control over your data. You can update your profile information or
                    change your privacy settings (to mutual-followers only) at any time.
                    If you wish to leave, you can use the "Delete Profile" option in your settings
                    to permanently remove your account and all associated data from our database (except beverage uploads).
                </p>
            </section>

            <footer className={styles['footer']}>
                <p>Questions? Contact us at info@shelvedb.com</p>
            </footer>
        </div>
    );
}

Privacy.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Privacy;