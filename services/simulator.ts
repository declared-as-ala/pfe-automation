import { ZoneId } from '../types/maintenance';
import { ZONE_CONFIGS, ZONE_IDS } from '../constants/zones';

// Development simulation — triggers fake CALL:Zx events
// This replaces hardware for testing the full app flow without an ESP32.

type SimulatedCallHandler = (zoneId: ZoneId) => void;

let handler: SimulatedCallHandler | null = null;
let autoSimInterval: ReturnType<typeof setInterval> | null = null;

export function registerSimulatorHandler(fn: SimulatedCallHandler): void {
  handler = fn;
}

export function unregisterSimulatorHandler(): void {
  handler = null;
}

export function simulateCall(zoneId: ZoneId): void {
  if (!handler) {
    console.warn('[Simulator] No handler registered');
    return;
  }
  console.log(`[Simulator] Triggering CALL:${zoneId}`);
  handler(zoneId);
}

export function simulateRandomCall(): void {
  const randomZone = ZONE_IDS[Math.floor(Math.random() * ZONE_IDS.length)];
  simulateCall(randomZone);
}

// Auto-simulation: trigger random calls on interval (for stress testing)
export function startAutoSimulation(intervalMs = 15000): void {
  if (autoSimInterval) return;
  autoSimInterval = setInterval(simulateRandomCall, intervalMs);
  console.log(`[Simulator] Auto-simulation started (every ${intervalMs}ms)`);
}

export function stopAutoSimulation(): void {
  if (autoSimInterval) {
    clearInterval(autoSimInterval);
    autoSimInterval = null;
    console.log('[Simulator] Auto-simulation stopped');
  }
}

// Parse raw LoRa message from ESP32 serial format
// Input: "CALL:Z1" → ZoneId "Z1"
export function parseLoraMessage(raw: string): ZoneId | null {
  const match = raw.trim().match(/^CALL:(Z[1-4])$/);
  if (!match) return null;
  const zoneId = match[1] as ZoneId;
  return ZONE_CONFIGS[zoneId] ? zoneId : null;
}

export const SimulatorService = {
  registerSimulatorHandler,
  unregisterSimulatorHandler,
  simulateCall,
  simulateRandomCall,
  startAutoSimulation,
  stopAutoSimulation,
  parseLoraMessage,
};
