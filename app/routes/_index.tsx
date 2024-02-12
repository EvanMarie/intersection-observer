import { useEffect, useState, useRef } from "react";

function TestBox({
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

function LoadingBox({ children }: { children: React.ReactNode }) {
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

type Item = {
  id: number;
  text: string;
};

// Simulates fetching items from an API
const fetchItems = (startIndex: number, limit: number = 10): Item[] => {
  return Array.from({ length: limit }, (_, index) => ({
    id: startIndex + index,
    text: `Item ${startIndex + index}`,
  }));
};

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initially load some items
    setItems(fetchItems(0));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));

          setVisibleItems((prevVisibleItems) => {
            const updatedVisibleItems = new Set(prevVisibleItems);
            if (entry.isIntersecting) {
              updatedVisibleItems.add(id);
            } else {
              updatedVisibleItems.delete(id);
            }
            return updatedVisibleItems;
          });
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Adjust based on when you consider the item to be visible
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);

  // Log the array of currently visible items
  useEffect(() => {
    console.log(
      "Visible Items:",
      Array.from(visibleItems).map((id) => `${id}`)
    );
  }, [visibleItems]); // This useEffect is specifically for logging

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setItems((prevItems) => {
              const newItems = [...prevItems, ...fetchItems(prevItems.length)];
              itemRefs.current = itemRefs.current
                .slice(0, prevItems.length)
                .concat(
                  new Array(newItems.length - prevItems.length).fill(null)
                );
              return newItems;
            });
            setLoading(false);
          }, 2000); // Simulate network delay
        }
      },
      {
        rootMargin: "100px",
      }
    );

    // Target element for observing
    const target = document.querySelector("#infinite-scroll-trigger");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loading]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          background: "#222",
          color: "white",
          padding: "1vh",
          textAlign: "center",
          fontFamily: "monospace",
          boxShadow: "1px 1px 12px 1px #000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2vh",
        }}
      >
        <div
          style={{ display: "flex", width: "50vw", justifyContent: "flex-end" }}
        >
          <h2>Intersection Observer - </h2>
        </div>
        <div style={{ display: "flex", width: "50vw", textAlign: "left" }}>
          <h2>items: {Array.from(visibleItems).map((id) => `${id} | `)}</h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "5vh",
          padding: "3vh",
          background: "#444",
          paddingTop: "15vh",
        }}
      >
        {items.map((item, index) => (
          <TestBox item={item} itemRefs={itemRefs} index={index} key={index} />
        ))}
        {!loading && (
          <div id="infinite-scroll-trigger" style={{ height: "20px" }} />
        )}
        <LoadingBox>{loading && <p>Loading more items...</p>}</LoadingBox>
      </div>
    </>
  );
}
