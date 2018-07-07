"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var MyDialogComponent = /** @class */ (function () {
    function MyDialogComponent(thisDialogRef, data) {
        this.thisDialogRef = thisDialogRef;
        this.data = data;
    }
    MyDialogComponent.prototype.ngOnInit = function () {
    };
    MyDialogComponent.prototype.onCloseConfirm = function () {
        this.thisDialogRef.close('Confirm');
    };
    MyDialogComponent.prototype.onCloseCancel = function () {
        this.thisDialogRef.close('Cancel');
    };
    MyDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-my-dialog',
            templateUrl: './my-dialog.component.html',
            styleUrls: ['./my-dialog.component.scss']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_2.MatDialogRef, String])
    ], MyDialogComponent);
    return MyDialogComponent;
}());
exports.MyDialogComponent = MyDialogComponent;
//# sourceMappingURL=my-dialog.component.js.map