import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ChatterController } from "./chatter/chatter.controller";
import { ChatterService } from "./chatter/chatter.service";

@Module({
	imports: [],
	controllers: [AppController, ChatterController],
	providers: [ChatterService],
})
export class AppModule {}
