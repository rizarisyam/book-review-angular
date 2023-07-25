import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NewBookService} from "./new-book.service";
import {MainServiceService} from "../../main-service.service";
import {IBookReview} from "../../types/main.type";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent {

  createBookFormGroup: FormGroup

  constructor(
    private service: MainServiceService
  ) {
    this.createBookFormGroup = new FormGroup<any>({
      name: new FormControl(""),
      year: new FormControl("")
    })
  }

  onSubmit() {
    const body = this.createBookFormGroup.value
    const bodyArr:IBookReview[] = [{...body, reviews: null}]
    this.service.setBook(body)
    this.service.setBooks(bodyArr)
  }
}
