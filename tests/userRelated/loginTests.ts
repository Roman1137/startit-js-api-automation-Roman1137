import {
    RegistrationService,
    User,
    LoginService,
    expect
} from "../index";

describe('Login tests', async () => {
    let registrationService = new RegistrationService(),
        loginService = new LoginService();

    describe('positive cases', async () => {

        it('should login with just registered user', async () => {
            let user = User.GenerateValid();

            await registrationService.registerUser(user);

            let response = await loginService.login(user);

            expect(response, `Received response: ${JSON.stringify(response)}`)
                .to.have.nested.property("body")
                .that.includes.all.keys(["token", "tokenExpires", "id"])
        });
    });

    describe('negative cases', async () => {

        it('should not login with registered user but using invalid password', async () => {
            // arrange
            let user = User.GenerateValid();

            await registrationService.registerUser(user);

            user.password = "some_invalid_password";
            // act
            let response = await loginService.loginIncorrectly(user);

            expect(response.body.error).to.eql(403);
            expect(response.body.reason, "Incorrect password")
        });
    });
});