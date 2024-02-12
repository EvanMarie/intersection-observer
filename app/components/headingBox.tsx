export default function HeadingBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "10vh",
        width: "75vw",
        border: "0.5vh solid darkCyan",
        background: "cyan",
        borderRadius: "3vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4vh",
        fontWeight: 500,
        fontFamily: "monospace",
        boxShadow: "1px 1px 12px 1px #000",
      }}
    >
      {children}
    </div>
  );
}
