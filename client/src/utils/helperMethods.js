import setAlert from "./../store/actions/alert";

/*==========================
HELPER METHODS
small methods that are used by multiple files/components
==========================*/

export const generateErrorMsgs = (error) => {
  if (error.message) {
    console.log(error.message);
  }

  if (error.response.data.errors) {
    const errors = error.response.data.errors;
    errors.forEach((error) => {
      setAlert(error.msg, "danger");
    });
  }
};
