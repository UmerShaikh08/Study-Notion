const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Email</title>
      </head>
      <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
              <a href="https://study-notion-ed-tech-project.vercel.app/"><img style="max-width: 600px; margin-bottom: 20px;" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Study Notion logo"/></a>
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">OTP Verification Email</div>
              <div style="font-size: 16px; margin-bottom: 20px;">
                  <p>Dear User,</p>
                  <p>Thank you for registering with Study Notion. To complete your registration, please use the following OTP (one-time password) to verify your account:</p>
                  <h2 style="font-weight: bold;">${otp}</h2>
                  <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard it. Once your account is verified, you will have access to our platform and its features.</p>
              </div>
              <div style="font-size: 14px; color: #999999; margin-top: 20px;">
                If you have any questions or need assistance, please feel free to reach out to Study Notion <a href="mailto:studynotioneducation@gmail.com">here</a>. We are here to help!
              </div>
          </div>
      </body>
      </html>`;
};

export { otpTemplate };
