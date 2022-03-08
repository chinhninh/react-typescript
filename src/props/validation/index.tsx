const requiredItem = { required: true, message: "Vui long nhap du lieu!" };

const max6 = {
  message: "Toi thieu 6 ky tu",
  validator: (_: any, value: any) => {
    if (value && value.length >= 6) {
      return Promise.resolve();
    } else {
      return Promise.reject("Some message here");
    }
  },
};

const validatePhoneNumber = {
  message: "Chua dung dinh dang so dien thoai",
  validator: (_: any, value: any) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (re.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Some message here");
    }
  },
};

const confirmPassWord = ({ getFieldValue }: any) => ({
    
  validator(_: any, value: any) {
    console.log('getFieldValue: ',getFieldValue);
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Nhap lai mk phai giong nhau!")
    );
  },
});

const validateEmail = {
  message: "Chua dung dinh dang email",
  validator: (_: any, value: any) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Some message here");
    }
  },
};

export { requiredItem, max6, validatePhoneNumber, confirmPassWord, validateEmail };
