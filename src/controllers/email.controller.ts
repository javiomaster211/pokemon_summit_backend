// Imports
import EmailTemplate from '../models/EmailTemplate';
import { Request, Response } from 'express';

/**
 * Retrieves all email from database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const getAllEmails = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const templates = await EmailTemplate.find();
    res.status(200).json(templates);
  } catch (err) {
    const error = new Error('unexpected_error');
    res.status(400).json({ message: error.message });
  }
};

/**
 * Retrieves an email from database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const getEmail = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'template_not_found' });
    }
    res.status(200).json(template);
  } catch (err) {
    const error = new Error('unexpected_error');
    res.status(400).json({ message: error.message });
  }
};

/**
 * Updates email
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const updateEmail = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { name, subject, body, placeholders } = req.body;
    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      {
        name,
        subject,
        body,
        placeholders,
      },
      { new: true }
    );
    if (!updatedTemplate) {
      return res.status(404).json({ message: 'template_not_found' });
    }
    res.status(200).json(updatedTemplate);
  } catch (err) {
    const error = new Error('unexpected_error');
    res.status(400).json({ message: error.message });
  }
};

/**
 * Deletes an email
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const deleteEmail = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const deletedTemplate = await EmailTemplate.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTemplate) {
      return res.status(404).json({ message: 'template_not_found' });
    }
    res.status(204).send(); // No content to send back
  } catch (err) {
    const error = new Error('unexpected_error');
    res.status(400).json({ message: error.message });
  }
};

/**
 * Ceates an email
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const createEmail = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { name, subject, body, placeholders } = req.body;
    const newTemplate = await EmailTemplate.create({
      name,
      subject,
      body,
      placeholders,
    });
    res.status(201).json(newTemplate);
  } catch (err) {
    const error = new Error('unexpected_error');
    res.status(400).json({ message: error.message });
  }
};

export { createEmail, deleteEmail, updateEmail, getEmail, getAllEmails };
