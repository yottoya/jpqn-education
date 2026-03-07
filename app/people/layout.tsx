export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-32 p-12">
      <h1 className="pl-6 p-6 m-6 text-4xl">People</h1>
      {children}
    </div>
  );
}
