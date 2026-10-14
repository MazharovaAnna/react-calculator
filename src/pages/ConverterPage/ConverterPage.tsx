export function ConverterPage() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        color: "var(--text)",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 500 }}>Конвертер единиц</h1>
      <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
        Скоро здесь будет конвертер.
      </p>
    </div>
  );
}