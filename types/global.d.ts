export {};

declare global {
  interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    how_to_apply: string;
    company_logo: string;
  }
}
