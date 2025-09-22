export default function InfoItem({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      {Icon ? <Icon className="w-4 h-4" aria-hidden /> : null}
      <span>{children}</span>
    </div>
  );
}
