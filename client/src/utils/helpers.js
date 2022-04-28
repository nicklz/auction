export const fetchData = async (endpoint) => {
  try {
    let response = await fetch(endpoint)

    return await response.json()
  }
  catch (err) {
    return err
  }
};

export const postData = async (endpoint, data) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data)
    };

    let response = await fetch(endpoint, requestOptions)

    return await response.json()
  }
  catch (err) {
    return err
  }

};

export const formatMoney = (amount) => {
  let dollarUSLocale = Intl.NumberFormat('en-US');
  return `$${dollarUSLocale.format(amount)}`
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
}


