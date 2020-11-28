import "dotenv/config";
import App from "./app";
import BookController from "./books/book.controller";
import TagController from "./tags/tag.controller";
import GenreController from "./genres/genre.controller";
import UserController from "./users/user.controller";
import ChapterController from "./chapters/chapter.controller";
import AuthController from "./auth/auth.controller";
import RoleController from "./roles/role.controller";
import PermissionController from "./permissions/permission.controller";
import SettingController from "./settings/setting.controller";
import KanjiController from "./kanji/kanji.controller";

const app = new App([
  new BookController(),
  new TagController(),
  new GenreController(),
  new UserController(),
  new ChapterController(),
  new AuthController(),
  new RoleController(),
  new PermissionController(),
  new SettingController(),
  new KanjiController(),
]);

app.listen();
