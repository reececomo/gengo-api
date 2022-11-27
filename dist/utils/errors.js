"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GengoAPIError = exports.GengoUnexpectedError = exports.GengoAPIClientError = void 0;
/**
 * Wraps any error thrown due to an unexpected client issue.
 */
var GengoAPIClientError = /** @class */ (function (_super) {
    __extends(GengoAPIClientError, _super);
    function GengoAPIClientError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GengoAPIClientError;
}(Error));
exports.GengoAPIClientError = GengoAPIClientError;
;
/**
 * Wraps any error thrown from the API itself as a 200 code.
 */
var GengoUnexpectedError = /** @class */ (function (_super) {
    __extends(GengoUnexpectedError, _super);
    function GengoUnexpectedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GengoUnexpectedError;
}(Error));
exports.GengoUnexpectedError = GengoUnexpectedError;
;
/**
 * Wraps any error thrown for opstat='error'.
 */
var GengoAPIError = /** @class */ (function (_super) {
    __extends(GengoAPIError, _super);
    function GengoAPIError(code, msg) {
        var _this = _super.call(this, "Gengo API responded with an error. Code: ".concat(code, ", Message: ").concat(msg)) || this;
        _this.underlyingCode = code;
        _this.underlyingMessage = msg;
        return _this;
    }
    return GengoAPIError;
}(Error));
exports.GengoAPIError = GengoAPIError;
;
//# sourceMappingURL=errors.js.map