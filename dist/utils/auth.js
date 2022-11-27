"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCallSignature = void 0;
var crypto_1 = __importDefault(require("crypto"));
/**
 * Generates the call signature required for API calls.
 */
var generateCallSignature = function (publicKey, privateKey) {
    var ts = Math.floor(Date.now() / 1000);
    return {
        ts: ts,
        api_key: publicKey,
        api_sig: crypto_1.default.createHmac('sha1', privateKey).update(ts.toString()).digest('hex'),
    };
};
exports.generateCallSignature = generateCallSignature;
//# sourceMappingURL=auth.js.map