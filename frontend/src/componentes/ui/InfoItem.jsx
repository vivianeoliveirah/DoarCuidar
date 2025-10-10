export default function InfoItem({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700" role="listitem">
      {Icon ? <Icon className="w-4 h-4" aria-hidden="true" /> : null}
      <span>{children}</span>
    </div>
  );
}
