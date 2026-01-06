import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylListPageComponent } from './vinyl-list-page.component';

describe('VinylListPageComponent', () => {
  let component: VinylListPageComponent;
  let fixture: ComponentFixture<VinylListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinylListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
