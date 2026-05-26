import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avaliar-livro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './avaliar-livro.html',
  styleUrl: './avaliar-livro.css',
})
export class AvaliarLivro {
  private formBuilder = inject(FormBuilder);

  avaliacaoForm = this.formBuilder.group({
    nota: [0, [Validators.required, Validators.min(1)]],
    avaliacao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
    spoiler: [false],
  });

  selecionarNota(nota: number): void {
    this.avaliacaoForm.patchValue({ nota });
  }

  campoInvalido(campo: string): boolean {
    const controle = this.avaliacaoForm.get(campo);
    return !!(controle && controle.invalid && (controle.dirty || controle.touched));
  }

  enviarAvaliacao(): void {
    if (this.avaliacaoForm.invalid) {
      this.avaliacaoForm.markAllAsTouched();
      return;
    }

    console.log('Avaliação enviada:', this.avaliacaoForm.value);
    alert('Avaliação publicada com sucesso!');

    this.avaliacaoForm.reset({
      nota: 0,
      avaliacao: '',
      spoiler: false,
    });
  }
}