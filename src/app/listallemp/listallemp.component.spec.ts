import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListallempComponent } from './listallemp.component';

describe('ListallempComponent', () => {
  let component: ListallempComponent;
  let fixture: ComponentFixture<ListallempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
