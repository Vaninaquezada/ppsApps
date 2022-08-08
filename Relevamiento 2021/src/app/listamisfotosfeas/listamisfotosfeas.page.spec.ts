import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListamisfotosfeasPage } from './listamisfotosfeas.page';

describe('ListamisfotosfeasPage', () => {
  let component: ListamisfotosfeasPage;
  let fixture: ComponentFixture<ListamisfotosfeasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListamisfotosfeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListamisfotosfeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
