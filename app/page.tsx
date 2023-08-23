import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h3>Links</h3>
      <div style={{ display: "flex", color: "darkcyan", fontWeight: "bold" }}>
        <Link href="/todos">Todos</Link>
      </div>
    </div>
  );
}
