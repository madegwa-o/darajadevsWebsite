import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Menu, X, Sun, Moon, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from "../../hooks/authhook.tsx";
import { useTheme } from "../../hooks/themehook.tsx";
import { Link } from "react-router-dom";

export default function Header() {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Apply theme to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [theme]);

    // Close mobile menu on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
                setUserMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setUserMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const closeAllMenus = () => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link to="/" className={styles.logo} onClick={closeAllMenus}>
                    <span className={styles.logoText}>Daraja Devs</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink} onClick={closeAllMenus}>Home</Link>
                    <Link to="/devs" className={styles.navLink} onClick={closeAllMenus}>Developers</Link>
                    <Link to="/teams" className={styles.navLink} onClick={closeAllMenus}>Teams</Link>
                    <Link to="/projects" className={styles.navLink} onClick={closeAllMenus}>Projects</Link>
                </nav>

                {/* Right Side Actions */}
                <div className={styles.actions}>
                    {/* Theme Toggle */}
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </button>

                    {/* User Menu (Desktop) */}
                    {user?.name && (
                        <div className={styles.userMenuWrapper}>
                            <button
                                className={styles.userButton}
                                onClick={toggleUserMenu}
                                aria-expanded={userMenuOpen}
                            >
                                <div className={styles.userAvatar}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className={styles.userName}>{user.name}</span>
                                <ChevronDown
                                    size={16}
                                    className={`${styles.chevron} ${userMenuOpen ? styles.chevronOpen : ''}`}
                                />
                            </button>

                            {/* User Dropdown */}
                            {userMenuOpen && (
                                <>
                                    <div
                                        className={styles.dropdownOverlay}
                                        onClick={closeAllMenus}
                                    />
                                    <div className={styles.userDropdown}>
                                        <div className={styles.dropdownHeader}>
                                            <div className={styles.userAvatarLarge}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className={styles.dropdownName}>{user.name}</div>
                                                <div className={styles.dropdownEmail}>{user.email}</div>
                                            </div>
                                        </div>
                                        <div className={styles.dropdownDivider} />
                                        <Link to="/profile" className={styles.dropdownItem} onClick={closeAllMenus}>
                                            <User size={16} />
                                            <span>Profile</span>
                                        </Link>
                                        <Link to="/settings" className={styles.dropdownItem} onClick={closeAllMenus}>
                                            <Settings size={16} />
                                            <span>Settings</span>
                                        </Link>
                                        <div className={styles.dropdownDivider} />
                                        <button
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                logout?.();
                                                closeAllMenus();
                                            }}
                                        >
                                            <LogOut size={16} />
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.menuButton}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <>
                    <div
                        className={styles.mobileOverlay}
                        onClick={closeAllMenus}
                    />
                    <div className={styles.mobileMenu}>
                        {/* User Info (Mobile) */}
                        {user?.name && (
                            <div className={styles.mobileUserInfo}>
                                <div className={styles.userAvatarLarge}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className={styles.mobileUserName}>{user.name}</div>
                                    <div className={styles.mobileUserEmail}>{user.email}</div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Navigation Links */}
                        <nav className={styles.mobileNav}>
                            <Link to="/" className={styles.mobileNavLink} onClick={closeAllMenus}>Home</Link>
                            <Link to="/devs" className={styles.mobileNavLink} onClick={closeAllMenus}>Developers</Link>
                            <Link to="/teams" className={styles.mobileNavLink} onClick={closeAllMenus}>Teams</Link>
                            <Link to="/projects" className={styles.mobileNavLink} onClick={closeAllMenus}>Projects</Link>
                        </nav>

                        {/* Mobile User Actions */}
                        {user?.name && (
                            <>
                                <div className={styles.mobileDivider} />
                                <div className={styles.mobileActions}>
                                    <Link to="/profile" className={styles.mobileActionItem} onClick={closeAllMenus}>
                                        <User size={20} />
                                        <span>Profile</span>
                                    </Link>
                                    <Link to="/settings" className={styles.mobileActionItem} onClick={closeAllMenus}>
                                        <Settings size={20} />
                                        <span>Settings</span>
                                    </Link>
                                    <button
                                        className={styles.mobileActionItem}
                                        onClick={() => {
                                            logout?.();
                                            closeAllMenus();
                                        }}
                                    >
                                        <LogOut size={20} />
                                        <span>Sign out</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </header>
    );
}