const CORES = ['fogo', 'agua', 'terra', 'ar', 'luz', 'sombra']

export default function Emblem({ size = 72 }: { size?: number }) {
  const c = size / 2
  const r = size / 2 - 2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="emblem"
    >
      {CORES.map((cor, i) => {
        const a1 = ((-90 + 60 * i) * Math.PI) / 180
        const a2 = ((-90 + 60 * (i + 1)) * Math.PI) / 180
        const d = `M${c} ${c}L${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)}L${c + r * Math.cos(a2)} ${c + r * Math.sin(a2)}Z`
        return <path key={cor} d={d} style={{ fill: `var(--${cor})` }} />
      })}
    </svg>
  )
}
