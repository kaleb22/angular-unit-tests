import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaLivrosComponent } from './lista-livros.component';
import { LivroComponent } from '../../componentes/livro/livro.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { LivroService } from '../../services/livro.service';
import { provideRouter, Router, Routes } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ListaLivrosComponent', () => {
  let component: ListaLivrosComponent;
  let fixture: ComponentFixture<ListaLivrosComponent>;
  let service: LivroService;
  let router: Router;
  const routes: Routes = [
    {
      path: 'formulario',
      component: FormularioComponent,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListaLivrosComponent, LivroComponent, FormularioComponent],
      providers: [provideRouter(routes), LivroService],
    }).compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(ListaLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deveria inicializar generos corretamente', () => {
    const generos = service.generos;
    expect(component.generos).toEqual(generos);
  });

  it('deveria ir para rota /formulario quando btn for clicado', () => {
    const routerSpy = jest.spyOn(router, 'navigateByUrl');
    const btnNovoCard = fixture.debugElement.query(
      By.css('[data-testId="btn-novo-card"]'),
    );
    btnNovoCard.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalled();
  });

  it('deveria renderizar as sections por genero corretamente', () => {
    const sections = fixture.debugElement.queryAll(
      By.css('[data-testId="section-genero"]'),
    );
    expect(sections.length).toEqual(component.generos.length);
  });

  it('deveria renderizar um livro para cada genero', () => {
    component.generos.forEach((genero) => {
      const livros = fixture.nativeElement.querySelectorAll(
        `.${genero.id} app-livro`,
      );
      expect(livros.length).toBe(
        service.obterLivrosPorGenero(genero.id).length,
      );
    });
  });
});
