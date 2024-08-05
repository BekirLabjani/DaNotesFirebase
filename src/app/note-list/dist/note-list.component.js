"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoteListComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var note_component_1 = require("./note/note.component");
var NoteListComponent = /** @class */ (function () {
    function NoteListComponent(noteService) {
        this.noteService = noteService;
        this.noteList = [];
        this.favFilter = 'all';
        this.status = 'notes';
    }
    NoteListComponent.prototype.changeFavFilter = function (filter) {
        this.favFilter = filter;
    };
    NoteListComponent.prototype.getList = function () {
        if (this.status == 'notes') {
            if (this.favFilter == 'all') {
                return this.noteService.normalNotes;
            }
            else {
                return this.noteService.normalMarkedNotes;
            }
        }
        else {
            return this.noteService.trashNotes;
        }
    };
    NoteListComponent.prototype.changeTrashStatus = function () {
        if (this.status == 'trash') {
            this.status = 'notes';
        }
        else {
            this.status = 'trash';
            this.favFilter = 'all';
        }
        console.log('test');
    };
    NoteListComponent = __decorate([
        core_1.Component({
            selector: 'app-note-list',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule, note_component_1.NoteComponent],
            templateUrl: './note-list.component.html',
            styleUrl: './note-list.component.scss'
        })
    ], NoteListComponent);
    return NoteListComponent;
}());
exports.NoteListComponent = NoteListComponent;
