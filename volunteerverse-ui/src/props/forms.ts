export interface OrgFormValues {
    email: string,
    password: string,
    confirmPassword: string,
    orgName: string,
    founders: string[],
    orgDescription: string,
    imageUrl: string,
    termsOfService: boolean
    userType: "organization"
  }
  export interface VolunteerFormValues {
    firstName: string,
    lastName: string,
    skills: string[],
    imageUrl: string,
    email: string,
    bio: string,
    password: string,
    confirmPassword: string,
    termsOfService: boolean,
    userType: "volunteer"
  }