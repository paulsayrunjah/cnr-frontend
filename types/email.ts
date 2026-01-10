export interface Email {
  id: number;
  subject: string;
  to_emails: string[];
  cc_emails: string[];
  bcc_emails: string[];
  body_text: string;
  body_html: string;
  status: string;
  provider: string;
  provider_message_id: string;
  lead: number | null;
  lead_name: string | null;
  template: number | null;
  template_name: string | null;
  error_message: string;
  retry_count: number;
  created_at: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  metadata: Record<string, any>;
}

export interface EmailsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Email[];
}

export interface SendEmailRequest {
  template_file: string;
  to_emails: string[];
  subject: string;
  context: {
    business_name: string;
    catalog_url: string;
    brochure_url: string;
    price_list_url: string;
    pricing_guide_url: string;
  };
  send_async: boolean;
}
