import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ShelfBook {
  title: string;
  author: string;
  cover: string;
}

interface ShelfCollection {
  name: string;
  books: ShelfBook[];
}

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  protected lists = signal(['Infantis', 'Variados']);
  protected newList = signal('');

  protected collections = signal<ShelfCollection[]>([
    {
      name: 'Favoritos da Vida',
      books: [
        {
          title: 'O Hobbit',
          author: 'J. R. R. Tolkien',
          cover: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
        },
        {
          title: 'Katabasis',
          author: 'R. F. Kuang',
          cover: 'https://skoob.s3.amazonaws.com/livros/122442868/KATABASIS_1738777025122442868SK-V11738777025B.jpg',
        },
      ],
    },
    {
      name: 'Para ler depois',
      books: [
        {
          title: 'A Guerra da Papoula',
          author: 'R. F. Kuang',
          cover: 'https://m.media-amazon.com/images/I/613YunBw8yL._AC_UF1000,1000_QL80_.jpg',
        },
      ],
    },
  ]);
  protected newCollectionName = signal('');
  protected selectedCollectionName = signal(this.collections()[0]?.name ?? '');
  protected selectedBookTitle = signal('O Hobbit');
  protected customBookTitle = signal('');
  protected isCustomBook = signal(false);
  protected availableBooks: ShelfBook[] = [
    { title: 'O Hobbit', author: 'J. R. R. Tolkien', cover: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg' },
    { title: 'A Guerra da Papoula', author: 'R. F. Kuang', cover: 'https://m.media-amazon.com/images/I/613YunBw8yL._AC_UF1000,1000_QL80_.jpg' },
    { title: 'Katabasis', author: 'R. F. Kuang', cover: 'https://skoob.s3.amazonaws.com/livros/122442868/KATABASIS_1738777025122442868SK-V11738777025B.jpg' },
    { title: 'A República do Dragão', author: 'R. F. Kuang', cover: 'https://m.media-amazon.com/images/I/818fnagZbWL._UF1000,1000_QL80_.jpg' },
    { title: '1984', author: 'George Orwell', cover: 'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg' },
    { title: 'Dom Casmurro', author: 'Machado de Assis', cover: 'https://m.media-amazon.com/images/I/81qQfkH0HVL.jpg' },
  ];

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

  protected createCollection(): void {
    const title = this.newCollectionName().trim();
    if (!title) {
      return;
    }

    const alreadyExists = this.collections().some((collection) => collection.name.toLowerCase() === title.toLowerCase());
    if (alreadyExists) {
      this.newCollectionName.set('');
      return;
    }

    this.collections.update((current) => [...current, { name: title, books: [] }]);
    this.selectedCollectionName.set(title);
    this.newCollectionName.set('');
  }

  protected addBookToCollection(): void {
    const collectionName = this.selectedCollectionName().trim();
    const bookTitle = this.selectedBookTitle().trim();
    const customTitle = this.customBookTitle().trim();

    if (!collectionName) {
      return;
    }

    const finalTitle = this.isCustomBook() ? customTitle : bookTitle;

    if (!finalTitle) {
      return;
    }

    const selectedBook = this.availableBooks.find((book) => book.title === bookTitle);
    const bookToAdd: ShelfBook = selectedBook
      ? selectedBook
      : {
          title: finalTitle,
          author: 'Autor não informado',
          cover: '',
        };

    this.collections.update((current) =>
      current.map((collection) => {
        if (collection.name !== collectionName) {
          return collection;
        }

        if (collection.books.some((book) => book.title === bookToAdd.title)) {
          return collection;
        }

        return {
          ...collection,
          books: [...collection.books, bookToAdd],
        };
      })
    );

    this.customBookTitle.set('');
    this.isCustomBook.set(false);
    this.selectedBookTitle.set('O Hobbit');
  }

  protected removeCollection(index: number): void {
    this.collections.update((current) => current.filter((_, i) => i !== index));
  }

  protected removeBook(collectionIndex: number, bookIndex: number): void {
    this.collections.update((current) =>
      current.map((collection, index) => {
        if (index !== collectionIndex) {
          return collection;
        }

        return {
          ...collection,
          books: collection.books.filter((_, i) => i !== bookIndex),
        };
      })
    );
  }

  protected updateNewCollectionName(value: string): void {
    this.newCollectionName.set(value);
  }

  protected updateSelectedCollection(value: string): void {
    this.selectedCollectionName.set(value);
  }

  protected updateSelectedBook(value: string): void {
    this.selectedBookTitle.set(value);
    this.isCustomBook.set(value === 'outro');
  }

  protected updateCustomBookTitle(value: string): void {
    this.customBookTitle.set(value);
  }
}
