import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CovidService } from './../services/covid.service';
import { CurrentComponent } from './current.component';

describe('CurrentComponent', () => {
  let component: CurrentComponent;
  let fixture: ComponentFixture<CurrentComponent>;

  beforeEach(() => {
    const covidServiceStub = () => ({
      getAllData: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CurrentComponent],
      providers: [{ provide: CovidService, useFactory: covidServiceStub }]
    });
    fixture = TestBed.createComponent(CurrentComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dataLoaded has default value`, () => {
    expect(component.dataLoaded).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getLatestData').and.callThrough();
      component.ngOnInit();
      expect(component.getLatestData).toHaveBeenCalled();
    });
  });

  describe('getLatestData', () => {
    it('makes expected calls', () => {
      const covidServiceStub: CovidService = fixture.debugElement.injector.get(
        CovidService
      );
      spyOn(covidServiceStub, 'getAllData').and.callThrough();
      component.getLatestData();
      expect(covidServiceStub.getAllData).toHaveBeenCalled();
    });
  });
});
