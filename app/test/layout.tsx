export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-15">
      <div className="bg-red-600 pt-24 pl-15 pb-15">
        {children}
        <h1>Test</h1>
      </div>
    </div>
  );
}
