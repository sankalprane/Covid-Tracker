import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CovidService } from '../services/covid.service';
import { OverallComponent } from './overall.component';

describe('OverallComponent', () => {
  let component: OverallComponent;
  let fixture: ComponentFixture<OverallComponent>;

  beforeEach(() => {
    const covidServiceStub = () => ({
      getHistData: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OverallComponent],
      providers: [{ provide: CovidService, useFactory: covidServiceStub }]
    });
    fixture = TestBed.createComponent(OverallComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dataLoaded has default value`, () => {
    expect(component.dataLoaded).toEqual(false);
  });

  it(`dates has default value`, () => {
    expect(component.dates).toEqual([]);
  });

  it(`cases has default value`, () => {
    expect(component.cases).toEqual([]);
  });

  it(`recovered has default value`, () => {
    expect(component.recovered).toEqual([]);
  });

  it(`deaths has default value`, () => {
    expect(component.deaths).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onCreate').and.callThrough();
      component.ngOnInit();
      expect(component.onCreate).toHaveBeenCalled();
    });
  });

  describe('onCreate', () => {
    it('makes expected calls', () => {
      const covidServiceStub: CovidService = fixture.debugElement.injector.get(
        CovidService
      );
      spyOn(component, 'getGraph').and.callThrough();
      spyOn(covidServiceStub, 'getHistData').and.callThrough();
      component.onCreate();
      expect(component.getGraph).toHaveBeenCalled();
      expect(covidServiceStub.getHistData).toHaveBeenCalled();
    });
  });
});
