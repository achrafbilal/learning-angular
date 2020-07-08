import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FolderslistYearComponent } from './folderslist-year.component';

describe('FolderslistYearComponent', () => {
  let component: FolderslistYearComponent;
  let fixture: ComponentFixture<FolderslistYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderslistYearComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FolderslistYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
