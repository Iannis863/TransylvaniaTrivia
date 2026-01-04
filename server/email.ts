// Resend integration for sending transactional emails
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export async function sendReminderEmail(
  toEmail: string,
  teamName: string,
  captainName: string,
  memberCount: number
) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    const totalFee = memberCount * 10;
    
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Reminder: Transylvania Trivia is TONIGHT!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a2e; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #a855f7; text-align: center; font-size: 28px; margin-bottom: 30px;">
            See You Tonight!
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Hello <strong>${captainName}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            This is your friendly reminder that <strong style="color: #22d3ee;">Transylvania Trivia</strong> is happening <strong style="color: #f59e0b;">TONIGHT!</strong>
          </p>
          
          <div style="background-color: #2d2d44; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f59e0b; margin-top: 0;">Your Team:</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #3d3d5c;">Team Name: <strong>${teamName}</strong></li>
              <li style="padding: 8px 0; border-bottom: 1px solid #3d3d5c;">Team Size: <strong>${memberCount} members</strong></li>
              <li style="padding: 8px 0;">Entry Fee: <strong style="color: #f59e0b;">${totalFee} LEI</strong> (payable at venue)</li>
            </ul>
          </div>
          
          <div style="background-color: #2d2d44; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #22d3ee; margin-top: 0;">Event Details:</h3>
            <p style="margin: 5px 0;"><strong>Time:</strong> Tonight at 20:00</p>
            <p style="margin: 5px 0;"><strong>Where:</strong> Insomnia Restaurant, Strada Universitatii nr 2, Cluj-Napoca</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #22d3ee;">
            Gather your team and get ready for 5 rounds of trivia glory!
          </p>
          
          <p style="font-size: 14px; color: #888; margin-top: 30px; text-align: center;">
            Questions? Contact us at contact@transylvaniatrivia.com
          </p>
          
          <p style="font-size: 14px; color: #a855f7; text-align: center; margin-top: 20px;">
            See you tonight!
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Error sending reminder email:', error);
      return { success: false, error };
    }

    console.log('Reminder email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send reminder email:', error);
    return { success: false, error };
  }
}

export async function sendRegistrationConfirmation(
  toEmail: string,
  teamName: string,
  captainName: string,
  memberCount: number
) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    
    const totalFee = memberCount * 10;
    
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Welcome to Transylvania Trivia, ${teamName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a2e; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #a855f7; text-align: center; font-size: 28px; margin-bottom: 30px;">
            Welcome to Transylvania Trivia!
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Hello <strong>${captainName}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for registering your team <strong style="color: #22d3ee;">${teamName}</strong> for Transylvania Trivia!
          </p>
          
          <div style="background-color: #2d2d44; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f59e0b; margin-top: 0;">Your Registration Details:</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #3d3d5c;">Team Name: <strong>${teamName}</strong></li>
              <li style="padding: 8px 0; border-bottom: 1px solid #3d3d5c;">Team Captain: <strong>${captainName}</strong></li>
              <li style="padding: 8px 0; border-bottom: 1px solid #3d3d5c;">Team Size: <strong>${memberCount} members</strong></li>
              <li style="padding: 8px 0;">Entry Fee: <strong style="color: #f59e0b;">${totalFee} LEI</strong> (${memberCount} x 10 LEI)</li>
            </ul>
          </div>
          
          <div style="background-color: #2d2d44; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #22d3ee; margin-top: 0;">Event Details:</h3>
            <p style="margin: 5px 0;"><strong>When:</strong> Next Tuesday at 20:00</p>
            <p style="margin: 5px 0;"><strong>Where:</strong> Insomnia Restaurant, Strada Universitatii nr 2, Cluj-Napoca</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Get ready for 5 rounds of trivia glory and one legendary final question! Don't forget to bring your A-game!
          </p>
          
          <p style="font-size: 14px; color: #888; margin-top: 30px; text-align: center;">
            Questions? Contact us at contact@transylvaniatrivia.com
          </p>
          
          <p style="font-size: 14px; color: #a855f7; text-align: center; margin-top: 20px;">
            See you at the quiz!
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Error sending registration email:', error);
      return { success: false, error };
    }

    console.log('Registration confirmation email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send registration email:', error);
    return { success: false, error };
  }
}
