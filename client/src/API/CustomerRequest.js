export const CustomerRequest = async (user_data) => {
  const response = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: user_data,
  });

  if (response.ok) {
    const { success, response_message } = await response.json();

    return { success, response_message };
  } else {
    const { response_message } = await response.json();
    throw new Error(response_message);
  }
};
