export const verifyAccountHTML = (username: string, url: string) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>Verify your account</title>
    <style>
        body, table, td, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        }
        table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        }
        img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        outline: none;
        text-decoration: none;
        }
        body {
        margin: 0;
        padding: 0;
        background-color: #f0f2f5;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        @media only screen and (max-width: 600px) {
        .email-container {
            width: 100% !important;
        }
        .content-padding {
            padding: 30px 24px !important;
        }
        }
    </style>
    </head>
    <body>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background-color: #f0f2f5; padding: 40px 16px;">
        <tr>
        <td align="center">

            <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                width="560" class="email-container"
                style="background-color: #ffffff; border-radius: 12px; overflow: hidden;
                        box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

            <tr>
                <td align="center"
                    style="background-color: #000000; padding: 36px 40px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                    <td>
                        <div style="width:52px; height:52px; background-color:#1D9E75;
                                    border-radius:50%; margin: 0 auto 16px;
                                    display:table; text-align:center; line-height:52px;">
                        <span style="color:#ffffff; font-size:26px; vertical-align:middle;">✓</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td align="center">
                        <span style="color:#ffffff; font-size:22px; font-weight:700;
                                    letter-spacing:0.5px;">Findoor</span>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <tr>
                <td class="content-padding"
                    style="padding: 44px 48px 36px; color: #1a1a2e;">

                <h1 style="margin: 0 0 12px; font-size: 26px; font-weight: 700;
                            color: #1a1a2e; line-height: 1.3;">
                    Verify your account
                </h1>

                <p style="margin: 0 0 28px; font-size: 16px; color: #555e6d; line-height: 1.6;">
                    Hi <strong style="color:#1a1a2e;">${username}</strong>, thanks for signing up.
                    To activate your account and start using Findoor, click the button below.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                        style="margin-bottom: 32px;">
                    <tr>
                    <td style="border-top: 1px solid #eef0f3;"></td>
                    </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                        style="margin: 0 auto 32px;">
                    <tr>
                    <td align="center"
                        style="background-color: #1D9E75; border-radius: 8px;">
                        <a href="${url}"
                        target="_blank"
                        style="display: inline-block; padding: 15px 40px;
                                color: #ffffff; font-size: 16px; font-weight: 600;
                                text-decoration: none; letter-spacing: 0.3px;
                                border-radius: 8px;">
                        Verify my account
                        </a>
                    </td>
                    </tr>
                </table>

                <p style="margin: 0 0 28px; font-size: 13px; color: #8892a0;
                            text-align: center; line-height: 1.5;">
                    This link is valid for <strong>24 hours</strong>.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                        style="margin-bottom: 24px;">
                    <tr>
                    <td style="border-top: 1px solid #eef0f3;"></td>
                    </tr>
                </table>

                <p style="margin: 0; font-size: 13px; color: #8892a0; line-height: 1.6;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin: 6px 0 0; font-size: 13px; word-break: break-all;">
                    <a href="${url}"
                    style="color: #1D9E75; text-decoration: underline;">
                    ${url}
                    </a>
                </p>

                </td>
            </tr>

            <tr>
                <td style="background-color: #f8f9fb; padding: 24px 48px;
                            border-top: 1px solid #eef0f3;">
                <p style="margin: 0; font-size: 12px; color: #aab0bb;
                            text-align: center; line-height: 1.6;">
                    If you didn't create a Findoor account, you can safely ignore this email.<br/>
                    &copy; 2026 Findoor &mdash; All rights reserved.
                </p>
                </td>
            </tr>

            </table>

        </td>
        </tr>
    </table>

    </body>
    </html>
`
}

export const resetPasswordHTML = (username: string, url: string) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>Reset your password</title>
    <style>
        body, table, td, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        }
        table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        }
        img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        outline: none;
        text-decoration: none;
        }
        body {
        margin: 0;
        padding: 0;
        background-color: #f0f2f5;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        @media only screen and (max-width: 600px) {
        .email-container {
            width: 100% !important;
        }
        .content-padding {
            padding: 30px 24px !important;
        }
        }
    </style>
    </head>
    <body>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="background-color: #f0f2f5; padding: 40px 16px;">
        <tr>
        <td align="center">

            <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                width="560" class="email-container"
                style="background-color: #ffffff; border-radius: 12px; overflow: hidden;
                        box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

            <tr>
                <td align="center"
                    style="background-color: #000000; padding: 36px 40px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                    <td>
                        <div style="width:52px; height:52px; background-color:#1D9E75;
                                    border-radius:50%; margin: 0 auto 16px;
                                    display:table; text-align:center; line-height:52px;">
                        <span style="color:#ffffff; font-size:26px; vertical-align:middle;">🔐</span>
                        </div>
                    </td>
                    </tr>
                    <tr>
                    <td align="center">
                        <span style="color:#ffffff; font-size:22px; font-weight:700;
                                    letter-spacing:0.5px;">Findoor</span>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>

            <tr>
                <td class="content-padding"
                    style="padding: 44px 48px 36px; color: #1a1a2e;">

                <h1 style="margin: 0 0 12px; font-size: 26px; font-weight: 700;
                            color: #1a1a2e; line-height: 1.3;">
                    Reset your password
                </h1>

                <p style="margin: 0 0 28px; font-size: 16px; color: #555e6d; line-height: 1.6;">
                    Hi <strong style="color:#1a1a2e;">${username}</strong>, we received a request to reset
                    the password for your account. Click the button below to choose a new one.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                        style="margin-bottom: 32px;">
                    <tr>
                    <td style="border-top: 1px solid #eef0f3;"></td>
                    </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                        style="margin: 0 auto 32px;">
                    <tr>
                    <td align="center"
                        style="background-color: #1D9E75; border-radius: 8px;">
                        <a href="${url}"
                        target="_blank"
                        style="display: inline-block; padding: 15px 40px;
                                color: #ffffff; font-size: 16px; font-weight: 600;
                                text-decoration: none; letter-spacing: 0.3px;
                                border-radius: 8px;">
                        Reset my password
                        </a>
                    </td>
                    </tr>
                </table>

                <p style="margin: 0 0 28px; font-size: 13px; color: #8892a0;
                            text-align: center; line-height: 1.5;">
                    This link expires in <strong>1 hour</strong>.
                </p>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                        style="margin-bottom: 24px;">
                    <tr>
                    <td style="border-top: 1px solid #eef0f3;"></td>
                    </tr>
                </table>

                <p style="margin: 0; font-size: 13px; color: #8892a0; line-height: 1.6;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin: 6px 0 0; font-size: 13px; word-break: break-all;">
                    <a href="${url}"
                    style="color: #1D9E75; text-decoration: underline;">
                    ${url}
                    </a>
                </p>

                </td>
            </tr>

            <tr>
                <td style="background-color: #f8f9fb; padding: 24px 48px;
                            border-top: 1px solid #eef0f3;">
                <p style="margin: 0; font-size: 12px; color: #aab0bb;
                            text-align: center; line-height: 1.6;">
                    If you didn't request a password reset, you can safely ignore this email.
                    Your password will not be changed.<br/>
                    &copy; 2026 Findoor &mdash; All rights reserved.
                </p>
                </td>
            </tr>

            </table>

        </td>
        </tr>
    </table>

    </body>
    </html>
`
}