export interface OrgFormValues {
  email: string,
  password: string,
  confirmPassword: string,
  orgName: string,
  founders: string[],
  imageFile: File | null,
  orgDescription: string,
  orgWebsite: string,
  termsOfService: boolean,
  userType: "organization"
}
export interface VolunteerFormValues {
  firstName: string,
  lastName: string,
  skills: string[],
  imageFile: File | null,
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
  requestedPeople: number;
  tags: string[];
}
