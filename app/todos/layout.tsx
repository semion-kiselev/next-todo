export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ background: "lightseagreen", height: "50%" }}>{children}</div>
  );
}
