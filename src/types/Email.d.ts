interface IEmailTemplate extends Document {
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
  type: string;
}
interface PlaceholderValues {
  [key: string]: string;
}
export { IEmailTemplate, PlaceholderValues };
