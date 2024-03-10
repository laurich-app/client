import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterShopComponent } from './ajouter-shop.component';

describe('AjouterShopComponent', () => {
  let component: AjouterShopComponent;
  let fixture: ComponentFixture<AjouterShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
