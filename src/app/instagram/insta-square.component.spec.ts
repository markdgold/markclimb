import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaSquareComponent } from './insta-square.component';

describe('InstaSquareComponent', () => {
  let component: InstaSquareComponent;
  let fixture: ComponentFixture<InstaSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
