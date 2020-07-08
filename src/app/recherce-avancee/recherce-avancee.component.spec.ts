import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecherceAvanceeComponent } from './recherce-avancee.component';

describe('RecherceAvanceeComponent', () => {
  let component: RecherceAvanceeComponent;
  let fixture: ComponentFixture<RecherceAvanceeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecherceAvanceeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecherceAvanceeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
