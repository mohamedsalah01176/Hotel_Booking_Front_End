export interface JwtPayload {
  _id?: string;
  role?: "host" | "manager" | "user";
  email?: string;
  name?: string;
  phoneVerfy?:boolean;
  image?:string;
  phone?:string;
  createdAt:string
} 