import {Component, OnInit} from '@angular/core';
import {MainServiceService} from "../../main-service.service";
import {IBook, IBookReview} from "../../types/main.type";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookList: IBookReview[]

  constructor(private service: MainServiceService) {
    this.bookList = []
  }

  ngOnInit() {
    this.service.getBooks().subscribe({
      next: (res => this.bookList = res),
      error: (err => this.bookList = [])
    })
  }

  onClickBook(event: Event, book: IBookReview) {
    const input = event.target as HTMLDivElement
    // console.log(input.parentElement?.children.)
    if (input.parentElement) {
      for (let i = 0; i < input.parentElement?.children?.length; i++) {

          input.parentElement.children[i].classList.remove('border-gray-950')

      }

      input.classList.add('border-gray-950')
    }

    this.service.setBookSelected(book)
  }


}
