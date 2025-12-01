// src/pages/developersPage/DevelopersPage.tsx

import { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import styles from "./DevelopersPage.module.css";

interface User {
    userId: number;
    regNo: string;
    annonumousName: string;
    schoolEmail: string;
    roles: string[];
}

export default function DevelopersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await apiClient.get(
                    "/api/v1/users/by-roles",
                    {
                        params: { roles: ["DEVELOPER", "ADMIN", "LECTURER"] },
                    }
                );

                console.log('response: ', response);

                setUsers(response.data);
            } catch (err: unknown) {
                setError("Failed to load developers.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDevelopers();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Developers</h1>

            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.list}>
                {users.map((user) => (
                    <div key={user.userId} className={styles.card}>
                        <h3>{user.annonumousName ?? "Unnamed User"}</h3>
                        <p>Email: {user.schoolEmail}</p>
                        <p>Roles: {user.roles.join(", ")}</p>
                        <p>Reg No: {user.regNo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
