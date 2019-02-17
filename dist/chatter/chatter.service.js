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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const puppeteer_1 = require("puppeteer");
const chatter_entity_1 = require("./chatter.entity");
let ChatterService = class ChatterService {
    constructor() {
        this.startBrowser();
    }
    startBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.launch();
            this.page = yield browser.newPage();
        });
    }
    find(scrappingSource) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(scrappingSource, { waitUntil: "networkidle2" });
            const { heading, source } = yield this.page.evaluate(() => {
                const firstStoryLink = document.querySelector(".storylink");
                return {
                    heading: firstStoryLink.innerHTML,
                    source: firstStoryLink.attributes.getNamedItem("href").value,
                };
            });
            yield this.page.goto(source, { waitUntil: "networkidle2" });
            const detail = yield this.page.evaluate(() => {
                const allParagraphs = document.querySelectorAll("p");
                const paragraphs = Array.from(allParagraphs);
                const chatterDetail = paragraphs.filter(p => p.innerText.length > 200)[0];
                return chatterDetail.innerText || "";
            });
            const chatter = new chatter_entity_1.Chatter();
            chatter.heading = heading;
            chatter.detail = detail;
            chatter.source = source;
            return Promise.resolve(chatter);
        });
    }
};
ChatterService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ChatterService);
exports.ChatterService = ChatterService;
//# sourceMappingURL=chatter.service.js.map