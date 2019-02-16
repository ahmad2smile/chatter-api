import { Controller, Get } from "@nestjs/common";

@Controller("chatter")
export class ChatterController {
	@Get()
	findAll() {
		return "This is the chatter...";
	}
}
