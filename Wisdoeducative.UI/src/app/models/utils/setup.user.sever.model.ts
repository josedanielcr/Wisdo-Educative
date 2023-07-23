import { InterestServer } from "../core/server/interest.server.model";
import { UserServer } from "../core/server/user.server.model";
import { SetUpDegree } from "./setup.degree.model";

export class SetUpUserServer {
    user : UserServer;
    interestsDtos : InterestServer[];
    userDegreConfig : SetUpDegree;
    constructor() {}
}