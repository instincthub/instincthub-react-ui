import { logout } from "@/lib/auth/actions";

export default function SignOutSession() {
  return (
    <section>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2 style={styles.title}>Signout</h2>
          <p style={styles.message}>Your logged in session has expired!</p>
          <button className="important-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "var(--White)",
    padding: "20px 40px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  message: {
    fontSize: "1rem",
    margin: "15px 0",
    textAlign: "center",
  },
};
