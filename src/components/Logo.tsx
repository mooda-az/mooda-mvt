type Props = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className = "", inverted = false }: Props) {
  return (
    <span
      className={`inline-flex select-none items-baseline font-display font-extrabold leading-none tracking-[-0.055em] ${
        inverted ? "text-on-primary" : "text-primary"
      } ${className}`}
      translate="no"
    >
      <span>mooda</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[0.22em] w-[0.22em] shrink-0 rounded-full bg-secondary" />
    </span>
  );
}
