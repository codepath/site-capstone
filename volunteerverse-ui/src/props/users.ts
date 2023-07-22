// defines app-level context of data for 
// for each user type (used in useAuth hook)

export interface volunteerProp {
    email: string,
    firstName: string,
    lastName: string,
    imageUrl: string,
    bio: string
}

export interface organizationProp {
    orgName: string,
    orgEmail: string,
    orgDescription: string,
    logoUrl: string,
    founders: string,
}