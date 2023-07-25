import { Injectable } from '@angular/core';
import {BehaviorSubject, take} from "rxjs";
import {IBook, IBookReview, IReview} from "./types/main.type";

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private book = new BehaviorSubject<IBook>({} as IBook)
  private books = new BehaviorSubject<IBookReview[]>([])
  private review = new BehaviorSubject<IReview>({} as IReview)
  private bookSelected = new BehaviorSubject<IBookReview>({} as IBookReview)
  constructor() { }

  getBook() {
    return this.book.asObservable()
  }

  setBook(body: IBook) {
    this.book.next(body)
  }

  getBooks() {
    return this.books.asObservable()
  }

  setBooks(body: IBookReview[]) {
    this.books.next([...this.books.value, ...body])
  }

  getReview() {
    // this.review.next([])
    return this.review.asObservable()
  }

  setReview(body: IReview) {
    this.review.next(body)

  }

  getBookSelected() {
    return this.bookSelected.asObservable()
  }

  setBookSelected(body: IBookReview) {
    this.bookSelected.next(body)
  }

}
