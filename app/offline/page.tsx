export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#f5f5f5",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(0,229,180,0.1)",
          border: "1px solid rgba(0,229,180,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          fontSize: 20,
        }}
      >
        ⚡
      </div>
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        You&apos;re offline
      </h1>
      <p style={{ fontSize: 14, color: "#a0a0a0", maxWidth: 320, lineHeight: 1.6 }}>
        This page hasn&apos;t been saved for offline use yet. Lessons you&apos;ve
        already opened will still work — reconnect to access new content.
      </p>
    </div>
  );
}
