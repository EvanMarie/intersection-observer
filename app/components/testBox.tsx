export type Item = {
  id: number;
  text: string;
};

export default function TestBox({
  item,
  index,
  itemRefs,
}: {
  item: Item;
  index: number;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <div
      key={item.id}
      data-id={item.id}
      ref={(el) => (itemRefs.current[index] = el)}
      style={{
        height: "40vh",
        width: "60vh",
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
      {item.text}
    </div>
  );
}
