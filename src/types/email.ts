export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  date: number; // Unix timestamp in milliseconds
  subject: string;
  short_description: string;
  read?: boolean;
  favorite?: boolean;
}

export interface EmailBody {
  id: string;
  body: string;
}

export interface EmailsResponse {
  list: Email[];
  total: number;
}