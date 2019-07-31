import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNovoComponent } from './modal-novo.component';

describe('ModalNovoComponent', () => {
  let component: ModalNovoComponent;
  let fixture: ComponentFixture<ModalNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
