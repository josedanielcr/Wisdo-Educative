import { RoleServer } from "./role.server.model";

export class UserServer {
  id: number;
  b2cId: string;
  name: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  email: string;
  profileImage: string | null;
  userStatus: string | null;
  role: RoleServer | null;
  roleId: number | null;
  category: string | null;

  constructor(){}
}
