import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IBook} from "../../types/main.type";

@Injectable({
  providedIn: 'root'
})
export class NewBookService {
  private book = new BehaviorSubject<IBook>({} as IBook)
  constructor() { }

  getBook() {
    return this.book.asObservable()
  }

  setBook(book: IBook) {
    this.book.next(book)
  }
}
