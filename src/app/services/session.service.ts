import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  usuario = signal<{id: number, nome: string, email: string} | null>(null);
}