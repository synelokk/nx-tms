export interface ILoggerData {
  logSid: string;
  type: 'ERROR' | 'INFO' | 'DEBUG' | 'WARN';
  clientId: string;
  serviceId: string;
  message: string;
  detail?: string;
  code?: string;
}
