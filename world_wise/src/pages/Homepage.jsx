import { Link } from "react-router-dom";
import PageNav from "../components/PageNav.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import styles from "./Homepage.module.css";

export default function Homepage() {
  const { isAuthenticated } = useAuth();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={isAuthenticated ? "/app" : "login"} className="cta">
          Start Tracking
        </Link>
      </section>
    </main>
  );
}