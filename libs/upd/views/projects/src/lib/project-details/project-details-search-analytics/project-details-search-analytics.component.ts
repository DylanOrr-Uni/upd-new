import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ColumnConfig } from '@dua-upd/upd-components';
import { LocaleId } from '@dua-upd/upd/i18n';
import { I18nFacade } from '@dua-upd/upd/state';
import { EN_CA } from '@dua-upd/upd/i18n';
import { GetTableProps } from '@dua-upd/utils-common';
import { ProjectsDetailsFacade } from '../+state/projects-details.facade';

type VisitsByPageColTypes = GetTableProps<
  ProjectDetailsSearchAnalyticsComponent,
  'visitsByPage$'
>;

@Component({
  selector: 'upd-project-details-search-analytics',
  templateUrl: './project-details-search-analytics.component.html',
  styleUrls: ['./project-details-search-analytics.component.css'],
})
export class ProjectDetailsSearchAnalyticsComponent implements OnInit {
  currentLang!: LocaleId;
  currentLang$ = this.i18n.currentLang$;
  langLink = 'en';

  gscTotalClicks$ = this.projectsDetailsService.gscTotalClicks$;

  gscTotalImpressions$ = this.projectsDetailsService.gscTotalImpressions$;
  gscTotalImpressionsPercentChange$ =
    this.projectsDetailsService.gscTotalImpressionsPercentChange$;

  gscTotalCtr$ = this.projectsDetailsService.gscTotalCtr$;
  gscTotalPosition$ = this.projectsDetailsService.gscTotalPosition$;

  visitsByPage$ =
    this.projectsDetailsService.visitsByPageGSCWithPercentChange$.pipe(
      map(
        (visitsByPage) =>
          visitsByPage &&
          visitsByPage.sort(
            (a: { gscTotalClicks?: number }, b: { gscTotalClicks?: number }) =>
              (b.gscTotalClicks || 0) - (a.gscTotalClicks || 0)
          )
      )
    );
  visitsByPageCols: ColumnConfig<VisitsByPageColTypes>[] = [];

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
        },
        // { field: '0', header: this.i18n.service.translate('comparison-for-clicks', lang), pipe: 'percent' },
        {
          field: 'percentChange',
          header: this.i18n.service.translate('comparison-for-clicks', lang),
          type: 'comparison',
          pipe: 'percent',
        },
      ];
    });
  }

  constructor(
    private readonly projectsDetailsService: ProjectsDetailsFacade,
    private i18n: I18nFacade
  ) {}
}
