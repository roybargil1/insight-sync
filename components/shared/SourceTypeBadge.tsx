export function getSourceType(item: { source_type?: string | null }) {
  return item.source_type === "External" ? "External" : "Internal";
}

export default function SourceTypeBadge({ sourceType }: { sourceType: string }) {
  if (!sourceType) return null;
  const isInternal = sourceType === "Internal";
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${
        isInternal
          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
          : "bg-teal-50 text-teal-700 border-teal-200"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isInternal ? "bg-indigo-500" : "bg-teal-500"}`} />
      {isInternal ? "Internal" : "External Pulse"}
    </span>
  );
}
