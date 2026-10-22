export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`orn ${className}`} aria-hidden="true">
      <i />◆<i />
    </div>
  )
}
