import { ZoneId, Zone } from '../types/maintenance';

export const ZONE_CONFIGS: Record<ZoneId, { name: string; label: string; color: string }> = {
  Z1: { name: 'Zone 1', label: 'Zone 1 — Ligne A', color: '#3B82F6' },
  Z2: { name: 'Zone 2', label: 'Zone 2 — Ligne B', color: '#8B5CF6' },
  Z3: { name: 'Zone 3', label: 'Zone 3 — Atelier C', color: '#F59E0B' },
  Z4: { name: 'Zone 4', label: 'Zone 4 — Stockage', color: '#06B6D4' },
};

export const ZONE_IDS: ZoneId[] = ['Z1', 'Z2', 'Z3', 'Z4'];

export const INITIAL_ZONES: Zone[] = ZONE_IDS.map((id) => ({
  id,
  name: ZONE_CONFIGS[id].name,
  label: ZONE_CONFIGS[id].label,
  status: 'OK',
  lastCallAt: null,
  acknowledgedAt: null,
}));
