import mongoose, { Schema } from 'mongoose';
import { IEmailTemplate } from '../types/Email';

// Mongoose Schema for Email Templates
const EmailTemplateSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  placeholders: {
    type: [String],
    required: false,
  },
});

// Creating the model from the schema
const EmailTemplate = mongoose.model<IEmailTemplate>(
  'EmailTemplate',
  EmailTemplateSchema
);

export default EmailTemplate;
