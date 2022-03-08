import UserList from "../container/Users/UsersList";
import Workspaces from "../container/Workspaces";
import { PAGES_PATH, USERS_PATH, WORKSPACE_PATH } from "./path";

export const arrRouter = [
    {
      path: WORKSPACE_PATH,
      page: <Workspaces />,
      title: "workspaces",
      key: "workspaces",
      subMenu: [],
    },
    {
      path: PAGES_PATH,
      page: null,
      title: "pages",
      key: "pages",
      subMenu: [
        {
          path: USERS_PATH,
          page: <UserList />,
          title: "users",
          key: "users",
        },
      ],
    },
  ];