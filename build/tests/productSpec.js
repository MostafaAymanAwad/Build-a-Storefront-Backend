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
var product_1 = require("../models/product");
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var product_entity = new product_1.productentity();
describe('Testing product Model', function () {
    describe('Testing product Model methods to be defined', function () {
        it('should have an index method', function () {
            expect(product_entity.index).toBeDefined();
        });
        it('should have a getproductbyid method', function () {
            expect(product_entity.getproductbyid).toBeDefined();
        });
        it('should have a create method', function () {
            expect(product_entity.create).toBeDefined();
        });
        it('should have a delete method', function () {
            expect(product_entity.delete).toBeDefined();
        });
    });
    describe('Testing product Model methods logic', function () {
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
        var test_product = {
            name: 'test',
            price: 20,
        };
        var createdproduct;
        it('create method should add a product', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity.create(test_product)];
                    case 1:
                        createdproduct = _a.sent();
                        test_product.id = createdproduct.id;
                        expect(createdproduct.name).toEqual('test');
                        expect(createdproduct.price).toEqual(20);
                        return [2 /*return*/];
                }
            });
        }); });
        it('index method should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('getproductbyid method should return the correct product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity.getproductbyid(test_product.id)];
                    case 1:
                        result = _a.sent();
                        expect(result.name).toEqual('test');
                        expect(result.price).toEqual(20);
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete method should remove the product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var a, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity.delete(createdproduct.id)];
                    case 1:
                        a = _a.sent();
                        return [4 /*yield*/, product_entity.index()];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
