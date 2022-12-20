"use strict";
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
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var user_1 = require("../models/user");
var user_entity = new user_1.userentity();
describe('Testing user Model', function () {
    describe('Testing user Model methods to be defined', function () {
        it('should have an index method', function () {
            expect(user_entity.index).toBeDefined();
        });
        it('should have a getuserbyusername method', function () {
            expect(user_entity.getuserbyusername).toBeDefined();
        });
        it('should have a create method', function () {
            expect(user_entity.create).toBeDefined();
        });
        it('should have a delete method', function () {
            expect(user_entity.delete).toBeDefined();
        });
    });
    describe('Testing user Model methods logic', function () {
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        var test_user = {
            user_name: 'test123',
            first_name: 'test',
            second_name: '1',
            password: 'password123',
        };
        it('create method should add a user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var createduser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.create(test_user)];
                    case 1:
                        createduser = _a.sent();
                        test_user.id = createduser.id;
                        expect(createduser.user_name).toEqual('test123');
                        expect(createduser.first_name).toEqual('test');
                        return [2 /*return*/];
                }
            });
        }); });
        it('authenticate method should return authenticated user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticated_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.authenticate('test123', 'password123')];
                    case 1:
                        authenticated_user = _a.sent();
                        // @ts-ignore
                        expect(authenticated_user.user_name).toEqual('test123');
                        // @ts-ignore
                        expect(authenticated_user.first_name).toEqual('test');
                        return [2 /*return*/];
                }
            });
        }); });
        it('authenticate method should return null when passing incorrect data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authenticated_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.authenticate('wrong_username', 'wrong_password')];
                    case 1:
                        authenticated_user = _a.sent();
                        expect(authenticated_user).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
        it('index method should return a list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('getuserbyusername method should return the correct user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.getuserbyusername(test_user.user_name)];
                    case 1:
                        result = _a.sent();
                        expect(result.user_name).toEqual('test123');
                        expect(result.first_name).toEqual('test');
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete method should remove the user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var a, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.delete('test123')];
                    case 1:
                        a = _a.sent();
                        return [4 /*yield*/, user_entity.index()];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
