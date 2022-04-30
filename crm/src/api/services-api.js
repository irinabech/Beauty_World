import { HttpService } from "../servises/http-servise";

class ServicesApi extends HttpService {
    constructor() {
        super("services");
    }

    getServices(serviceId = "") {
        return this.get(serviceId ? `/${serviceId}` : "");
    }
}

export default new ServicesApi();
