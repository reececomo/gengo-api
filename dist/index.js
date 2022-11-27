"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGengoAPI = exports.GengoEnvironment = void 0;
var request_1 = __importDefault(require("request"));
var util_1 = require("util");
var auth_1 = require("./utils/auth");
var errors_1 = require("./utils/errors");
/** Re-export types & errors */
__exportStar(require("./utils/types"), exports);
__exportStar(require("./utils/errors"), exports);
__exportStar(require("./utils/webhooks"), exports);
var promiseRequest = (0, util_1.promisify)(request_1.default);
var REQUEST_TIMEOUT_PERIOD = 300000; // 5 mins
var GengoEnvironment;
(function (GengoEnvironment) {
    GengoEnvironment["Live"] = "https://api.gengo.com/v2/";
    GengoEnvironment["Sandbox"] = "http://api.sandbox.gengo.com/v2/";
})(GengoEnvironment = exports.GengoEnvironment || (exports.GengoEnvironment = {}));
/**
 *
 * @param config
 * @returns
 */
var initGengoAPI = function (config) {
    var publicKey = (config === null || config === void 0 ? void 0 : config.publicKey) || process.env.GENGO_PUBLIC_KEY;
    var privateKey = (config === null || config === void 0 ? void 0 : config.privateKey) || process.env.GENGO_PRIVATE_KEY;
    var useSandbox = (config === null || config === void 0 ? void 0 : config.useSandbox) || process.env.GENGO_USE_SANDBOX || false;
    // Check credentials supplied.
    if (publicKey === undefined || privateKey === undefined) {
        throw new Error('Gengo API Client missing public or private key.');
    }
    var creds = {
        publicKey: publicKey,
        privateKey: privateKey,
        environment: useSandbox ? GengoEnvironment.Sandbox : GengoEnvironment.Live,
    };
    return {
        account: {
            getStats: function () { return _req('GET', 'account/stats', creds); },
            getMe: function () { return _req('GET', 'account/me', creds); },
            getBalance: function () { return _req('GET', 'account/balance', creds); },
            getPreferredTranslators: function () { return _req('GET', 'account/preferred_translators', creds); },
        },
        job: {
            getJob: function (jobId) { return _req('GET', "translate/job/".concat(jobId), creds); },
            updateJob: function (data) { return _req('PUT', "translate/job/".concat(data.id), creds, data); },
            cancelJob: function (jobId) { return _req('DELETE', "translate/job/".concat(jobId), creds); },
            getJobFeedback: function (jobId) { return _req('GET', "translate/job/".concat(jobId, "/feedback"), creds); },
            getJobRevisions: function (jobId) { return _req('GET', "translate/job/".concat(jobId, "/revisions"), creds); },
            getJobRevision: function (data) { return _req('GET', "translate/job/".concat(data.id, "/revision/").concat(data.revId), creds); },
            getJobComments: function (jobId) { return _req('GET', "translate/job/".concat(jobId, "/comments"), creds); },
            postJobComment: function (data) { return _req('POST', "translate/job/".concat(data.id, "/"), creds, data); },
        },
        jobs: {
            submitJobs: function (data) { return _req('POST', 'translate/jobs', creds, data); },
            listJobs: function (data) { return _req('GET', 'translate/jobs', creds, data); },
            getJobsById: function (jobOrJobs) { return _req('GET', 'translate/jobs', creds, Array.isArray(jobOrJobs) ? jobOrJobs.join(',') : jobOrJobs); },
        },
        order: {
            getOrderJobs: function (orderId) { return _req('GET', "translate/order/".concat(orderId), creds); },
            cancelOrderJobs: function (orderId) { return _req('DELETE', "translate/order/".concat(orderId), creds); },
            getOrderComments: function (orderId) { return _req('GET', "translate/order/".concat(orderId, "/comments"), creds); },
            postOrderComment: function (data) { return _req('POST', "translate/order/".concat(data.id, "/"), creds, data); },
        },
        glossary: {
            getGlossaries: function () { return _req('GET', 'translate/glossary', creds); },
            getGlossary: function (glossaryId) { return _req('GET', "translate/glossary/".concat(glossaryId), creds); },
        },
        service: {
            getLanguagePairs: function (data) { return _req('GET', 'translate/service/language_pairs', creds, data); },
            getLanguages: function () { return _req('GET', 'translate/service/languages', creds); },
            getQuote: function (data) { return _req('POST', 'translate/service/quote', creds, data); },
        }
    };
};
exports.initGengoAPI = initGengoAPI;
/**
 * Makes a request to the Gengo API, and unwraps the 'response' key.
 */
var _req = function (method, uri, creds, data) { return __awaiter(void 0, void 0, void 0, function () {
    var isPUTorPOST, headers, callSignature, options;
    return __generator(this, function (_a) {
        isPUTorPOST = method === 'PUT' || method === 'POST';
        headers = { 'Accept': 'application/json' };
        callSignature = (0, auth_1.generateCallSignature)(creds.publicKey, creds.privateKey);
        options = {
            method: method,
            timeout: REQUEST_TIMEOUT_PERIOD,
            uri: "".concat(creds.environment).concat(uri),
            headers: headers,
            // Request body
            form: isPUTorPOST ? __assign({ data: JSON.stringify(data) }, callSignature) : undefined,
            // Query string
            qs: isPUTorPOST ? undefined : __assign(__assign({}, (data || {})), callSignature),
        };
        // Safely unwrap the request.
        return [2 /*return*/, promiseRequest(options)
                // Wrap unexpected failures.
                .catch(function (err) { throw new errors_1.GengoUnexpectedError(err); })
                // Unwrap 'response' key, or handle known errors.
                .then(function (res) {
                var body;
                try {
                    body = (res.body === Object(res.body)) ? res.body : JSON.parse(res.body);
                }
                catch (error) {
                    throw new errors_1.GengoAPIClientError("Failed to parse Gengo response: ".concat(res.body));
                }
                // Check operational status.
                if (body.opstat === 'error') {
                    throw new errors_1.GengoAPIError(body.err.code, body.err.msg);
                }
                else if (body.opstat === 'ok') {
                    return body.response;
                }
                throw new errors_1.GengoUnexpectedError("'opstat' responded with unexpected value.'".concat(body || 'undefined', "'"));
            })];
    });
}); };
//# sourceMappingURL=index.js.map