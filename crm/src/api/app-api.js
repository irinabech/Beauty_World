import { HttpService } from "../servises/http-servise";

class AppApi extends HttpService {
    login(loginData) {
        return this.post("login", loginData);
    }
}

export default new AppApi();
