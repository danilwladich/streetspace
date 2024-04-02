export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}
