import { Injectable } from "@nestjs/common";
import { launch, Page } from "puppeteer";
import { Chatter } from "./chatter.entity";

@Injectable()
export class ChatterService {
	constructor() {
		this.startBrowser();
	}

	private page: Page;

	private async startBrowser() {
		const browser = await launch();
		this.page = await browser.newPage();
	}

	async find(scrappingSource: string): Promise<Chatter> {
		await this.page.goto(scrappingSource, { waitUntil: "networkidle2" });

		const { heading, source } = await this.page.evaluate(() => {
			const firstStoryLink = document.querySelector(".storylink");

			return {
				heading: firstStoryLink.innerHTML,
				source: firstStoryLink.attributes.getNamedItem("href").value,
			};
		});

		await this.page.goto(source, { waitUntil: "networkidle2" });

		const detail = await this.page.evaluate(() => {
			const allParagraphs = document.querySelectorAll("p");

			const paragraphs = Array.from(allParagraphs);

			const chatterDetail = paragraphs.filter(
				p => p.innerText.length > 200,
			)[0];

			return chatterDetail.innerText || "";
		});

		const chatter = new Chatter();

		chatter.heading = heading;
		chatter.detail = detail;
		chatter.source = source;

		return Promise.resolve(chatter);
	}
}
