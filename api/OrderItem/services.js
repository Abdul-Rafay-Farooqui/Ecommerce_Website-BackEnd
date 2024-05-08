
import { OrderItem } from "./OrderItem.js";

const get_orderItem = async () => {
  const orderItem = await OrderItem.findAll();
  return orderItem;
};

const get_orderItem_by_id = async (orderItem_id) => {
  const orderItem = await OrderItem.findByPk(orderItem_id);
  return orderItem;
};

const create_orderItems = async (item) => {
  const orderItem = await OrderItem.bulkCreate(item);
  return orderItem;
};

const update_orderItem = async (data, orderItem_id) => {
  const orderItem = await OrderItem.update(data, {
    where: { id: orderItem_id },
    plain: true,
    returning: true,
  });
};

const delete_orderItem = async (orderItem_id) => {
  const orderItem = await OrderItem.destroy({ where: (id = orderItem_id) });
  return orderItem;
};

export {
  get_orderItem,
  delete_orderItem,
  get_orderItem_by_id,
  update_orderItem,
  create_orderItems
};
