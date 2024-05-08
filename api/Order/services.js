import { Order } from "./Order.js";

const get_order = async () => {
  const order = await Order.findAll();
  return order;
};

const get_order_by_id = async (order_id) => {
  const order = await Order.findByPk(order_id);
  return order;
};

const create_order = async (user_id) => {
  const order = await Order.create({user_id});
  return order;
};

const update_order = async (data, order_id) => {
  const order = await Order.update(data, {
      where: { id: order_id },
      plain: true,
      returning: true,
    });

  return order;
};

const delete_order = async (order_id) => {
  const order = await Order.destroy({ where: {id : order_id} });
  return order;
};

export {
  get_order,
  delete_order,
  get_order_by_id,
  update_order,
  create_order,
};