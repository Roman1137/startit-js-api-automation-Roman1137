import {
    LoginService,
    Request,
    TypifiedResponse,
    ForbidderErrorReponse,
    DeletedUserResponse,
    SchemaJson
} from "../../index"
import {BaseService} from "../baseService";

export class DeleteUserService extends BaseService{

    public async deleteUser(userId: string): Promise<TypifiedResponse<DeletedUserResponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;
        let loginResponse = await new LoginService().loginAsAdmin();

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(loginResponse.token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.DeleteUser));
    }

    public async deleteUserUsingSpecificToken(userId: string, token: string,): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("DELETE")
            .auth(token)
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }

    public async deleteUserWithoutToken(userId: string): Promise<TypifiedResponse<ForbidderErrorReponse>> {
        let absoluteUrl = `${process.env.WEKAN_USERS_URN}/${userId}`;

        return await new Request(absoluteUrl)
            .method("DELETE")
            .send()
            .then(res => this.validateWithJsonSchema(res, SchemaJson.PermissionsError));
    }
}