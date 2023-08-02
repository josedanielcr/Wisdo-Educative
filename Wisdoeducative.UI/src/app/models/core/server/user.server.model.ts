import { RoleServer } from "./role.server.model";

export class UserServer {
  id: number;
  b2cId: string;
  name: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  email: string;
  profileImage : string | null;
  userStatus: string | null;
  role: RoleServer | null;
  roleId: number | null;
  category: string | null;
  
  constructor(id: number, b2cId: string, name: string | null, lastName: string | null,
    dateOfBirth: Date | null, email: string, profileImage : string | null, userStatus: string | null,role: RoleServer | null,
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