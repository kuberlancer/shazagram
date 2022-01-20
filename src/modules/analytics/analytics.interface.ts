export interface IAnalyticsService {
  event(userId: number, category: string, action: string, label?: string): void;
}
