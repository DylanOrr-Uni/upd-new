import { Component } from '@angular/core';
import { PagesDetailsFacade } from '../+state/pages-details.facade';

//import { TranslateService } from '@ngx-translate/core';
import { EN_CA, LocaleId } from '@cra-arc/upd/i18n';
import { ColumnConfig } from '@cra-arc/upd-components';
import { I18nFacade } from '@cra-arc/upd/state';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-page-details-summary',
  templateUrl: './pages-details-summary.component.html',
  styleUrls: ['./pages-details-summary.component.css'],
})
export class PagesDetailsSummaryComponent {
  currentLang!: LocaleId;
  currentLang$ = this.i18n.currentLang$;

  data$ = this.pageDetailsService.pagesDetailsData$;
  error$ = this.pageDetailsService.error$;

  url$ = this.pageDetailsService.pageUrl$;

  visitors$ = this.pageDetailsService.visitors$;
  visitorsPercentChange$ = this.pageDetailsService.visitorsPercentChange$;

  visits$ = this.pageDetailsService.visits$;
  visitsPercentChange$ = this.pageDetailsService.visitsPercentChange$;

  pageViews$ = this.pageDetailsService.pageViews$;
  pageViewsPercentChange$ = this.pageDetailsService.pageViewsPercentChange$;

  visitsByDay$ = this.pageDetailsService.visitsByDay$;

  visitsByDeviceType$ = this.pageDetailsService.visitsByDeviceType$;

  topSearchTermsIncrease$ = this.pageDetailsService.topSearchTermsIncrease$;

  topSearchTermsDecrease$ = this.pageDetailsService.topSearchTermsDecrease$;

  constructor(
    private pageDetailsService: PagesDetailsFacade,
    //public translateService: TranslateService,
    private i18n: I18nFacade
  ) {}

  topSearchTermsCols: ColumnConfig[] = [];

  ngOnInit() {
    this.i18n.service.onLangChange(({ lang }) => {
      this.currentLang = lang as LocaleId;
    });

    combineLatest([
      this.currentLang$
    ]).subscribe(([lang]) => {
      this.topSearchTermsCols = [
        { field: 'term', header: this.i18n.service.translate('search-term', lang) },
        { field: 'change', header: this.i18n.service.translate('comparison', lang) },
        { field: 'impressions', header: this.i18n.service.translate('impressions', lang) },
        { field: 'ctr', header: this.i18n.service.translate('ctr', lang) },
        { field: 'position', header: this.i18n.service.translate('position', lang) },
      ];
    });
  }
}
