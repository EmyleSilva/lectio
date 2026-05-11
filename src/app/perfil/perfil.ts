import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  protected lists = signal(['Infantis', 'Variados']);
  protected newList = signal('');

  protected addList(): void {
    const title = this.newList().trim();
    if (!title) {
      return;
    }

    this.lists.update((current) => [...current, title]);
    this.newList.set('');
  }

  protected removeList(index: number): void {
    this.lists.update((current) => current.filter((_, i) => i !== index));
  }

  protected updateNewList(value: string): void {
    this.newList.set(value);
  }
}
