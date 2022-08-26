import { Component, OnInit } from '@angular/core';
import { ColumnConfig } from '@dua-upd/upd-components';
import { LocaleId } from '@dua-upd/upd/i18n';
import { I18nFacade } from '@dua-upd/upd/state';
import { combineLatest } from 'rxjs';
import { TasksDetailsFacade } from '../+state/tasks-details.facade';
import { EN_CA } from '@dua-upd/upd/i18n';

@Component({
  selector: 'upd-task-details-search-analytics',
  templateUrl: './task-details-search-analytics.component.html',
  styleUrls: ['./task-details-search-analytics.component.css'],
})
export class TaskDetailsSearchAnalyticsComponent implements OnInit {
  currentLang!: LocaleId;
  currentLang$ = this.i18n.currentLang$;
  langLink = 'en';

  gscTotalClicks$ = this.taskDetailsService.gscTotalClicks$;

  gscTotalImpressions$ = this.taskDetailsService.gscTotalImpressions$;
  gscTotalImpressionsPercentChange$ =
    this.taskDetailsService.gscTotalImpressionsPercentChange$;
  gscTotalCtr$ = this.taskDetailsService.gscTotalCtr$;
  gscTotalCtrPercentChange$ = this.taskDetailsService.gscTotalCtrPercentChange$;
  gscTotalPosition$ = this.taskDetailsService.gscTotalPosition$;
  gscTotalPositionPercentChange$ =
    this.taskDetailsService.gscTotalPositionPercentChange$;

  visitsByPage$ = this.taskDetailsService.visitsByPageGSCWithPercentChange$;
  visitsByPageCols: ColumnConfig[] = [];

  ngOnInit(): void {
    this.i18n.service.onLangChange(({ lang }) => {
      this.currentLang = lang as LocaleId;
    });

    this.currentLang$.subscribe((lang) => {
      this.langLink = lang === EN_CA ? 'en' : 'fr';
      this.visitsByPageCols = [
        {
          field: 'url',
          header: this.i18n.service.translate('URL', lang),
          type: 'link',
          typeParams: { preLink: '/' + this.langLink + '/pages', link: '_id' },
          filterConfig: {
            type: 'text',
          },
        },
        {
          field: 'gscTotalClicks',
          header: this.i18n.service.translate('clicks', lang),
          pipe: 'number',
          type: 'link',
          typeParams: {
            preLink: '/' + this.langLink + '/pages',
            link: '_id',
            postLink: 'searchanalytics',
          },
          filterConfig: {
            type: 'number',
          },
        },
        {
          field: 'gscTotalImpressions',
          header: this.i18n.service.translate('impressions', lang),
          pipe: 'number',
          type: 'link',
          typeParams: {
            preLink: '/' + this.langLink + '/pages',
            link: '_id',
            postLink: 'searchanalytics',
          },
          filterConfig: {
            type: 'number',
          },
        },
        {
          field: 'gscTotalCtr',
          header: this.i18n.service.translate('ctr', lang),
          pipe: 'percent',
          filterConfig: {
            type: 'percent',
          },
        },
        {
          field: 'gscTotalPosition',
          header: this.i18n.service.translate('position', lang),
          pipe: 'number',
          filterConfig: {
            type: 'number',
          },
        },
        // { field: 'percentChange', header: this.i18n.service.translate('comparison-for-clicks', lang), pipe: 'percent' },
      ];
    });
  }

  constructor(
    private readonly taskDetailsService: TasksDetailsFacade,
    private i18n: I18nFacade
  ) {}
}
