export default function Breadcrumb() {
  return (
    <nav>
      <ol className="flex gap-2 text-xs mb-2">
        <li>Home</li>
        <li>/</li>
        <li>Contact</li>
      </ol>
      <div className="text-3xl font-bold">Dashboard</div>
    </nav>
  );
}
