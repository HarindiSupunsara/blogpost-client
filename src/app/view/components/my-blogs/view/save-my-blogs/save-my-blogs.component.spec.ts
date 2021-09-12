import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMyBlogsComponent } from './save-my-blogs.component';

describe('SaveMyBlogsComponent', () => {
  let component: SaveMyBlogsComponent;
  let fixture: ComponentFixture<SaveMyBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveMyBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMyBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
