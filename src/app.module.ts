import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatterController } from "./chatter/chatter.controller";

@Module({
	imports: [],
	controllers: [AppController, ChatterController],
	providers: [AppService],
})
export class AppModule {}
