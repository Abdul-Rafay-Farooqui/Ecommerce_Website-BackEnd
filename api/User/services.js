
import { User } from "./User.js";

  const update_user = async (user_id, data) => {
    console.log(data)
    const updatedUser = await User.update(data, {
      where: { id: user_id },
      returning: true,
      plain: true,
    });
  
    return updatedUser;
  };
  
  const delete_user = async (user_id, data) => {
    const deleteUser = await User.destroy({
      where: { id: user_id },
    });
    return deleteUser;
  };

  export {
    update_user,
    delete_user
  };