import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantiteCommandeComponent } from './quantite-commande.component';

describe('QuantiteCommandeComponent', () => {
  let component: QuantiteCommandeComponent;
  let fixture: ComponentFixture<QuantiteCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuantiteCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantiteCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
