import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPracticeComponent } from './final-practice.component';

describe('FinalPracticeComponent', () => {
  let component: FinalPracticeComponent;
  let fixture: ComponentFixture<FinalPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
