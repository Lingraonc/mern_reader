import User from "./user.interface";
import userModel from "./user.model";
import CreateUserDto from "./user.dto";

export class UserService {
  private readonly user = userModel;

  async getAllUsers(): Promise<User[]> {
    const users = await this.user.find();
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.user.findById(id);
    return user;
  }

  async modifyUser(id: string, data: any): Promise<User> {
    const userData: CreateUserDto = data;
    const user = await this.user.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const successResponse = await this.user.findByIdAndDelete(id);
    return successResponse;
  }

  async isUserExists(id: string): Promise<boolean> {
    const user = await this.user.findById(id);
    return !!user;
  }

  async isUsersExists(ids: string[]): Promise<boolean> {
    const users = await this.user.find(ids);
    return ids.length === users.length;
  }
}
