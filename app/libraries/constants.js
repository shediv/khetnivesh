/*
  Description : Add constants in this file so that it becomes easier for us to modify their values from a single page. DO NOT ADD any app configuration information here.
  Link : http://stackoverflow.com/a/21247500/6444516

*/

module.exports = Object.freeze({

    //Memorytile.js constants
    constUnAuthorizedAccess: "Unauthorized access Error: private profile",
    constNoKidsForUser: "No kids for a user",

    constNoaccessToMemories: "No access to any memories",
    constNoMemoriesCreatedbyYou: "No memories created by you",

    //Token Expiry in days
    constRememberMeTokenExpiry: 30,
    constNormalTokenExpiry: 1,

    //
    userEmailFound: true,
    userEmailNotFound: false,
    constEmailNotFound: "User email not found",

    //Email 
    constFromEmailID: "help@creativecapsule.com",
    constResetPasswordMessage: "Reset Your Password - Little Hoots",
    constEmailSentFailure: false,
    constEmailSentSuccess: true,
    constEmailNotSent: "Email could not be sent!. Please try again to change your password.",
    constEmailSent: "No Problem <br> An email has been sent with directions on how to reset your password.",

    //password reset
    constPasswordResetFailed: false,
    constPasswordResetSuccess: true,
    constEmailDoesntExist: "No account with the entered email address exists.",
    constUserPasswordUpdated: "Your password has been updated!",
    constUserPasswordUpdatedError: "Your password could not be updated. Please try again.",


    //Register new user
    constEmailNotVerified: "Please verify your Email address before loggin to LittleHoots",
    constNewUserIsCreated: "Your account has been created! " + "<br>" + "Please verify your Email address before loggin to LittleHoots.",
    constEmailAlreadyRegistered: "The user name you entered is already taken by another user, please try another user name.",
    constUserEmailVerified: "User's email verified",

    //Login
    constUserWasNotFound: "Oops! We don't have anyone registered with that email. </br> Alot of people"
        + " forget how they first registered. Try connecting via Facebook",   

    constUserPasswordIsNotCorrect: "We don't have any one with the user name and password combination. Please try again.",

    //Guest user registration
    constGuesUserAlreadyRegistered:  "The user name you entered is already taken by another user, please try another user name.",
    constGuesUserRegistrationFailed: "Guest user could not be created, Please try again.",
});
