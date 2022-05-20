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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // importing app that was exported frm index.ts
const image_size_1 = __importDefault(require("image-size")); //getting the size of the img
const req = (0, supertest_1.default)(index_1.default);
describe('Testing my endpoint', () => {
    it('expects valid query strings', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get(`/api/images?fileName=aaa&width=123&height=456`);
        expect(response.status).toBe(200);
    }));
    it('expects query without height', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get(`/api/images?fileName=aaa&width=123`);
        expect(response.status).toBe(400);
    }));
    it('expects query without width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get(`/api/images?fileName=aaa&height=321`);
        expect(response.status).toBe(400);
    }));
    it('expects query without fileName', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get(`/api/images?&width=123&height=321`);
        expect(response.status).toBe(400);
    }));
    it('check on size and the proccessing of the img', () => __awaiter(void 0, void 0, void 0, function* () {
        var width = 123;
        var height = 321;
        const response = yield req.get(`/api/images?fileName=fjord&width=${width}&height=${height}`);
        var sizeOfImg = (0, image_size_1.default)(response._body);
        expect(sizeOfImg.height).toBe(height); // expects that the height is the same as proccessed
        expect(sizeOfImg.width).toBe(width); // expects that width is the same as proccessed
        expect(sizeOfImg.type).toBe('jpg'); // expects that the extension of the file is .jpg mot any other extension
    }));
});
