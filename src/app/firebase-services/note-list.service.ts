import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, onSnapshot,addDoc,updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  unsubTrash;
  unsubNotes;
  // unsubSingle;
 

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();


    // this.items$ = collectionData(this.getNoteRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   })
    // })  
  }

  async updateNote(note: Note) {
   if (note.id) {
    let docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id)
    await updateDoc(docRef, this.getCleanJson(note)).catch (
      (err) => {console.error(err)}
    )
   }
  }


  async addNote(item: Note, colId : 'notes'|'trash'){
    await addDoc(this.getNoteRef(), item).catch (
      (err) => {console.error(err)}
    ).then(
      (docRef) => {console.log("Document written with ID: ", docRef?.id)}
    )
  }

  
  getCleanJson(note :Note){
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked:  note.marked,
    }
  }

getColIdFromNote(note: Note){
  if (note.type == 'note') {
    return 'notes'
  }else {
    return 'trash'
  }
}

 async deleteNote(colId:string , docId:string) {
 await deleteDoc(this.getSingleDocRef(colId , docId)).catch (
  (err) => {console.log(err)}
 )
}

 ngOnDestroy(){
   this.unsubTrash();
   this.unsubNotes();
 
 }

setNoteObject(obj: any, id:string): Note {
return {
  id: id,
  type: obj.type || 'note',
  title: obj.title || '',
  content: obj.content || '',
  marked: obj.marked || false,

}
}
subTrashList() {
   return onSnapshot(this.getTrashRef(), (snapList) => {
    this.trashNotes = [];
    snapList.forEach(ele => {
      this.trashNotes.push(this.setNoteObject(ele.data(),ele.id));
    })
  });
}

subNotesList() {
  return onSnapshot(this.getNoteRef(), (snapList) => {
    this.normalNotes = []
    snapList.forEach(ele => {
      this.normalNotes.push(this.setNoteObject(ele.data(),ele.id));
    })
  });
}





 getSingleDocRef(colId:string , docId:string) {
  return doc(collection(this.firestore,colId), docId);
 }


 getNoteRef() {
  return collection(this.firestore, 'notes');
}

getTrashRef() {
  return collection(this.firestore, 'trash');
}
}
