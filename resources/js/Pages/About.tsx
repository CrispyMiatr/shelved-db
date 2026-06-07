import { Head } from '@inertiajs/react';
import { Layout } from '~/components';
import styles from '~styles/pages/about.module.scss';
import logo from '~assets/logo_full-b.svg'
import concept from '~assets/concept.png'

const About = () => {
    return (
        <div className={styles['about-container']}>
            <Head>
                <title>About Shelved. | The Database Project</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Shelved. was built by beverage enthusiasts for beverage enthusiasts. Learn more about our mission to archive every beverage can and bottle ever made."
                />
            </Head>

            <div className={styles['title']}>
                <h2>About</h2>
            </div>

            <header className={styles['hero']}>
                <img
                    src={logo}
                    alt="Beverage Database Logo"
                    className={styles['hero__logo']}
                />
                <div className={styles['hero__text']}>
                    <h1>The Ultimate Beverage Database</h1>
                    <p>
                        A crowd-sourced passion project made with a love for data visualisation
                        (and the collecting of energy drink cans).
                    </p>
                </div>
            </header>

            <div className={styles['content-wrapper']}>
                <section className={styles['content-section']}>
                    <h3>Why build a database?</h3>
                    <p>
                        Shortly after I started collecting Monster Energy cans I ran into the
                        issue of keeping track of my collection. Once you start it’s not very
                        difficult to keep updating it, but it’s still a chore sometimes.
                    </p>
                    <p>
                        As my collection kept growing, from hitting my first 100 can milestone
                        to now having passed 600 cans, I have always wanted to know what cans
                        are actually out there, and what collectors have in their own collection.
                        Not to collect them all, but to have an overview of what cans exist.
                    </p>
                    <p>
                        It all came down to my own curiosity, the reason this database exists.
                    </p>
                </section>

                <section className={styles['content-section']}>
                    <h3>The birth and evolution of the project.</h3>
                    <p>
                        The first idea of a beverage database started as I worked on a college
                        assignment of data visualisation. We had to make an infographic poster
                        of data we collected ourselves. I immediately had to think of my own
                        Monster collection, which I had fully archived in an excel sheet already.
                        I eventually delivered a poster of my own collection visualised very
                        similarly as to what this database has become.
                    </p>
                    <p>
                        Ever since delivering that infographic poster I couldn’t stop thinking
                        of making the idea into a free to access version. So, eventually, one
                        idea led to another, and here we are with a fully working, free to
                        access beverage database.
                    </p>
                    <p>
                        I hope this site can help you build your own collection, share your
                        current one or admire others’ collections!
                    </p>
                </section>

                <div className={styles['illustration']}>
                    <div className={styles['illustration__text']}>
                        <p className={styles['left']}>The final assignment submission</p>
                        <p className={styles['right']}>My Monster Energy collection on 13/03/2023</p>
                    </div>
                    <img
                        src={concept}
                        alt="The initial concept of the database."
                    />
                </div>

                <section className={styles['content-section']}>
                    <h3>My future ambitions</h3>
                    <p>
                        Most work on this website happened as a final work to my studies, with
                        continuing development ever since. As more beverages get discovered,
                        this database will keep growing.
                    </p>
                    <p>
                        I still have bigger ambitions with this platform. The biggest one being
                        expanding this database to other, more niche brands as well, although
                        collecting data for other, less collected brands isn’t easy at all.
                    </p>
                </section>

                <section className={styles['content-section']}>
                    <h3>Honourable mentions</h3>
                    <p>
                        This database would not have been possible without the help of my
                        collector friends and my college professors. I am so happy I could
                        make this into a fully working website for everyone to access.
                    </p>
                </section>
            </div>
        </div>
    );
};

About.layout = (page: React.ReactNode) => <Layout children={page} />;

export default About;