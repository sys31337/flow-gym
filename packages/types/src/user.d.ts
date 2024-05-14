export interface User {
  fullname: string;
  email?: string;
  firebaseId?: string;
  phoneNumber?: string;
  avatar?: string;
  kind: "MEMBER" | "COACH" | "MANAGER" | "ADMIN";
  isAdmin?: boolean;
  authProvider: "google.com" | "phone" | "password" | "apple.com";
}
