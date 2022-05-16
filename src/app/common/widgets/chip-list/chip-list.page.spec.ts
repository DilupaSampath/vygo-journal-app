import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ChipListPage } from './chip-list.page';


describe('ChipListPage', () => {
  let component: ChipListPage;
  let fixture: ComponentFixture<ChipListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
