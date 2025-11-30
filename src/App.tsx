import styles from './App.module.css'
import {Outlet} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

function App() {

  return (
    <>
        <Header />
        <main className={styles.main}>
            <Outlet />
        </main>
        <Footer />


    </>
  )
}

export default App
