"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.NoteListService = void 0;
var core_1 = require("@angular/core");
var firestore_1 = require("@angular/fire/firestore");
var NoteListService = /** @class */ (function () {
    function NoteListService() {
        this.trashNotes = [];
        this.normalNotes = [];
        // unsubSingle;
        this.firestore = core_1.inject(firestore_1.Firestore);
        this.unsubTrash = this.subTrashList();
        this.unsubNotes = this.subNotesList();
        // this.items$ = collectionData(this.getNoteRef());
        // this.items = this.items$.subscribe((list) => {
        //   list.forEach(element => {
        //     console.log(element);
        //   })
        // })  
    }
    NoteListService.prototype.updateNote = function (note) {
        return __awaiter(this, void 0, void 0, function () {
            var docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!note.id) return [3 /*break*/, 2];
                        docRef = this.getSingleDocRef(this.getColIdFromNote(note), note.id);
                        return [4 /*yield*/, firestore_1.updateDoc(docRef, this.getCleanJson(note))["catch"](function (err) { console.error(err); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    NoteListService.prototype.addNote = function (item, colId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firestore_1.addDoc(this.getNoteRef(), item)["catch"](function (err) { console.error(err); }).then(function (docRef) { console.log("Document written with ID: ", docRef === null || docRef === void 0 ? void 0 : docRef.id); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NoteListService.prototype.getCleanJson = function (note) {
        return {
            type: note.type,
            title: note.title,
            content: note.content,
            marked: note.marked
        };
    };
    NoteListService.prototype.getColIdFromNote = function (note) {
        if (note.type == 'note') {
            return 'notes';
        }
        else {
            return 'trash';
        }
    };
    NoteListService.prototype.deleteNote = function (colId, docId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, firestore_1.deleteDoc(this.getSingleDocRef(colId, docId))["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NoteListService.prototype.ngOnDestroy = function () {
        this.unsubTrash();
        this.unsubNotes();
    };
    NoteListService.prototype.setNoteObject = function (obj, id) {
        return {
            id: id,
            type: obj.type || 'note',
            title: obj.title || '',
            content: obj.content || '',
            marked: obj.marked || false
        };
    };
    NoteListService.prototype.subTrashList = function () {
        var _this = this;
        return firestore_1.onSnapshot(this.getTrashRef(), function (snapList) {
            _this.trashNotes = [];
            snapList.forEach(function (ele) {
                _this.trashNotes.push(_this.setNoteObject(ele.data(), ele.id));
            });
        });
    };
    NoteListService.prototype.subNotesList = function () {
        var _this = this;
        return firestore_1.onSnapshot(this.getNoteRef(), function (snapList) {
            _this.normalNotes = [];
            snapList.forEach(function (ele) {
                _this.normalNotes.push(_this.setNoteObject(ele.data(), ele.id));
            });
        });
    };
    NoteListService.prototype.getSingleDocRef = function (colId, docId) {
        return firestore_1.doc(firestore_1.collection(this.firestore, colId), docId);
    };
    NoteListService.prototype.getNoteRef = function () {
        return firestore_1.collection(this.firestore, 'notes');
    };
    NoteListService.prototype.getTrashRef = function () {
        return firestore_1.collection(this.firestore, 'trash');
    };
    NoteListService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NoteListService);
    return NoteListService;
}());
exports.NoteListService = NoteListService;
