import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureClientDetailComponent } from './facture-client-detail.component';

describe('FactureClientDetailComponent', () => {
  let component: FactureClientDetailComponent;
  let fixture: ComponentFixture<FactureClientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactureClientDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
