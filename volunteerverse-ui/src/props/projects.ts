export interface VolunteerProjectProp {
    id: number
    title: string,
    createdAt: number | undefined,
    description: string,
    orgName: string,
    orgUrl: string,
    imageUrl: string,
    orgDescription: string,
    founders: string,
    interested: boolean,
    tags: string[],
    approved: boolean,
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