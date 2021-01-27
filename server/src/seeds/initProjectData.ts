export const initProjectData = {
  permissions: [
    {
      name: "view",
    },
    {
      name: "edit",
    },
    {
      name: "block",
    },
    {
      name: "unblock",
    },
    {
      name: "editRoles",
    },
    {
      name: "editSettings",
    },
    {
      name: "admin",
    },
  ],
  roles: [
    {
      name: "user",
      permissions: ["view"],
    },
    {
      name: "admin",
      permissions: [
        "view",
        "edit",
        "block",
        "unblock",
        "editRoles",
        "editSettings",
        "admin",
      ],
    },
  ],
  settings: [
    {
      name: "Project Inited",
      isActive: true,
      isEditable: false,
    },
    {
      name: "Time token expired",
      isActive: true,
      isEditable: true,
    },
    {
      name: "Default user role",
      value: "user",
      isActive: true,
      isEditable: false,
    },
    {
      name: "Default admin group",
      value: "admin",
      isActive: true,
      isEditable: false,
    },
    {
      name: "Kanji parser init",
      isActive: false,
      isEditable: true,
    },
  ],
  users: [
    {
      nickname: "admin",
      name: "Admin Name",
      lastName: "Admin LastName",
      email: "test@test.ru",
      password: "1",
    },
  ],
};
