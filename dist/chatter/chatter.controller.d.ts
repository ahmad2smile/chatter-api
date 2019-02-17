import { Chatter } from "./chatter.entity";
import { ChatterService } from "./chatter.service";
export declare class ChatterController {
    private readonly chatterService;
    constructor(chatterService: ChatterService);
    findAll(): Promise<Chatter>;
}
