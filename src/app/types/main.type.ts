export interface IBook {
  name: string,
  year: string
}

export interface IReview {
  email: string,
  note: string,
  star: string
}

export interface IBookReview extends IBook {
  reviews: null | IReview[]
}
