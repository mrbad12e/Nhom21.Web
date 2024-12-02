const db = require('../config/database');
class Order {
    constructor(data) {
        if (!Order.validate(data)) {
            throw new Error("Invalid order data");
        }
        this.id = data.id;
        this.userId = data.userId;
        this.status = data.status; // status: 'pending', 'shipped', 'delivered', etc.
        this.totalAmount = data.totalAmount;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static validate(order) {
        return !!(
            order.userId &&
            order.status &&
            order.totalAmount >= 0
        );
    }
}

module.exports = Order;
