const resetPasswordTemplate = (url) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Link </title>
  </head>
  <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <a href="https://studynotion-edtech-project.vercel.app"><img style="max-width: 600px; margin-bottom: 20px;" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Study Notion logo"/></a>
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Password Reset Link</div>
          <div style="font-size: 16px; margin-bottom: 20px;">
              <p>Dear User,</p>
              <p>Thank you for registering with Study Notion. Use the following link to reset your password:</p>
              <h2 style="font-weight: bold;">
                 <a style="display: inline-block; padding: 10px 20px; background-color: #ffd60a; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px;" href="${url}">Click Me</a>
              </h2>
              <p>This link is valid for 5 minutes. If you did not request this Verification, you are not able to reset your password.</p>
          </div>
          <div style="font-size: 14px; color: #999999; margin-top: 20px;">
            If you have any questions or need assistance, please feel free to reach out to Study Notion <a href="mailto:info@studynotion.som">here</a>. We are here to help!
          </div>
      </div>
  </body>
  </html>`;
};

export { resetPasswordTemplate };
