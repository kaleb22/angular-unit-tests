import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RodapeComponent } from './rodape.component';

describe('RodapeComponent', () => {
  let component: RodapeComponent;
  let fixture: ComponentFixture<RodapeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RodapeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deveria definir as propriedades src e alt', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('deveria alterar os valores dos inputs src e alt', () => {
    fixture.componentRef.setInput('src', 'http://test.com');
    fixture.componentRef.setInput('alt', 'descricao img');

    expect(component).toMatchSnapshot();
  });
});
