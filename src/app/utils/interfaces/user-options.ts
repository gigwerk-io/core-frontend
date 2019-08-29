
export interface UserOptions {
  email?: string;
  username: string;
  password: string;
}

export interface UserRegistrationOptions {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: number;
  birthday?: number;
  password: string;
  confirm_password: string;
  freelancer?: boolean;
}
