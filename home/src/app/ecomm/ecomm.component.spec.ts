import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommComponent } from './ecomm.component';

describe('EcommComponent', () => {
  let component: EcommComponent;
  let fixture: ComponentFixture<EcommComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcommComponent]
    });
    fixture = TestBed.createComponent(EcommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
