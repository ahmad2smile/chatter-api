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

	async find(source: string): Promise<Chatter> {
		await this.page.goto(source, { waitUntil: "networkidle2" });

		const { header, detail } = await this.page.evaluate(() => {
			const firstStoryLink = document.querySelector(".storylink");

			return {
				header: firstStoryLink.innerHTML,
				detail: firstStoryLink.attributes.getNamedItem("href").value,
			};
		});

		const chatter = new Chatter();

		chatter.heading = header;
		chatter.detail = detail;

		return Promise.resolve(chatter);
	}
}
