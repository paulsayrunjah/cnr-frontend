"use client";

import { useState } from "react";
import Modal from "./Modal";
import { sendEmail } from "@/lib/api";
import { SendEmailRequest } from "@/types/email";

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SendEmailModal({
  isOpen,
  onClose,
  onSuccess,
}: SendEmailModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const emailData: SendEmailRequest = {
        template_file: "lighthouse_outreach.html",
        to_emails: [email],
        subject: "Factory-Direct Cabinetry for Your Projects",
        context: {
          business_name: "Business Partner",
          catalog_url:
            "https://drive.google.com/file/d/1LJlgAw7si9xhmfEhOMbzn9b49InXOyPY/view?usp=sharing",
          brochure_url:
            "https://drive.google.com/file/d/1_SthtUG5k9LiFmJyKAg1adp6xWae3a0t/view?usp=sharing",
          price_list_url:
            "https://docs.google.com/spreadsheets/d/10oIkPTsXm1WZwOTbYByElF_LmADaEYTy/edit?usp=sharing&ouid=109701491641131251991&rtpof=true&sd=true",
          pricing_guide_url:
            "https://docs.google.com/document/d/1gqU3tjbgVp6aBwYs9AqDBN9DylyZabd_/edit?usp=sharing&ouid=109701491641131251991&rtpof=true&sd=true",
        },
        send_async: true,
      };

      await sendEmail(emailData);
      setEmail("");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setEmail("");
      setError(null);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send Email">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Recipient Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Enter email address"
            disabled={loading}
            required
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Email Template</h4>
          <div className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <p>
              <strong>Subject:</strong> Factory-Direct Cabinetry for Your Projects
            </p>
            <p>
              <strong>Template:</strong> lighthouse_outreach.html
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              This will send the standard Lighthouse Cabinetry outreach email with
              links to catalog, brochure, price list, and pricing guide.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Email"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
