type VisualPlaceholderProps = {
  code: string;
  label: string;
  className?: string;
};

export function VisualPlaceholder({ code, label, className = "" }: VisualPlaceholderProps) {
  return (
    <div className={`visual-placeholder ${className}`} aria-label={`${label}, concept visual pending`}>
      <div className="visual-placeholder__grid" aria-hidden="true" />
      <div className="visual-placeholder__signal" aria-hidden="true" />
      <div className="visual-placeholder__frame" aria-hidden="true" />
      <span className="visual-placeholder__code">{code}</span>
      <span className="visual-placeholder__label">Concept visual / {label}</span>
    </div>
  );
}
