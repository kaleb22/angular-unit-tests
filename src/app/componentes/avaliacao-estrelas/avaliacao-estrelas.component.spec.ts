import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { forwardRef } from '@angular/core';
describe('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    component = fixture.componentInstance;
    component.readOnly = false;
  });

  it('deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deveria atribuir uma classificacao valida', () => {
    component.writeValue(3);
    expect(component.classificacao).toBe(3);
  });

  it('deveria chamar as funções de onChange e onTouched quando atribuir uma classificacao', () => {
    const spyOnChange = jest.spyOn(component, 'onChange');
    const spyOnTouched = jest.spyOn(component, 'onTouched');

    component.classificar(3);
    expect(spyOnChange).toHaveBeenCalled();
    expect(spyOnTouched).toHaveBeenCalled();
  });

  it('não deveria atualizar a classificação quando a propriedade readonly for true', () => {
    const spyOnChange = jest.spyOn(component, 'onChange');
    const spyOnTouched = jest.spyOn(component, 'onTouched');
    component.readOnly = true;

    component.classificar(5);
    expect(spyOnChange).not.toHaveBeenCalled();
    expect(spyOnTouched).not.toHaveBeenCalled();
  });

  it('deveria permitir somente classificações validas entre 1 e 5', () => {
    const valoresInvalidos = [0, -6, 'abc', undefined];
    valoresInvalidos.forEach((val) => {
      component.writeValue(val as any);
      expect(component.classificacao).toBe(1);
    });
  });

  it('deveria atualizar o DOM quando a classificação mudar', () => {
    component.classificar(3);
    fixture.detectChanges();
    const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');
    expect(estrelaPreenchida).toBeTruthy();
  });

  it('deveria atribuir a classificacao 1 por padrao', () => {
    expect(component.classificacao).toBe(1);
  });

  it('deveria atualizar a classificacao quando o @Input classificacao for alterado', () => {
    fixture.componentRef.setInput('classificacao', 5);
    expect(component.classificacao).toBe(5);
  });
});
