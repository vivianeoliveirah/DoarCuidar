export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-600 bg-brand-600 hover:bg-brand-700 focus:ring-brand-600",
    secondary: "bg-white border text-blue-700 border-blue-600 hover:bg-blue-50 focus:ring-blue-600 text-brand-700 border-brand-600 hover:bg-brand-50 focus:ring-brand-600",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-blue-600 focus:ring-brand-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    ghost: "text-blue-700 hover:bg-blue-50 focus:ring-blue-600 text-brand-700 hover:bg-brand-50 focus:ring-brand-600",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
