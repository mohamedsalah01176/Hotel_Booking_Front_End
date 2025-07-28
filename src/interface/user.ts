export interface JwtPayload {
  _id?: string;
  role?: string;
  email?: string;
  name?: string;
  phoneVerfy?:boolean;
  image?:string;
} 