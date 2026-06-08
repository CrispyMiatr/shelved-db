import { Head } from '@inertiajs/react';
import { Layout } from '~/components/common/Layout';
import styles from '~styles/pages/legal.module.scss';
import { Scale, ShieldAlert, Image, Cpu, Ban } from 'lucide-react';

const Terms = () => {
    return (
        <div className={styles['legal-container']}>
            <Head title="Terms of Service" />

            <header className={styles['title']}>
                <h2>Terms of Service</h2>
                <p>Last Updated: June 2026</p>
            </header>

            <section className={styles['section']}>
                <h3>1. Agreement to Terms</h3>
                <p>
                    By creating an account or using Shelved., you agree to be bound by these terms.
                    If you do not agree, please do not use our services.
                </p>
            </section>

            <section className={styles['section']}>
                <h3>2. User Content</h3>
                <p>
                    You retain ownership of the photos you upload. However, by uploading beverage images,
                    you grant Shelved. a worldwide, non-exclusive, royalty-free license to host,
                    cache, and display that content to other users. You are responsible for ensuring
                    you have the right to share the images you upload.
                </p>
            </section>

            <section className={styles['section']}>
                <h3>3. Automated Features (AI)</h3>
                <p>
                    The "Extract Info" feature uses third-party AI (Google Gemini). This feature is provided
                    for convenience. Shelved. does not guarantee the 100% accuracy of AI-generated data.
                    Users must verify the information against the physical packaging before confirming.
                </p>
            </section>

            <section className={styles['section']}>
                <h3>4. Prohibited Conduct</h3>
                <p>You agree not to:</p>
                <ul>
                    <li>- Abuse the AI extraction feature through automated scripting or "bots."</li>
                    <li>- Upload content that is pornographic, hateful, or illegal.</li>
                    <li>- Scrape our database to build a competing service.</li>
                    <li>- Impersonate other collectors or staff members.</li>
                </ul>
            </section>

            <section className={styles['section']}>
                <h3>5. Disclaimer of Liability</h3>
                <p>
                    Shelved. is provided "as-is." We are not responsible for any health issues arising
                    from incorrect nutrition data on our platform. Use the data at your own risk.
                    We reserve the right to modify or terminate the service at any time.
                </p>
            </section>

            <footer className={styles['footer']}>
                <p>Questions? Contact us at info@shelvedb.com</p>
            </footer>
        </div>
    );
}

Terms.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Terms;