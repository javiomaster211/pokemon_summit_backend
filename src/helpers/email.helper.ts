import EmailTemplate from '../models/EmailTemplate'; // Adjust path as necessary
import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';

interface PlaceholderValues {
  [key: string]: string;
}

// Function to send an email using a template
const sendTemplateEmail = async (
  to: string,
  templateName: string,
  values: PlaceholderValues
): Promise<SentMessageInfo> => {
  try {
    // Fetch the template by name
    const template = await EmailTemplate.findOne({ name: templateName });
    if (!template) {
      throw new Error('template_not_found.');
    }

    let { subject, body } = template;

    // Replace placeholders in the body
    Object.keys(values).forEach((key) => {
      const regex = new RegExp(`{${key}}`, 'g');
      console.log(regex);
      body = body.replace(regex, values[key]);
      console.log(body);
    });
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    // Send the email
    await transport.sendMail({
      from: '"Your Name" <PokemonTournament - League <accounts@pokemon-tournament=.com>', // Sender address
      to, // List of receivers
      subject, // Subject line
      html: body, // HTML body content
    });
    console.log('email sent');
  } catch (err) {
    console.error('Failed to send email:', err);
  }
};

export default sendTemplateEmail;
