import { PermissionService } from "../permissions/permission.service";
import { RoleService } from "../roles/role.service";
import AuthService from "../Auth/auth.service";
import { SettingService } from "../settings/setting.service";
import { initProjectData } from "./initProjectData";

class InitProjectSeed {
  private permissionService: PermissionService;
  private roleService: RoleService;
  private authService: AuthService;
  private settingService: SettingService;

  constructor() {
    this.permissionService = new PermissionService();
    this.roleService = new RoleService();
    this.authService = new AuthService();
    this.settingService = new SettingService();
    this.initProject();
  }

  async initProject() {
    const isProjectInited = await this.settingService.isSettingExists(
      "Project Inited"
    );
    if (!isProjectInited) {
      const permissions = initProjectData.permissions;
      const roles = initProjectData.roles;
      const settings = initProjectData.settings;
      const users = initProjectData.users;
      for (const permission of permissions) {
        await this.permissionService.createPermission(permission);
      }
      for (const role of roles) {
        await this.roleService.createRole(role);
      }
      for (const setting of settings) {
        await this.settingService.createSetting(setting);
      }
      for (const user of users) {
        const defaultAdminRole = await this.settingService.getDefaultAdminRole();
        await this.authService.register(user, defaultAdminRole.value);
      }
      console.log("Project init successful!");
    }
  }
}

export default InitProjectSeed;
