import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainServiceService} from "../../main-service.service";
import {IBookReview, IReview} from "../../types/main.type";
import {FormControl, FormGroup} from "@angular/forms";
import {
  combineLatest,
  finalize,
  find,
  map,
  mergeMap,
  Subscription,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap
} from "rxjs";

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit, OnDestroy{

  createReviewForm: FormGroup

  booksReviews: IBookReview[]
  bookReviewSelected: IBookReview
  reviews: IReview[]

  bookReviewFinal: IBookReview[]

  constructor(private service: MainServiceService) {

    this.createReviewForm = new FormGroup<any>({
      email: new FormControl(""),
      note: new FormControl(""),
      star: new FormControl("")
    })

    this.booksReviews = []
    this.bookReviewSelected = {} as IBookReview
    this.reviews = []
    this.bookReviewFinal = []


  }

  ngOnInit() {
    this.service.getBookSelected().subscribe({next: (res => this.bookReviewSelected = res)})
  }

  onSubmit() {
    const reviewPayload: IReview = this.createReviewForm.value
    this.service.setReview(reviewPayload)
    const reviewArr: any[] = []
    let prevReview: IReview = {} as IReview
    this.service.getReview().pipe(

      map(review => {
          // prevReview = review
        // console.log('re', reviewArr)
        const selected: IBookReview = {...this.bookReviewSelected, reviews: [{...review}]}
        console.log('se', selected)
        return selected
      }),
      finalize(() => {

      })
    ).subscribe({next: (res => {
        this.service.setBookSelected(res)

      }),
      complete: () => {

      }
    })


    this.service.getBooks().pipe(
      switchMap(books => {
        return this.service.getBookSelected().pipe(
          map(selected => {
            const index = books.findIndex(book => book.name.includes(selected.name))
            books[index] = selected
            return books
          })
        )
      })
    ).subscribe({next: (res => {
        this.bookReviewFinal = res

      })})

    // this.service.setReview({} as IReview)



  }

  get isBookSelected() {
    if(Object.keys(this.bookReviewSelected).length > 0) return true
    return false
  }

  exportToJsonFile() {
    let dataSource = JSON.stringify(this.bookReviewFinal)
    let dataUri = 'data:application/json;charset=utf-8, ' + encodeURIComponent(dataSource)
    let fileName = 'book-review.json'
    let linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute("download", fileName)
    linkElement.click()
  }

  ngOnDestroy() {

  }

  protected readonly Object = Object;
}
