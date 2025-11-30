import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Products</h3>
                        <ul className={styles.links}>
                            <li><a href="#" className={styles.link}>Payments</a></li>
                            <li><a href="#" className={styles.link}>Billing</a></li>
                            <li><a href="#" className={styles.link}>Connect</a></li>
                            <li><a href="#" className={styles.link}>Radar</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Developers</h3>
                        <ul className={styles.links}>
                            <li><a href="#" className={styles.link}>Documentation</a></li>
                            <li><a href="#" className={styles.link}>API Reference</a></li>
                            <li><a href="#" className={styles.link}>API Status</a></li>
                            <li><a href="#" className={styles.link}>Open Source</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Company</h3>
                        <ul className={styles.links}>
                            <li><a href="#" className={styles.link}>About</a></li>
                            <li><a href="#" className={styles.link}>Customers</a></li>
                            <li><a href="#" className={styles.link}>Partners</a></li>
                            <li><a href="#" className={styles.link}>Jobs</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Resources</h3>
                        <ul className={styles.links}>
                            <li><a href="#" className={styles.link}>Support</a></li>
                            <li><a href="#" className={styles.link}>Blog</a></li>
                            <li><a href="#" className={styles.link}>Guides</a></li>
                            <li><a href="#" className={styles.link}>Newsletter</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.brand}>
                        <div className={styles.brandIcon}>D</div>
                        <span className={styles.copyright}>© 2025 Daraja Devs, Inc.</span>
                    </div>

                    <div className={styles.social}>
                        <a href="#" className={styles.socialLink}>Twitter</a>
                        <a href="#" className={styles.socialLink}>GitHub</a>
                        <a href="#" className={styles.socialLink}>LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}