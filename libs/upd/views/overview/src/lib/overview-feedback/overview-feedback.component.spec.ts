import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import {
  dateSelectionReducer,
  I18nFacade,
  i18nReducer,
} from '@dua-upd/upd/state';
import { I18nModule } from '@dua-upd/upd/i18n';
import { OverviewFeedbackComponent } from './overview-feedback.component';
import { OverviewFacade } from '../+state/overview/overview.facade';
import {
  OVERVIEW_FEATURE_KEY,
  overviewReducer,
} from '../+state/overview/overview.reducer';
import { OverviewRoutingModule } from '../overview-routing.module';
import { UpdComponentsModule } from '@dua-upd/upd-components';

import '@angular/localize/init';

describe('OverviewFeedbackComponent', () => {
  let component: OverviewFeedbackComponent;
  let fixture: ComponentFixture<OverviewFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        I18nModule.forRoot(),
        StoreModule.forRoot({
          dateSelection: dateSelectionReducer,
          router: routerReducer,
          i18n: i18nReducer,
        }),
        StoreModule.forFeature(OVERVIEW_FEATURE_KEY, overviewReducer),
        OverviewRoutingModule,
        UpdComponentsModule,
      ],
      declarations: [OverviewFeedbackComponent],
      providers: [I18nFacade, OverviewFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
