import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ColumnConfig } from '@dua-upd/upd-components';
import { LocaleId } from '@dua-upd/upd/i18n';
import { I18nFacade } from '@dua-upd/upd/state';
import { GetTableProps } from '@dua-upd/utils-common';
import { PagesDetailsFacade } from '../+state/pages-details.facade';

type VisitorLocationColTypes = GetTableProps<
  PagesDetailsWebtrafficComponent,
  'visitorLocation$'
>;
type BarTableColTypes = GetTableProps<
  PagesDetailsWebtrafficComponent,
  'barTable$'
>;

@Component({
  selector: 'upd-page-details-webtraffic',
  templateUrl: './pages-details-webtraffic.component.html',
  styleUrls: ['./pages-details-webtraffic.component.css'],
})
export class PagesDetailsWebtrafficComponent implements OnInit {
  currentLang!: LocaleId;
  currentLang$ = this.i18n.currentLang$;

  visitsByDay$ = this.pageDetailsService.visitsByDay$;

  visitorLocation$ = this.pageDetailsService.visitorLocation$;

  visitorLocationCols: ColumnConfig<VisitorLocationColTypes>[] = [];

  barTable$ = this.pageDetailsService.barTable$;
  barTableCols: ColumnConfig<BarTableColTypes>[] = [];

  dateRangeLabel$ = this.pageDetailsService.dateRangeLabel$;
  comparisonDateRangeLabel$ = this.pageDetailsService.comparisonDateRangeLabel$;

  ngOnInit() {
    this.i18n.service.onLangChange(({ lang }) => {
      this.currentLang = lang as LocaleId;
    });

    combineLatest([
      this.currentLang$,
      this.dateRangeLabel$,
      this.comparisonDateRangeLabel$,
    ]).subscribe(([lang, dateRange, comparisonDateRange]) => {
      this.visitorLocationCols = [
        {
          field: 'province',
          header: this.i18n.service.translate('province', lang),
          filterConfig: {
            type: 'category',
            categories: [
              {
                name: this.i18n.service.translate('Alberta', lang),
                value: 'Alberta',
              },
              {
                name: this.i18n.service.translate('Brithish Columbia', lang),
                value: 'Brithish Columbia',
              },
              {
                name: this.i18n.service.translate('Manitoba', lang),
                value: 'Manitoba',
              },
              {
                name: this.i18n.service.translate('New Brunswick', lang),
                value: 'New Brunswick',
              },
              {
                name: this.i18n.service.translate(
                  'Newfoundland and Labrador',
                  lang
                ),
                value: 'Newfoundland and Labrador',
              },
              {
                name: this.i18n.service.translate(
                  'Northwest Territories',
                  lang
                ),
                value: 'Northwest Territories',
              },
              {
                name: this.i18n.service.translate('Nova Scotia', lang),
                value: 'Nova Scotia',
              },
              {
                name: this.i18n.service.translate('Nunavut', lang),
                value: 'Nunavut',
              },
              {
                name: this.i18n.service.translate('Ontario', lang),
                value: 'Ontario',
              },
              {
                name: this.i18n.service.translate('Outside Canada', lang),
                value: 'Outside Canada',
              },
              {
                name: this.i18n.service.translate('Prince Edward Island', lang),
                value: 'Prince Edward Island',
              },
              {
                name: this.i18n.service.translate('Quebec', lang),
                value: 'Quebec',
              },
              {
                name: this.i18n.service.translate('Saskatchewan', lang),
                value: 'Saskatchewan',
              },
              {
                name: this.i18n.service.translate('Yukon', lang),
                value: 'Yukon',
              },
            ],
          },
        },
        {
          field: 'value',
          header: this.i18n.service.translate('visits', lang),
          pipe: 'number',
          filterConfig: {
            type: 'number',
          },
        },
        {
          field: 'change',
          header: this.i18n.service.translate('comparison', lang),
          pipe: 'percent',
        },
      ];

      this.barTableCols = [
        { field: 'name', header: this.i18n.service.translate('Dates', lang) },
        {
          field: 'currValue',
          header: this.i18n.service.translate('Visits for ', lang, {
            value: dateRange,
          }),
          pipe: 'number',
        },
        {
          field: 'prevValue',
          header: this.i18n.service.translate('Visits for ', lang, {
            value: comparisonDateRange,
          }),
          pipe: 'number',
        },
      ];
    });
  }

  constructor(
    private pageDetailsService: PagesDetailsFacade,
    private i18n: I18nFacade
  ) {}
}
