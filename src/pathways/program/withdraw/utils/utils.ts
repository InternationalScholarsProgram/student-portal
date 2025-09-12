import api from "../../../../services/api/base";

const apiUrl = `/login/member/dashboard/APIs/withdraw.php`;

const requestWithdrawalAPI = async () => {
  try {
    const response = await api.post(apiUrl, {
      action: "withdraw",
      step: "request",
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error.response.data;
  }
};
const confirmWithdrawalApi = async () => {
  try {
    const response = await api.post(apiUrl, {
      action: "withdraw",
      step: "confirm",
      status: "confirm",
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error.response.data;
  }
};
const cancelWithdrawalAPI = async () => {
  try {
    const response = await api.post(apiUrl, {
      action: "withdraw",
      step: "confirm",
      status: "cancel",
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error.response.data;
  }
};

const getStatus = (status: string) => {
  if (status === "1") {
    return "not requested";
  } else if (status === "2") {
    return "requested";
  } else if (status === "3") {
    return "confirm statement";
  } else if (status === "4") {
    return "pending";
  } else if (status === "5") {
    return "cancelled";
  } else if (status === "6") {
    return "cancelled";
  }
};

export {
  requestWithdrawalAPI,
  cancelWithdrawalAPI,
  getStatus,
  confirmWithdrawalApi,
};
