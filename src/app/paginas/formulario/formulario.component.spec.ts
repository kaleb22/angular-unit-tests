import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LivroService } from '../../services/livro.service';
import { provideRouter, Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ListaLivrosComponent } from '../lista-livros/lista-livros.component';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;
  const routes: Routes = [
    {
      path: 'lista-livros',
      component: ListaLivrosComponent,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule],
      providers: [FormBuilder, LivroService, provideRouter(routes)],
    }).compileComponents();

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deveria inicializar o formulario com valores vazios', () => {
    expect(component.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });

  it('deveria adicionar um novo livro', () => {
    const novoLivro = {
      titulo: 'Percy Jackson - The lightning thief',
      autoria: 'Rick Riordan',
      imagem: 'http://exemplo.com',
      genero: 'fantasia',
      dataLeitura: '02/02/2010',
      classificacao: 5,
    };

    const routerSpy = jest.spyOn(component['router'], 'navigate');
    const livroServiceSpy = jest.spyOn(service, 'adicionarLivro');
    component.formulario.setValue(novoLivro);

    const form = fixture.debugElement.query(By.css('form'));
    form.nativeElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(livroServiceSpy).toHaveBeenCalledWith({
      ...novoLivro,
      genero: component.generos.find((g) => g.id === novoLivro.genero),
    });

    expect(component.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
  });
});
