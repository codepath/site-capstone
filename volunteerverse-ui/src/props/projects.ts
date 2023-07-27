export interface VolunteerProjectProp {
    id: number
    title: string,
    createdAt: number | undefined,
    description: string,
    orgName: string,
    orgUrl: string,
    imageUrl: string,
    orgDesc: string,
    founders: string,
    interested: boolean,
    tags: string[],
    approved: boolean,
  }
  export interface OrgProjectProp{
    id: number
    title: string,
    createdAt: number | undefined,
    description: string,
    orgName: string,
    orgUrl: string,
    imageUrl: string,
    orgDesc: string,
    founders: string,
    tags: string[],
  }