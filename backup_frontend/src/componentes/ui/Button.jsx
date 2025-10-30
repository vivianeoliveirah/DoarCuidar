export default function Button({ variant="brand", size="md", className="", ...props }) {
  const v = {
    brand: "btn-brand",
    outline: "btn-outline",
    dark: "btn-dark",
    danger: "btn-danger",
  }[variant] || "btn-brand";
  const s = { sm:"btn-sm", md:"btn-md", lg:"btn-lg" }[size] || "btn-md";
  return <button className={`${v} ${s} ${className}`} {...props} />;
}
