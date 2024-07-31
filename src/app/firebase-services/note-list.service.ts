import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc,collectionData, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  unsubList;
  // unsubSingle;
  items$;
  items;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubList = onSnapshot(this.getNoteRef(), (snapList) => {
      snapList.forEach(ele => {
        console.log(ele.id);
      })
    });
    this.items$ = collectionData(this.getNoteRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      })
    })  }

 getNoteRef() {
    return collection(this.firestore, 'notes');
 }

 getTrashRef() {
    return collection(this.firestore, 'trash');
 }

 getSingleDocRef(colId:string , docId:string) {
  return doc(collection(this.firestore,colId), docId);
 }

 ngOnDestroy(){
  this.unsubList();
  this.items.unsubscribe();
}
}
