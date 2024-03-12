import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDeCommandesComponent } from './bon-de-commandes.component';

describe('BonDeCommandesComponent', () => {
  let component: BonDeCommandesComponent;
  let fixture: ComponentFixture<BonDeCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonDeCommandesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonDeCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
