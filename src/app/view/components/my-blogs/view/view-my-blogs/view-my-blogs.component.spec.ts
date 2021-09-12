import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyBlogsComponent } from './view-my-blogs.component';

describe('ViewMyBlogsComponent', () => {
  let component: ViewMyBlogsComponent;
  let fixture: ComponentFixture<ViewMyBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
