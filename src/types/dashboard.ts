// Contact Form Types
export interface ContactForm {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  query: string;
  status: "new" | "in-progress" | "completed" | "archived";
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactFormStats {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  archived: number;
}

export interface QueriesData {
  forms: ContactForm[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: ContactFormStats;
}

// User Types
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

// Chart Types
export interface ChartDataPoint {
  date: string;
  displayDate: string;
  [key: string]: string | number;
}

export interface TooltipPayload<T = Record<string, unknown>> {
  color: string;
  name: string;
  value: number;
  dataKey?: string;
  payload: T;
}

export interface CustomTooltipProps<T = Record<string, unknown>> {
  active?: boolean;
  payload?: TooltipPayload<T>[];
  label?: string;
}

// Company Chart Types
export interface CompanyData {
  name: string;
  shortName: string;
  queries: number;
  color: string;
  growth: number;
  lastQuery: number;
}

// Response Time Types
export interface ResponseTimeData {
  date: string;
  displayDate: string;
  avgResponseTime: number;
  queries: number;
  under1Hour: number;
  under4Hours: number;
  under24Hours: number;
  over24Hours: number;
}

// Analytics Types
export interface AnalyticsStats {
  totalQueries: number;
  avgResponseTime: number;
  conversionRate: number;
  uniqueCompanies: number;
  responseRate: number;
  satisfaction: number;
  weeklyGrowth: number;
  monthlyGoalProgress: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Search Params Types
export interface QueriesSearchParams {
  page?: string;
  status?: string;
  search?: string;
  limit?: string;
}

// Filter Types
export type StatusFilter =
  | "all"
  | "new"
  | "in-progress"
  | "completed"
  | "archived";
export type TimeRange = "7d" | "30d" | "90d";
export type ChartType = "line" | "bar" | "area" | "pie";

// Bulk Operations Types
export interface BulkOperationProps {
  selectedIds: string[];
  onClearSelection: () => void;
  onRefresh: () => void;
}

// Export Types
export type ExportFormat = "csv" | "json";

export interface ExportParams {
  format: ExportFormat;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}
