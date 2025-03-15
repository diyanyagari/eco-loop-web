export default function ItemDecription({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div suppressHydrationWarning className="flex flex-col">
      <div suppressHydrationWarning className="text-xs font-medium">
        {title}
      </div>
      <div suppressHydrationWarning>{value}</div>
    </div>
  );
}
