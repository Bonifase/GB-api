import nodemailer from "nodemailer";


function setup(){
    return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5d6f63b039bf0c",
          pass: "c7547d2bea0e98"
        }
      });
}

export function sendConfirmationEmail(user){
    const transport = setup();
    const email = {
        from: '"Gameboard" <info@gameboard.com',
        to: user.email,
        subject: "Welcome to Gameboard",
        text: `
        Welcome to Gameboard. Please confirm your email.
        ${user.generateConfirmationUrl()}
        `
    };

    transport.sendMail(email); 
export function sendResetPasswordEmail(user){
    const transport = setup();
    const email = {
            from: '"Gameboard" <info@gameboard.com',
            to: user.email,
            subject: "Reset Password",
            text: `
            To reset password, follow this link.
            ${user.generateResetPasswordLink()}
            `
        };
    
    transport.sendMail(email); 
}
}