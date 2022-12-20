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
var order_products_1 = require("../models/order_products");
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var user_1 = require("../models/user");
var order_1 = require("../models/order");
var product_1 = require("../models/product");
var oder_product_entity = new order_products_1.order_productentity();
var user_entity = new user_1.userentity();
var order_entity = new order_1.orderentity();
var product_entity = new product_1.productentity();
describe('Testing order_product Model', function () {
    describe('Testing order_product Model methods to be defined', function () {
        it('should have an addProducttoanorder method', function () {
            expect(oder_product_entity.addProducttoanorder).toBeDefined();
        });
    });
    describe('Testing order_product Model methods logic', function () {
        var test_user = {
            user_name: 'testapi',
            first_name: 'test',
            second_name: '2',
            password: 'secret',
        };
        var test_product = {
            name: 'test_product',
            price: 20,
        };
        // @ts-ignore
        var idofuser;
        // @ts-ignore
        var idofproduct;
        // @ts-ignore
        var idoforder;
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var u, p, o;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_entity.create(test_user)];
                    case 1:
                        u = _a.sent();
                        idofuser = u.id;
                        return [4 /*yield*/, product_entity.create(test_product)];
                    case 2:
                        p = _a.sent();
                        idofproduct = p.id;
                        return [4 /*yield*/, order_entity.create({
                                status: true,
                                user_id: idofuser,
                            })];
                    case 3:
                        o = _a.sent();
                        idoforder = o.id;
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM order_products; \n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1; \n DELETE FROM orders; \n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return order_product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var created_order_product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, oder_product_entity.addProducttoanorder({
                            quantity: 6,
                            // @ts-ignore
                            order_id: idoforder,
                            // @ts-ignore
                            product_id: idofproduct,
                        })];
                    case 1:
                        created_order_product = _a.sent();
                        expect(created_order_product.quantity).toEqual(6);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
