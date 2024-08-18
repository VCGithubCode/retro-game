/* jshint esversion: 11, jquery: true */
// Implemented from Vernell's Gratitude project project https://github.com/VCGithubCode/Gratidudes/blob/main/assets/js/email.js from email js.

emailjs.init("li65KqBAyNpcuPJcK");
/** Function to send mail once validated using emailjs */
function sendMail(contactForm) {
  if (validateForm(contactForm)) {
    emailjs
      .send("service_go9caz4", "rosie", {
        from_name: contactForm.name.value,
        message: contactForm.enquiry.value,
        reply_to: contactForm.email.value,
      })
      .then(
        (response) => {
          //https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
          window.location.href = "thank-you.html";
        },
        (error) => {
          console.log("FAILED", error);
        }
      );
    return false;
  } else {
    console.log(
      "ERROR: Unable to send form as the required fields have not been completed"
    );
  }
}

/**Function to validate the form */
function validateForm(contactForm) {
  let nameInput = contactForm.name;
  let emailInput = contactForm.email;
  let enquiryInput = contactForm.enquiry;

  // Trim whitespace from the input values
  let trimmedName = nameInput.value.trim();
  let trimmedEmail = emailInput.value.trim();
  let trimmedEnquiry = enquiryInput.value.trim();

  // Check if any of the trimmed values are empty
  if (trimmedName === "") {
    nameInput.classList.add("is-invalid");
    return false;
  } else {
    nameInput.classList.remove("is-invalid");
  }

  if (trimmedEmail === "") {
    emailInput.classList.add("is-invalid");
    return false;
  } else {
    emailInput.classList.remove("is-invalid");
  }

  if (trimmedEnquiry === "") {
    enquiryInput.classList.add("is-invalid");
    return false;
  } else {
    enquiryInput.classList.remove("is-invalid");
  }

  return true;
}
