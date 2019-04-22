import {
    ErrorResponse,
    UserModel,
    UserAuthResultResponse,
    Request,
    TypifiedResponse
} from "../../index";
import {ConsoleLogger} from "../../../loggers";
import {BaseService} from "../baseService";

export class RegistrationService extends BaseService{

    public async registerUser(user: UserModel): Promise<TypifiedResponse<UserAuthResultResponse>> {

        return await new Request(process.env.WEKAN_REGISTRATION_URN)
            .method("POST")
            .body(user)
            .send();
    }

    public async registerIncorrectly(user: UserModel): Promise<TypifiedResponse<ErrorResponse>> {
        try {
            await new Request(process.env.WEKAN_REGISTRATION_URN)
                .method("POST")
                .body(user)
                .send();
        }
        catch (error) {
            ConsoleLogger.debug(`Unsuccessful status code is expected. Error: ${error}`);
            return error.response;
        }
    }
}