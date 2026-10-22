import { useMemo } from 'react'

/** Estrelas, brasas e montanhas que dão o clima de fantasia. Puro CSS, sem libs. */
export default function Atmosphere({ montanhas = 300, brasas = 14 }: { montanhas?: number; brasas?: number }) {
  const lista = useMemo(
    () =>
      Array.from({ length: brasas }, (_, i) => ({
        left: 4 + ((i * 37) % 92),
        delay: (i * 1.3) % 10,
        dur: 8 + ((i * 7) % 6),
      })),
    [brasas],
  )
  return (
    <div className="atmo" aria-hidden="true">
      <div className="stars" />
      {lista.map((b, i) => (
        <i
          key={i}
          className="em"
          style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}
        />
      ))}
      {montanhas > 0 && (
        <svg className="mtn" viewBox="0 0 1280 360" preserveAspectRatio="none" style={{ height: montanhas }}>
          <path d="M0 120L110 60L230 150L340 90L460 190L560 250L640 270L720 250L820 180L940 80L1060 150L1170 70L1280 130V360H0Z" style={{ fill: 'var(--m1)' }} />
          <path d="M0 200L120 150L260 230L400 190L520 270L640 300L760 270L900 200L1040 250L1160 170L1280 220V360H0Z" style={{ fill: 'var(--m2)' }} />
          <path d="M0 280L160 250L320 300L480 285L640 330L800 290L960 310L1120 270L1280 300V360H0Z" style={{ fill: 'var(--m3)' }} />
        </svg>
      )}
    </div>
  )
}
