import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Auth2LoginPage } from './auth2-login.page';


describe('ChipListPage', () => {
  let component: Auth2LoginPage;
  let fixture: ComponentFixture<Auth2LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Auth2LoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Auth2LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
