import { HttpService } from "../servises/http-servise";

class OrdersApi extends HttpService {
    constructor() {
        super("orders");
    }

    getOrders(from = "", to = "", status = "", search = "") {
        return this.get(
            `?from=${from}&to=${to}&status=${status}&search=${search}`
        );
    }

    createOrders(ordersrDto) {
        return this.post("", ordersrDto);
    }

    editOrder(id, orderDto) {
        return this.patch(id, orderDto);
    }

    deleteOrders(id = "") {
        return this.delete(`${id}`);
    }
}

export default new OrdersApi();
