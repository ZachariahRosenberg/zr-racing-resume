import { useState } from 'react'
import { createPortal } from 'react-dom'
import { profile, achievements, credentials, cars, tracks, raceHighlights } from './data/resume'
import { stats } from './data/trackLog'

const base = import.meta.env.BASE_URL

const HEADSHOT = `${base}images/FA597767-00CE-4C1E-903B-9959FEF8F629_1_105_c.jpeg`
const HERO_BANNER = `${base}images/8.3.24 Member Challenge Race-6275.jpg`

const galleryPhotos = [
  { src: `${base}images/IMG_4420.jpg`, alt: 'P1 podium at Monticello Motor Club' },
  { src: `${base}images/_B2A6554-X4.jpg`, alt: 'Night endurance racing at NJMP' },
  { src: `${base}images/4.25.25 Queally Mazda Classic-05133.jpg`, alt: 'Queally Mazda Classic at Lime Rock' },
  { src: `${base}images/8.3.24 Member Challenge Race-7009.jpg`, alt: 'Member Challenge Race at Monticello' },
  { src: `${base}images/IMG_4395.jpg`, alt: 'Ready to race' },
  { src: `${base}images/PXL_20260301_000639456.jpg`, alt: 'WRL at Barber Motorsports Park' },
]

const CAR_IMAGES = {
  'Mazda Miata NB': `${base}images/cars/mazda_nb.png`,
  'Porsche GT3': `${base}images/cars/porsche_gt3.png`,
  'BMW E46': `${base}images/cars/bmw_e46.png`,
  'Porsche Cayman': `${base}images/cars/porsche_caymen.png`,
  'BMW E36': `${base}images/cars/bmw_e36.png`,
}

function ordinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return n + 'th'
  switch (n % 10) {
    case 1: return n + 'st'
    case 2: return n + 'nd'
    case 3: return n + 'rd'
    default: return n + 'th'
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr) {
  const [month, day] = dateStr.split('/')
  return `${MONTHS[parseInt(month) - 1]} ${day}`
}

function StatItem({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
    </div>
  )
}

function HeroBanner() {
  return (
    <div className="w-full h-56 md:h-80 overflow-hidden">
      <img
        src={HERO_BANNER}
        alt="Racing at Monticello Motor Club"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function Headshot() {
  return (
    <div
      className="w-full aspect-[3/4] bg-gray-100 rounded-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${HEADSHOT})` }}
      role="img"
      aria-label={profile.name}
    />
  )
}

function NameBlock() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
        {profile.name}
      </h1>
      <p className="mt-3 text-gray-600 leading-relaxed">
        {profile.tagline}
      </p>
    </div>
  )
}

function StatsRow() {
  return (
    <div className="flex justify-start gap-10">
      <StatItem value={stats.totalLaps.toLocaleString()} label="Laps" />
      <StatItem value={stats.totalRaces} label="Races" />
      <StatItem value={stats.podiums} label="Podiums" />
    </div>
  )
}



function CredentialsList() {
  return (
    <div>
      <p className="font-medium text-gray-700 text-sm mb-2">Credentials</p>
      <ul className="space-y-1">
        {credentials.map((c, i) => (
          <li key={i} className="text-sm text-gray-500">{c}</li>
        ))}
      </ul>
    </div>
  )
}

function CarsList() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Cars</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {cars.map((car, i) => (
          <div key={i} className="text-center">
            <div className="h-14 flex items-end justify-center px-1">
              {CAR_IMAGES[car.name] && (
                <img
                  src={CAR_IMAGES[car.name]}
                  alt={car.name}
                  className="max-h-full w-auto object-contain opacity-70"
                />
              )}
            </div>
            <div className="text-sm font-medium text-gray-700 mt-2">{car.name}</div>
            <div className="text-xs text-gray-400">{car.laps.toLocaleString()} laps</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarGallery() {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {galleryPhotos.map((photo, i) => (
          <div
            key={i}
            className="aspect-[4/3] overflow-hidden rounded cursor-pointer"
            onClick={() => setSelected(photo)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      {selected && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>,
        document.body
      )}
    </>
  )
}

function Achievements() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
      {achievements.map((a, i) => (
        <div key={i} className="mb-3">
          <div className="font-medium text-gray-900">{a.title}</div>
          <div className="text-sm text-gray-500 italic">{a.subtitle}</div>
        </div>
      ))}
    </div>
  )
}

function TrackExperience() {
  const maxLaps = Math.max(...tracks.map(t => t.laps))
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Tracks</h2>
      <div className="space-y-2">
        {tracks.map((track, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm text-gray-700 w-40 flex-shrink-0 truncate">{track.name}</span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-300 rounded-full"
                style={{ width: `${(track.laps / maxLaps) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-12 text-right flex-shrink-0">{track.laps}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SanctionChip({ sanction }) {
  if (!sanction) return null
  const colors = {
    SCCA: 'bg-blue-50 text-blue-700',
    WRL: 'bg-emerald-50 text-emerald-700',
    MMC: 'bg-amber-50 text-amber-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[sanction] || 'bg-gray-100 text-gray-600'}`}>
      {sanction}
    </span>
  )
}

function EventTypeChip({ type }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      {type}
    </span>
  )
}

function ClassTag({ cls }) {
  if (!cls) return null
  return (
    <span className="text-xs px-1.5 py-0.5 rounded border border-gray-200 text-gray-500 font-mono">
      {cls}
    </span>
  )
}

function HighlightRow({ result }) {
  const isPodium = result.position <= 3
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="flex items-center gap-2 min-w-0 flex-wrap">
        <span className="text-sm text-gray-400 w-12 flex-shrink-0">{formatDate(result.date)}</span>
        <SanctionChip sanction={result.sanction} />
        <EventTypeChip type={result.eventType} />
        <span className="text-sm text-gray-700">{result.track}</span>
        <ClassTag cls={result.class} />
      </div>
      <span
        className={`text-sm whitespace-nowrap flex-shrink-0 ${
          isPodium ? 'font-bold text-gray-900' : 'text-gray-400'
        }`}
      >
        {ordinal(result.position)} place
      </span>
    </div>
  )
}

function RecentHighlights() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Highlights</h2>
      {raceHighlights.map(({ year, results }) => (
        <div key={year} className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">{year}</h3>
          <div className="divide-y divide-gray-100">
            {results.map((r, i) => (
              <HighlightRow key={i} result={r} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 mt-8 text-sm text-gray-400">
      <p>&copy; {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="space-y-6 md:sticky md:top-6 md:self-start">
            <Headshot />
            {/* Mobile only: show name + stats inline after headshot */}
            <div className="md:hidden space-y-6">
              <NameBlock />
              <StatsRow />
            </div>
            <CredentialsList />
            <SidebarGallery />
          </aside>

          {/* Main content */}
          <div className="space-y-10">
            {/* Desktop only: name + stats at top of main column */}
            <div className="hidden md:block space-y-8">
              <NameBlock />
              <StatsRow />
            </div>
            <Achievements />
            <RecentHighlights />
            <TrackExperience />
            <CarsList />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
