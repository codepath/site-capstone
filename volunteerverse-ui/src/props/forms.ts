export interface OrgFormValues {
  email: string,
  publicEmail : string,
  password: string,
  confirmPassword: string,
  orgName: string,
  founders: string[],
  imageFile: File | null,
  logoUrl: string,
  orgDescription: string,
  orgWebsite: string,
  termsOfService: boolean,
  publicNumber:  string,
  userType: "organization"
}
export interface VolunteerFormValues {
  firstName: string,
  lastName: string,
  skills: string[],
  imageFile: File | null,
  imageUrl: string,
  email: string,
  bio: string,
  password: string,
  confirmPassword: string,
  termsOfService: boolean,
  userType: "volunteer"
}
export interface ProjectFormValues {
  title: string;
  desc: string;
  imageFile: File | null,
  requestedPeople: string;
  tags: string[];
  publicEmail: string;
  publicNumber:  string;
}
