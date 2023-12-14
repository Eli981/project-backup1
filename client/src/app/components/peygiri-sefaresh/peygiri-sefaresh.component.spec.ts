import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeygiriSefareshComponent } from './peygiri-sefaresh.component';

describe('PeygiriSefareshComponent', () => {
  let component: PeygiriSefareshComponent;
  let fixture: ComponentFixture<PeygiriSefareshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeygiriSefareshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeygiriSefareshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
