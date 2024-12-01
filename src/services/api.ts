import { Email, EmailBody, EmailsResponse } from '../types/email';

const API_BASE_URL = 'https://flipkart-email-mock.vercel.app';

export const getEmails = async (page: number = 1): Promise<EmailsResponse> => {
  const response = await fetch(`${API_BASE_URL}/?page=${page}`);
  const data = await response.json();
  return {
    ...data,
    list: data.list.map((email: Email) => ({
      ...email,
      read: false,
      favorite: false,
    })),
  };
};

export const getEmailBody = async (id: string): Promise<EmailBody> => {
  const response = await fetch(`${API_BASE_URL}/?id=${id}`);
  return response.json();
};