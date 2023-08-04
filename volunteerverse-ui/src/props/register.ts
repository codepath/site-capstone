export interface VolunteerRegisterProp {
    firstName: string;
    lastName: string;
    skills: string[];
    imageUrl: string;
    email: string;
    bio: string;
    password: string;
    userType: "volunteer";
}
export interface OrganizationRegisterProp{
    email: string;
    password: string;
    orgName: string;
    founders: string;
    orgDescription: string;
    logoUrl: string;
    publicNumber?: string;
    publicEmail: string,
    orgWebsite: string;
    userType: "organization";
}
export interface ProjectRegisterProp{
    title: string;
    desc: string;
    imageUrl?: string;
    orgName: string;
    requestedPeople: number;
    tags: string[];
    orgPublicEmail: string,
    orgPublicNumber?: string;
    
} 