import { Controller, Get } from "@nestjs/common";
import { Chatter } from "./chatter.entity";
import { ChatterService } from "./chatter.service";

@Controller("chatter")
export class ChatterController {
	constructor(private readonly chatterService: ChatterService) {}

	@Get()
	async findAll(): Promise<Chatter> {
		return await this.chatterService.find("https://news.ycombinator.com");
	}
}
