export default function IconBadge({
  Icon,
  color = "#4F46E5",
  backgroundColor = "#F3F1FF",
  size = 40,
  iconSize = 20,
  className = "",
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-[10px] ${className}`}
      style={{ width: size, height: size, backgroundColor }}
    >
      <Icon size={iconSize} style={{ color }} />
    </span>
  );
}
