import { Page, PageMetrics, Task } from '@cra-arc/db';
import type { GscSearchTermMetrics } from '@cra-arc/db';

export {
  Page,
  PageMetrics,
  Overall,
  CallDriver,
  UxTest,
  Task,
  Project,
} from '@cra-arc/db';

export type {
  PageDocument,
  PageMetricsDocument,
  PageMetricsModel,
  OverallDocument,
  CallDriverDocument,
  UxTestDocument,
  TaskDocument,
  ProjectDocument,
  GscSearchTermMetrics,
} from '@cra-arc/db';

export interface ViewData<T> {
  dateRange: string;
  comparisonDateRange?: string;
  dateRangeData?: T;
  comparisonDateRangeData?: T;
}

export interface EntityDetailsData<T> extends ViewData<T> {
  _id: string;
  title: string;
}

export type PagesHomeAggregatedData = Pick<Page, 'url' | 'title'> & { visits: number };
export type PagesHomeData = ViewData<PagesHomeAggregatedData[]>;

export type PageDetailsMetrics = Pick<
  PageMetrics,
  | 'visits'
  | 'visitors'
  | 'views'
  | 'visits_device_other'
  | 'visits_device_desktop'
  | 'visits_device_mobile'
  | 'visits_device_tablet'
  | 'average_time_spent'
  // | 'num_searches_internal' // todo: to be added
>;

export interface PageAggregatedData extends PageDetailsMetrics {
  visitsByDay: { date: Date; visits: number }[];
}

export interface PageDetailsData extends EntityDetailsData<PageAggregatedData> {
  url: string;
  topSearchTermsIncrease?: GscSearchTermMetrics[];
  topSearchTermsDecrease?: GscSearchTermMetrics[];
  tasks?: Task[];
}

export interface OverviewAggregatedData {
  visitors: number;
  visits: number;
  pageViews: number;
  impressions: number;
  ctr: number;
  avgRank: number;
  visitsByDay: { date: Date; visits: number }[];
}

export type OverviewData = ViewData<OverviewAggregatedData>;
