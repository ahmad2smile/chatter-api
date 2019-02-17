import { Module } from "@nestjs/common";
import { ChatterController } from "./chatter/chatter.controller";
import { ChatterService } from "./chatter/chatter.service";

@Module({
	imports: [],
	controllers: [ChatterController],
	providers: [ChatterService],
})
export class AppModule {}
