import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivroComponent } from './livro.component';
import { AvaliacaoEstrelasComponent } from '../avaliacao-estrelas/avaliacao-estrelas.component';
import { Livro } from './livro';

describe('LivroComponent', () => {
  let component: LivroComponent;
  let fixture: ComponentFixture<LivroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LivroComponent, AvaliacaoEstrelasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroComponent);
    component = fixture.componentInstance;

    const novoLivro: Livro = {
      titulo: 'Percy Jackson - The lightning thief',
      autoria: 'Rick Riordan',
      imagem: 'http://exemplo.com',
      genero: { id: 'fantasia', value: 'Fantasia' },
      dataLeitura: '02/02/2010',
      classificacao: 5,
    };
    fixture.componentRef.setInput('livro', novoLivro);
    fixture.detectChanges();
  });

  it('deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deveria renderizar um titulo e autoria do livro corretamente', () => {
    const componentNative = fixture.nativeElement;
    expect(componentNative.querySelector('h3').textContent).toContain(
      component.livro.titulo,
    );
    expect(componentNative.querySelector('h4').textContent).toContain(
      component.livro.autoria,
    );
  });

  it('deveria renderizar as propriedades da imagem do livro corretamente', () => {
    const componentNative = fixture.nativeElement;
    const imgEl = componentNative.querySelector('img');
    expect(imgEl.src).toContain(component.livro.imagem);
    expect(imgEl.alt).toContain(component.livro.titulo);
  });
});
