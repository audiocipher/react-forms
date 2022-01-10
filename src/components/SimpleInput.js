import useInput from '../hooks/use-input';

// https://ui.dev/validate-email-address-javascript/
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    handleValueChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    handleValueChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    reset: resetEmailInput,
  } = useInput(validateEmail);

  let formIsValid = false;

  // look at the validity of all form inputs to determine if the overall form is valid
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // if a user submits a form, then all inputs are considered to be "touched"
  // however, in use-input.js we are managing the isTouched state ourselves, so simply submitting the form won't change that isTouched state
  const handleFormSubmission = (event) => {
    // https://stephencharlesweiss.com/better-form-submissions-with-event-preventdefault-and-htmlformelement-reset/
    // when a form is submitted, the default behavior is to send a GET request to the server
    // this will cause the page to refresh
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput(); // reset the touched state after the form is submitted
    resetEmailInput();
  };

  const nameInputStyles = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputStyles = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={handleFormSubmission}>
      <div className={nameInputStyles}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={handleNameChange}
          onBlur={handleNameBlur} // when the input loses focus
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputStyles}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
