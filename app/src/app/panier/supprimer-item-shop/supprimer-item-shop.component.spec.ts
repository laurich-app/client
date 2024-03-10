import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerItemShopComponent } from './supprimer-item-shop.component';

describe('SupprimerItemShopComponent', () => {
  let component: SupprimerItemShopComponent;
  let fixture: ComponentFixture<SupprimerItemShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimerItemShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupprimerItemShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
