import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaModalComponent } from './insta-modal.component';

describe('InstaModalComponent', () => {
  let component: InstaModalComponent;
  let fixture: ComponentFixture<InstaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
