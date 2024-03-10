import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierShopComponent } from './modifier-shop.component';

describe('ModifierShopComponent', () => {
  let component: ModifierShopComponent;
  let fixture: ComponentFixture<ModifierShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
