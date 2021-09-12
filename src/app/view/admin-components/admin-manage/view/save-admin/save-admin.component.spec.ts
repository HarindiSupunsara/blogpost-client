import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAdminComponent } from './save-admin.component';

describe('SaveAdminComponent', () => {
  let component: SaveAdminComponent;
  let fixture: ComponentFixture<SaveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
