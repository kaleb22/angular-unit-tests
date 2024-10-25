import { livros } from '../mock-livros';
import { GeneroLiterario, Livro } from './../componentes/livro/livro';
import { ErroGeneroLiterario, LivroService } from './livro.service';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    service = new LivroService();
  });

  it('deveria ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deveria adicionar um novo livro', () => {
    const novoLivro: Livro = {
      titulo: 'Percy Jackson - The lightning thief',
      autoria: 'Rick Riordan',
      imagem: 'http://exemplo.com',
      genero: { id: 'fantasia', value: 'Fantasia' },
      dataLeitura: '02/02/2010',
      classificacao: 5,
    };

    service.adicionarLivro(novoLivro);
    const livrosPorGenero = service.obterLivrosPorGenero('fantasia');
    expect(livrosPorGenero).toContain(novoLivro);
  });

  it('deveria recuperar corretamente os livros por genero', () => {
    const livrosPorGenero = service.obterLivrosPorGenero('fantasia');
    const livrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'fantasia',
    );
    expect(livrosPorGenero).toEqual(livrosEsperados);
  });

  it('deveria inicializar os generos corretamente', () => {
    const generoEsperados: GeneroLiterario[] = [
      {
        id: 'romance',
        value: 'Romance',
      },
      {
        id: 'misterio',
        value: 'Mistério',
      },
      {
        id: 'fantasia',
        value: 'Fantasia',
      },
      {
        id: 'ficcao-cientifica',
        value: 'Ficção Científica',
      },
      {
        id: 'tecnicos',
        value: 'Técnicos',
      },
    ];
    expect(service.generos).toEqual(generoEsperados);
  });

  it('deveria lancar um erro ao tentar cadastrar um livro com genero desconhecido', () => {
    const novoLivro: Livro = {
      titulo: 'Percy Jackson - The lightning thief',
      autoria: 'Rick Riordan',
      imagem: 'http://exemplo.com',
      genero: { id: 'terror', value: 'Terror' },
      dataLeitura: '02/02/2010',
      classificacao: 5,
    };

    expect(() => service.adicionarLivro(novoLivro)).toThrow(
      ErroGeneroLiterario,
    );
  });
});
