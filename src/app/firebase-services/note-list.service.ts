import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, doc, onSnapshot,addDoc,updateDoc, deleteDoc, limit, orderBy,query,where } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  normalMarkedNotes: Note[] = [];

  unsubTrash;
  unsubNotes;
  unsubMarkedNotes;
  // unsubSingle;
 

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();
    this.unsubMarkedNotes = this.subMarkedNotesList();


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

  async addNote(item: Note, colId: 'notes' | 'trash') {
    let refFunction: any;
    if (colId == 'notes') {
      refFunction = this.getNoteRef(); //wenn die collection id notes ist in notes speichern
    } else if (colId == 'trash') {
      refFunction = this.getTrashRef(); //wenn die collection id trash ist in trash speichern
    }
    await addDoc(refFunction, item) //hier fügen wir der Datenbank den Inhalt welcher beim Aufruf der Funktion übergeben hinzu
      .catch((err) => {
        //hier legen wir fest wenn etwas nicht funktioniert wie er vorgehen soll
        console.error(err);
      })
      .then((docRef) => {
        //zusätzlich logen wir die id in der Console
        console.log('Document written with ID:', docRef?.id);
      });
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
   this.unsubMarkedNotes;
 
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
  let ref = collection(doc(collection(this.firestore,'notes'), 'nVuoAXZVEX9ThiJnYAcl'), 'notesExtra' ) ;
  const q = query(ref,orderBy('title'), limit(100));
  return onSnapshot(q, (snapList) => {
    this.normalNotes = []
    snapList.forEach(ele => {
      this.normalNotes.push(this.setNoteObject(ele.data(),ele.id));
    });
    // snapList.docChanges().forEach((change) => {
    //   if (change.type === "added") {
    //       console.log("New note: ", change.doc.data());
    //   }
    //   if (change.type === "modified") {
    //       console.log("Modified note: ", change.doc.data());
    //   }
    //   if (change.type === "removed") {
    //       console.log("Removed note: ", change.doc.data());
    //   }
    // });
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
subMarkedNotesList() {
  const q = query(this.getNoteRef(), where("marked", "==", true), limit(100));
  return onSnapshot(q, (list) => {                                          
    this.normalMarkedNotes = [];
    list.forEach((element) => {
      this.normalMarkedNotes.push(this.setNoteObject(element.data(), element.id));
    });
  });
}

}
