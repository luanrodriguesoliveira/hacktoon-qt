const axios = require("axios");

exports.handler = async (event, context) => {
  const loginUrl = "https://api-sandbox.stitchcredit.com/api/users/login";
  const loginCredentials = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  };

  const user = event.user;

  try {
    const loginResponse = await axios.post(loginUrl, loginCredentials);
    const token = loginResponse.data.token;

    const creditReportUrl =
      "https://api-sandbox.stitchcredit.com/api/experian/credit-profile/credit-report/basic";

    // Using mock data for test
    const creditReportData = {
      firstName: "ANDERSON",
      lastName: "LAURIE",
      street1: "9817 LOOP BLVD",
      street2: "APT G",
      city: "CALIFORNIA CITY",
      state: "CA",
      zip: "935051352",
      ssn: "666455730",
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const creditReportResponse = await axios.post(
      creditReportUrl,
      creditReportData,
      { headers: headers }
    );
    const reportData = creditReportResponse.data;

    if (
      reportData.summaries[0].attributes.find(
        (attribute) => attribute.id === "delinquencies30Days"
      ).value === "00" &&
      reportData.summaries[0].attributes.find(
        (attribute) => attribute.id === "delinquencies60Days"
      ).value === "00" &&
      reportData.summaries[0].attributes.find(
        (attribute) => attribute.id === "delinquencies90to180Days"
      ).value === "00"
    ) {
      return {
        status: "APPROVED",
        user,
      };
    } else {
      return {
        status: "DENIED",
        user,
      };
    }
  } catch (error) {
    console.error("Error: ", error);
    return context.fail(`Request failed: ${error}`);
  }
};
