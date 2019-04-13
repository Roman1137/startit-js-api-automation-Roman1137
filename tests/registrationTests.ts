import {
    RegistrationService,
    User
} from "../framework";
import {expect} from "chai";

describe('Registration tests', async () => {
    let registrationService = new RegistrationService();

    it('should register valid user', async () => {
        let user =  User.CreateValid();

        let response = await registrationService.registerValid(user);

        expect(response, `Received response: ${JSON.stringify(response)}`)
            .to.have.nested.property("body")
            .that.includes.all.keys(["token", "tokenExpires", "id"])
    });

    describe(' negative cases', async () => {

        it('should not register user with the same email twice', async () => {
            // arrange
            let user = User.CreateValid();

            await registrationService.registerValid(user);

            let userNew = User.Create()
                .withEmail(user.email)
                .withPassword()
                .withUserName()
                .build();

            // act
            let response = await registrationService.registerInValid(userNew);

            expect(response.body.error).to.eql(403);
            expect(response.body.reason, "Email already exists")
        });

        it('should not register user with the same userName twice', async () => {
            // arrange
            let user = User.CreateValid();

            await registrationService.registerValid(user);

            let usernNew = User.Create()
                .withEmail()
                .withPassword()
                .withUserName(user.username)
                .build();

            // act
            let response = await registrationService.registerInValid(usernNew);

            expect(response.body.error).to.eql(403);
            expect(response.body.reason, "Username already exists")
        });
    });
});