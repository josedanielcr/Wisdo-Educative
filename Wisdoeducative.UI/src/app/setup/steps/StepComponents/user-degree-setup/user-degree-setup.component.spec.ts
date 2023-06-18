import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDegreeSetupComponent } from './user-degree-setup.component';

describe('UserDegreeSetupComponent', () => {
  let component: UserDegreeSetupComponent;
  let fixture: ComponentFixture<UserDegreeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDegreeSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDegreeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
