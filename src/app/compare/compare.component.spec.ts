import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CovidService } from '../services/covid.service';
import { CompareComponent } from './compare.component';
import { Helper } from '../helper';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const covidServiceStub = () => ({
      getCountryData: (country1, yesterday, lastTwodays) => ({
        subscribe: f => f({})
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CompareComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CovidService, useFactory: covidServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`allCountries has default value`, () => {
    expect(component.allCountries).toEqual(Helper.countries);
  });

  it(`period has default value`, () => {
    expect(component.period).toEqual(Helper.period);
  });

  it(`dataLoaded has default value`, () => {
    expect(component.dataLoaded).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('getData', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onCreate').and.callThrough();
      component.getData();
      expect(component.onCreate).toHaveBeenCalled();
    });
  });

  describe('onCreate', () => {
    it('makes expected calls', () => {
      const covidServiceStub: CovidService = fixture.debugElement.injector.get(
        CovidService
      );
      spyOn(component, 'getGraph').and.callThrough();
      spyOn(covidServiceStub, 'getCountryData').and.callThrough();
      component.onCreate();
      expect(component.getGraph).toHaveBeenCalled();
      expect(covidServiceStub.getCountryData).toHaveBeenCalled();
    });
  });
});
