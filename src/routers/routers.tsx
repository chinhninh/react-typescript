import Application from "../container/Application";
import StoresPage from "../container/Stores";
import StoresListPage from "../container/Stores/List";
import UserList from "../container/Users/UsersList";
import Workspaces from "../container/Workspaces";
import { APPLICATION_PATH, APPLICATION_STORES_LIST_PATH, APPLICATION_STORES_PATH, PAGES_PATH, USERS_PATH, WORKSPACE_PATH } from "./path";

export const arrRouter = [
    {
      path: WORKSPACE_PATH,
      page: <Workspaces />,
      title: "workspaces",
      key: "workspaces",
      subMenu: [],
      isMenu: true
    },
    {
      path: APPLICATION_PATH,
      page: <Application />,
      title: "application",
      key: "application",
      subMenu: [],
      isMenu: true
    },
    {
      path: APPLICATION_STORES_PATH,
      page: <StoresPage />,
      title: "application stores",
      key: "application",
      subMenu: [],
      isMenu: false
    },
    {
      path: APPLICATION_STORES_LIST_PATH,
      page: <StoresListPage />,
      title: "application stores",
      key: "application",
      subMenu: [],
      isMenu: false
    },
    {
      path: PAGES_PATH,
      page: null,
      title: "pages",
      key: "pages",
      isMenu: true,
      subMenu: [
        {
          path: USERS_PATH,
          page: <UserList />,
          title: "users",
          key: "users",
          isMenu: true
        },
      ],
    },
  ];