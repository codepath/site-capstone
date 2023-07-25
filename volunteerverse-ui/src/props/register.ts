export interface volunteerRegisterProp {
    firstName: string;
    lastName: string;
    skills: string[];
    imageUrl: string;
    email: string;
    bio: string;
    password: string;
    userType: "volunteer";

}
export interface organizationRegisterProp{
    email: string;
    password: string;
    orgName: string;
    founders: string;
    orgDescription: string;
    imageUrl: string;
    userType: "organization";
}