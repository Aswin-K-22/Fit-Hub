export interface UserAuth  {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "trainer";
  profilePic? :string |null;
  verifiedByAdmin?: boolean;
  isVerified?: boolean;
}