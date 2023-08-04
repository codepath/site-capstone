export interface VolunteerProjectProp {
    id: number
    title: string,
    createdAt: number | undefined,
    description: string,
    orgName: string,
    orgUrl: string,
    imageUrl: string,
    orgDescription: string,
    orgLogoUrl: string,
    founders: string,
    interested: boolean,
    tags: string[],
    approved: boolean,
    orgPublicEmail: string,
    orgPublicNumber: string,
    active : boolean
  }
  export interface OrgProjectProp{
    id: number
    title: string,
    createdAt: number | undefined,
    description: string,
    imageUrl: string,
    orgDescription: string,
    founders: string,
    tags: string[],
  }