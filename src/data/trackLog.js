import Papa from 'papaparse'
import csvText from './track-log.csv?raw'

const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true })

export const trackLog = parsed.data.map(row => ({
  date: row['Date'],
  type: row['Type']?.trim(),
  track: row['Track'],
  car: row['Car'],
  laps: parseInt(row['Laps']) || 0,
  distance: parseFloat(row['Total Distance (mi)']) || 0,
  fastestLap: row['Fastest Lap']?.trim() || null,
  maxSpeed: parseFloat(row['Max Speed']) || null,
  racePos: row['Race Pos'] === '--' || !row['Race Pos']?.trim()
    ? null
    : row['Race Pos']?.trim() === 'DNF'
      ? 'DNF'
      : parseInt(row['Race Pos']) || null,
  notes: row['Notes']?.trim() || null,
}))

export const stats = {
  totalLaps: trackLog.reduce((sum, r) => sum + r.laps, 0),
  totalDistance: Math.round(trackLog.reduce((sum, r) => sum + r.distance, 0)),
  totalRaces: trackLog.filter(r => r.type === 'Race').length,
  podiums: trackLog.filter(
    r => r.type === 'Race' && typeof r.racePos === 'number' && r.racePos <= 3
  ).length,
}
