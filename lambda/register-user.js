const axios = require("axios");

exports.handler = async (event) => {
  const messageBody = event.user;

  const requestBody = {
    firstName: messageBody.firstName,
    lastName: messageBody.lastName,
    city: messageBody.cityInAddress,
    zipCode: messageBody.zipCodeInAddress,
    state: messageBody.stateInAddress,
    stateName: messageBody.stateName,
    documentNumber: messageBody.documentNumber,
  };

  try {
    const response = await axios.post(
      "https://frozen-headland-90136-2661329f5429.herokuapp.com/users",
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error occurred while sending POST request, Status :${error.response.status}`
    );
    return error.response;
  }
};
