// defines app-level context of data for 
// for each user type (used in useAuth hook)

export interface VolunteerUserProp {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    imageUrl: string,
    bio: string,
    approved: boolean | null,
    skills: string[],
    userType: "volunteer",
    
}

export interface OrgUserProp {
    id: number,
    email: string,
    orgName: string,
    orgDescription: string,
    logoUrl: string,
    founders: string,
    userType: "organization",
    orgWebsite: string,
    publicEmail: string,
    publicNumber?: string,
}