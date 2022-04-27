import { HttpService } from "../servises/http-servise";

class CustomersApi extends HttpService {
    constructor() {
        super("customers");
    }

    getCustomers(search = "") {
        return this.get(`?search=${search}`);
    }
}

export default new CustomersApi();
