import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';




class Book {
    constructor(public title, public timestamp) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public books: FirebaseListObservable<Book[]>;

    private bookCounter = 0;

    private filter = '';

    constructor(private db: AngularFireDatabase) {
        this.books = db.list('/books');
    }

    public addBook(): void {
        const newBook = new Book(`My book #${this.bookCounter++}`, Date.now());
        this.books.push(newBook);
    }


    public filterBooks(): void {

        let timestart = new Date("5/5/18");
        alert(timestart) //full time
        alert(timestart.getTime()); //timestamp

        this.books = this.db.list('/books', {
            query: {
                // orderByChild: 'title',
                // equalTo: 'My book #1',

                // orderByChild: 'createdAt',
                // orderByChild : "lastUpdated"

                // orderByChild: 'timestamp',
                // equalTo: 1525458738877,

                // orderByChild: 'size',


                orderByChild: 'timestamp',
                startAt: timestart,
                endAt: Date.now()


            }
        });
    }



}
