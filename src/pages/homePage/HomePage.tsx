import styles from './HomePage.module.css';
import { ArrowRight, Code, Users, Briefcase, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className={styles.homepage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <Zap size={14} />
                        <span>Empowering developers worldwide</span>
                    </div>

                    <h1 className={styles.heroTitle}>
                        Build amazing projects
                        <br />
                        <span className={styles.gradient}>with talented developers</span>
                    </h1>

                    <p className={styles.heroDescription}>
                        Connect with skilled developers, form powerful teams, and bring your ideas to life.
                        Daraja Devs is the platform where innovation meets collaboration.
                    </p>

                    <div className={styles.heroCta}>
                        <Link to="/devs" className={styles.primaryButton}>
                            <span>Find Developers</span>
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/projects" className={styles.secondaryButton}>
                            Browse Projects
                        </Link>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>500+</div>
                            <div className={styles.statLabel}>Active Developers</div>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>150+</div>
                            <div className={styles.statLabel}>Projects Completed</div>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <div className={styles.statNumber}>50+</div>
                            <div className={styles.statLabel}>Active Teams</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.visualCard}>
                        <div className={styles.visualCardGlow} />
                        <div className={styles.codeBlock}>
                            <div className={styles.codeHeader}>
                                <div className={styles.codeDots}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span className={styles.codeTitle}>daraja-devs.ts</span>
                            </div>
                            <div className={styles.codeContent}>
                                <div className={styles.codeLine}>
                                    <span className={styles.codeKeyword}>const</span>
                                    <span className={styles.codeVariable}> team</span>
                                    <span> = </span>
                                    <span className={styles.codeFunction}>createTeam</span>
                                    <span>(&#123;</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span>  name: </span>
                                    <span className={styles.codeString}>'Innovation Squad'</span>
                                    <span>,</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span>  developers: </span>
                                    <span className={styles.codeNumber}>5</span>
                                    <span>,</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span>  skills: [</span>
                                    <span className={styles.codeString}>'React'</span>
                                    <span>, </span>
                                    <span className={styles.codeString}>'Node'</span>
                                    <span>]</span>
                                </div>
                                <div className={styles.codeLine}>
                                    <span>&#125;);</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <Code size={24} />
                        </div>
                        <h3 className={styles.featureTitle}>Find Developers</h3>
                        <p className={styles.featureDescription}>
                            Discover talented developers with the skills you need for your next project
                        </p>
                        <Link to="/devs" className={styles.featureLink}>
                            Explore developers <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <Users size={24} />
                        </div>
                        <h3 className={styles.featureTitle}>Build Teams</h3>
                        <p className={styles.featureDescription}>
                            Create and manage high-performing teams to tackle complex challenges
                        </p>
                        <Link to="/teams" className={styles.featureLink}>
                            View teams <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>
                            <Briefcase size={24} />
                        </div>
                        <h3 className={styles.featureTitle}>Launch Projects</h3>
                        <p className={styles.featureDescription}>
                            Start new projects and collaborate with developers from around the world
                        </p>
                        <Link to="/projects" className={styles.featureLink}>
                            Browse projects <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}