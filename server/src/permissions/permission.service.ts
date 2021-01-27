import Permission from "./permission.interface";
import CreatePermissionDto from "./permission.dto";
import permissionModel from "./permission.model";

export class PermissionService {
  private readonly permission = permissionModel;

  async getAllPermissions(): Promise<Permission[]> {
    const permissions = await this.permission.find();
    return permissions;
  }

  async getPermissionById(id: string): Promise<Permission> {
    const permission = await this.permission.findById(id);
    return permission;
  }

  async createPermission(data: any): Promise<Permission> {
    const permissionData: CreatePermissionDto = data;
    const createdPermission = new this.permission({
      ...permissionData,
    });
    const savedPermission = await createdPermission.save();
    return savedPermission;
  }

  async modifyPermission(id: string, data: any): Promise<Permission> {
    const permissionData: CreatePermissionDto = data;
    const permission = await this.permission.findByIdAndUpdate(
      id,
      permissionData,
      {
        new: true,
      }
    );
    return permission;
  }

  async deletePermission(id: string): Promise<Permission> {
    const successResponse = await this.permission.findByIdAndDelete(id);
    return successResponse;
  }

  async isPermissionExists(name: string): Promise<boolean> {
    const permission = await this.permission.find({ name });
    return !!permission;
  }

  async isPermissionsExists(name: string[]): Promise<boolean> {
    if (name.length > 0) {
      const permissions = await this.permission.find({ name: { $in: name } });
      return name.length === permissions.length;
    }
    return false;
  }
}
