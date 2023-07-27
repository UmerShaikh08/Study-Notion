const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Email</title>
        <style>
            body {
                background-color:  #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin : 0;
                padding : 0;
    
            }
    
            .container {
                max-width : 600px;
                margin : 0 auto ;
                padding : 20px;
                text-align  : center ;
            }
    
            .logo {
                max-width: 600px;
                margin-bottom : 20px;
            }
    
            .massage {
                font-size : 18px;
                font-weight : bold ;
                margin-bottom : 20px;
    
            }
    
            .body {
                font-size : 16px;
                margin-bottom : 20px;
    
            }
    
            .cta {
                display : inline-block;
                padding : 10px 20px;
                background-color: #ffd60a;
                text-decoration : none;
                border-radius : 5px;
                font-size : 16px ;
                font-weight : bold ;
                margin-top : 20px;
            }
    
            .support {
                font-size : 14px;
                color : #999999;
                margin-top : 20px;
    
            }
    
            .highlight {
                font-weight : bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"> <img class="logo" src="https://i.bb.co/7Xyj3PC/logo.png" alt="Study Notion logo"/></a>
            <div class="massage"> OTP Verification Email> </div>
            <div class="body">
                <p>Dear User </p>
                <p>Thank for registering with Study Notion. To complete your registeration , please use the following OTP (one time password ) to verify the password</p>
                <h2 class="highlight">
                    ${otp}
                </h2>
                <p>This OTP is valid for 5 minutes . If you did not request this Verification , please  diregard to once your account is verified , you wil have access to our platform and its features </p>
            </div>
            <div class="support" >If you have any questions or need assistance , please feel free to reach out to Study Notion <a href="mailto:info@studynotion.som" >. We are to help!</a> 
            </div>
        </div>
    </body>
    </html>`;
};

export { otpTemplate };
