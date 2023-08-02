import { RoleClient } from "./role.client.model";

export class UserClient {
  id: number;
  b2cId: string;
  name: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  email: string;
  profileImage : string | null;
  userStatus: string | null;
  role: RoleClient | null;
  roleId: number | null;
  category: string | null;
  
  constructor(id: number, b2cId: string, name: string | null, lastName: string | null,
    dateOfBirth: Date | null, email: string, profileImage : string | null, userStatus: string | null,role: RoleClient | null,
    roleId: number | null, category: string | null
  ) {
    this.id = id;
    this.b2cId = b2cId;
    this.name = name;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.userStatus = userStatus;
    this.role = role;
    this.roleId = roleId;
    this.category = category;
  }
}