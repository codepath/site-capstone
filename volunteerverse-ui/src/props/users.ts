// defines app-level context of data for 
// for each user type (used in useAuth hook)

export interface VolunteerProp {
    email: string,
    firstName: string,
    lastName: string,
    imageUrl: string,
    bio: string,
    approved: boolean | undefined
}

export interface OrganizationProp {
    orgName: string,
    orgEmail: string,
    orgDescription: string,
    logoUrl: string,
    founders: string,
}