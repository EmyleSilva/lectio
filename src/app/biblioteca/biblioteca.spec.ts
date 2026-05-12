import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Biblioteca } from './biblioteca';

describe('Biblioteca', () => {
  let component: Biblioteca;
  let fixture: ComponentFixture<Biblioteca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Biblioteca],
      providers: [provideRouter([])] // Necessário porque usamos routerLink no HTML
    }).compileComponents();

    fixture = TestBed.createComponent(Biblioteca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});