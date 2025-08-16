import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBuildersComponent } from './manage-builders.component';

describe('ManageBuildersComponent', () => {
  let component: ManageBuildersComponent;
  let fixture: ComponentFixture<ManageBuildersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBuildersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBuildersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
