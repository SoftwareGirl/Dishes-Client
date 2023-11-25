import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSidebarComponent } from './stats-sidebar.component';

describe('StatsSidebarComponent', () => {
  let component: StatsSidebarComponent;
  let fixture: ComponentFixture<StatsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
