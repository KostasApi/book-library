const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(
    'regex.test(String(email).toLowerCase()); :>> ',
    regex.test(String(email).toLowerCase())
  );
  return regex.test(String(email).toLowerCase());
};

export default validateEmail;
