import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderslistweekComponent } from './folderslistweek.component';

describe('FolderslistweekComponent', () => {
  let component: FolderslistweekComponent;
  let fixture: ComponentFixture<FolderslistweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderslistweekComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderslistweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
