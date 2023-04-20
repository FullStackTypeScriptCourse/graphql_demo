# Demo project for starting with graphql in nodejs with express using typescript

## References
- [Video](https://www.youtube.com/watch?v=qux4-yWeZvo&t=239s&ab_channel=LaithAcademy)
- [GraphQL](https://graphql.org/)
- [Express](https://expressjs.com/)

## Queries to try out in the sandbox

### Get all books
```graphql
query GetAll {
  books{
    id
    title
    author
    rating_average
    ratings {
      title
      value
    }
    category {
      name
      id
      books {
        title
        category {
          name
        }
      }
    }
  }
}
```
### Get book by id
```graphql
query GetBook($id: ID!) {
  book(id:$id){
    title
    id
    author
    category {
      name
      id
    }
  }
}
```
And send variables
```json
{
  "id": "1"
}
```

### Create new book
```graphql
mutation CreateBook($input: BookInput!) {
  createBook(input: $input) {
    id
    author
    title
    category {
      id
    }
  }
}
```
And send variables
```json
{
  "input": {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "category_id": "1"
  }
}
```

### Delete book by id
```graphql
mutation DeleteBook($id: ID!) {
  deleteBook(id: $id)
}
```
And send variables
```json
{
  "id": "1"
}
```

### Update book by id
```graphql
mutation UpdateBook($updateBookId: ID!, $input: BookInput!) {
  updateBook(id: $updateBookId, input: $input) {
    title
    id
  }
}
```
And send variables
```json
{
  "updateBookId": "1",
  "input": {
    "title": "The Lord of the Rings Volume 2",
    // "author": "J.R.R. Tolkien",
    "category_id": "1"
  }
}
```

### Get all categories
```graphql
query GetAllCategories {
  categories {
    id
    name
    books {
      title
      author
    }
  }
}
```

### Get category by id
```graphql
query GetCategory($id: ID!) {
  category(id: $id) {
    id
    name
    books {
      title
      author
    }
  }
}
```
And send variables
```json
{
  "id": "1"
}
```

### Create rating
```graphql
mutation CreateRating($ratingInput: RatingInput!){
  createRating(input: $ratingInput) {
    id
    title
    value
    description
    book {
      title
    }
  }

}
```
And send variables
```json
{
  "ratingInput": {
    "title": "Good",
    "value": 5,
    "description": "This book is good",
    "book_id": "1"
  }
}
```

### Get all ratings
```graphql
query GetRatings {
  books {
    title
    ratings {
      value
    }
  }
}
```

