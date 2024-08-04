"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoteComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var NoteComponent = /** @class */ (function () {
    function NoteComponent(noteService) {
        this.noteService = noteService;
        this.edit = false;
        this.hovered = false;
    }
    NoteComponent.prototype.changeMarkedStatus = function () {
        this.note.marked = !this.note.marked;
        this.saveNote();
    };
    NoteComponent.prototype.deleteHovered = function () {
        if (!this.edit) {
            this.hovered = false;
        }
    };
    NoteComponent.prototype.openEdit = function () {
        this.edit = true;
    };
    NoteComponent.prototype.closeEdit = function () {
        this.edit = false;
        this.saveNote();
    };
    NoteComponent.prototype.moveToTrash = function () {
        if (this.note.id) {
            this.note.type = 'trash';
            var docId = this.note.id;
            delete this.note.id;
            this.noteService.addNote(this.note, 'trash');
            this.noteService.deleteNote('notes', docId);
        }
    };
    NoteComponent.prototype.moveToNotes = function () {
        this.note.type = 'note';
    };
    NoteComponent.prototype.deleteNote = function () {
        if (this.note.id) {
            this.noteService.deleteNote('notes', this.note.id);
        }
    };
    NoteComponent.prototype.saveNote = function () {
        this.noteService.updateNote(this.note);
    };
    __decorate([
        core_1.Input()
    ], NoteComponent.prototype, "note");
    NoteComponent = __decorate([
        core_1.Component({
            selector: 'app-note',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule],
            templateUrl: './note.component.html',
            styleUrl: './note.component.scss'
        })
    ], NoteComponent);
    return NoteComponent;
}());
exports.NoteComponent = NoteComponent;
