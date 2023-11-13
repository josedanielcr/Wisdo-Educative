import { RoleClient } from "./role.client.model";

export class UserClient {
  id: number;
  b2cId: string;
  name: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  email: string;
  profileImage: string | null;
  userStatus: string | null;
  role: RoleClient | null;
  roleId: number | null;
  category: string | null;

  constructor(){}
}
