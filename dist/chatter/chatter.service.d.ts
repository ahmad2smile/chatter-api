import { Chatter } from "./chatter.entity";
export declare class ChatterService {
    constructor();
    private page;
    private startBrowser;
    find(scrappingSource: string): Promise<Chatter>;
}
