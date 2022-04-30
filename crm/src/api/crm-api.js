import { HttpService } from "../servises/http-servise";

class MastersApi extends HttpService {
    constructor() {
        super("staff");
    }

    getMasters(name = "") {
        return this.get(name ? `?name=${name}` : "");
    }

    createMaster(masterDto) {
        const formData = new FormData();

        Object.keys(masterDto).forEach((key) =>
            formData.append(key, masterDto[key])
        );

        return this.postFormData("", masterDto);
    }
}

export default new MastersApi();
