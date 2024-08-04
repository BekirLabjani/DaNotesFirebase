"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddNoteDialogComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var AddNoteDialogComponent = /** @class */ (function () {
    function AddNoteDialogComponent(noteService) {
        this.noteService = noteService;
        this.addDialogClosed = new core_1.EventEmitter();
        this.title = '';
        this.description = '';
    }
    AddNoteDialogComponent.prototype.closeDialog = function () {
        this.title = '';
        this.description = '';
        this.addDialogClosed.emit(false);
    };
    AddNoteDialogComponent.prototype.addNote = function () {
        var note = {
            type: 'note',
            title: this.title,
            content: this.description,
            marked: false
        };
        this.noteService.addNote(note, 'notes');
        this.closeDialog();
    };
    __decorate([
        core_1.Output()
    ], AddNoteDialogComponent.prototype, "addDialogClosed");
    AddNoteDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-add-note-dialog',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule],
            templateUrl: './add-note-dialog.component.html',
            styleUrl: './add-note-dialog.component.scss'
        })
    ], AddNoteDialogComponent);
    return AddNoteDialogComponent;
}());
exports.AddNoteDialogComponent = AddNoteDialogComponent;
