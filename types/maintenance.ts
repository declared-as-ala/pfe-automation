export type ZoneId = 'Z1' | 'Z2' | 'Z3' | 'Z4';

export type ZoneStatus = 'OK' | 'CALL' | 'PENDING_ACK';

export type ConnectionMode = 'auto' | 'local' | 'cloud';

export type ConnectionStatus = 'online' | 'offline' | 'local' | 'connecting';

export type CallSource = 'esp32' | 'simulation' | 'mqtt' | 'api';

export type CallEventStatus = 'acknowledged' | 'pending';

export interface Zone {
  id: ZoneId;
  name: string;
  label: string; // French label
  status: ZoneStatus;
  lastCallAt: string | null;
  acknowledgedAt: string | null;
}

export interface CallEvent {
  id: string;
  zone: ZoneId;
  zoneName: string;
  startedAt: string;
  acknowledgedAt: string | null;
  durationSeconds: number | null;
  status: CallEventStatus;
  source: CallSource;
  createdAt: string;
  pendingSync: boolean;
}

export interface AppSettings {
  wifiSsid: string;
  esp32IpAddress: string;
  backendApiUrl: string;
  mqttBrokerUrl: string;
  notificationsEnabled: boolean;
  alertSound: string;
  pushToken: string | null;
  connectionMode: ConnectionMode;
  simulationMode: boolean;
}

export interface SystemStatus {
  connection: ConnectionStatus;
  lastSync: string | null;
  activeCallCount: number;
  pushNotificationsActive: boolean;
}

// LoRa/ESP32 raw payload from receiver
export interface Esp32CallPayload {
  zone: ZoneId;
  timestamp: string;
}

// Acknowledgement payload sent to ESP32
export interface AckPayload {
  zone: ZoneId | 'ALL';
  acknowledgedBy: 'mobile-app';
  timestamp: string;
}

// MQTT message structure
export interface MqttMessage {
  topic: 'maintenance/call' | 'maintenance/ack';
  payload: Esp32CallPayload | AckPayload;
}
