import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterestsSetupComponent } from './user-interests-setup.component';

describe('UserInterestsSetupComponent', () => {
  let component: UserInterestsSetupComponent;
  let fixture: ComponentFixture<UserInterestsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInterestsSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInterestsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
