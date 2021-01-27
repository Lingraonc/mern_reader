import Role from "./role.interface";
import CreateRoleDto from "./role.dto";
import roleModel from "./role.model";

export class RoleService {
  private readonly role = roleModel;

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.role.find();
    return roles;
  }

  async getRoleById(id: string): Promise<Role> {
    const role = await this.role.findById(id);
    return role;
  }

  async createRole(data: any): Promise<Role> {
    const roleData: CreateRoleDto = data;
    const createdRole = new this.role({
      ...roleData,
    });
    const savedRole = await createdRole.save();
    return savedRole;
  }

  async modifyRole(id: string, data: any): Promise<Role> {
    const roleData: CreateRoleDto = data;
    const role = await this.role.findByIdAndUpdate(id, roleData, {
      new: true,
    });
    return role;
  }

  async deleteRole(id: string): Promise<Role> {
    const successResponse = await this.role.findByIdAndDelete(id);
    return successResponse;
  }

  async isRoleExists(id: string): Promise<boolean> {
    const role = await this.role.findById(id);
    return !!role;
  }

  async isRolesExists(ids: string[]): Promise<boolean> {
    const role = await this.role.find(ids);
    return ids.length === role.length;
  }
}
