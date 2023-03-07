

export default function login_validate(values) {
  const errors = {};

  //이메일 유효성검사
  if (!values.email) {
    errors.email = "입력해주세요.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "잘못된 이메일주소 입니다.";
  }

  // 비밀번호 유효성검사
  if (!values.password) {
    errors.password = "입력해주세요.";
  } else if (values.password.length < 4 || values.password.length > 20) {
    errors.password = "4자 이상 20자 미만이어야 합니다.";
  } else if (values.password.includes(" ")) {
    errors.password = "유효하지 않은 비밀번호입니다.";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  if(!values.username){
    errors.username = "입력해주세요.";
}else if(values.username.includes(" ")){
    errors.username = "유효하지않은 이름입니다."
}

  if (!values.email) {
    errors.email = "입력해주세요.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "잘못된 이메일주소 입니다.";
  }

  if (!values.password) {
    errors.password = "입력해주세요.";
  } else if (values.password.length < 4 || values.password.length > 20) {
    errors.password = "4자 이상 20자 미만이어야 합니다.";
  } else if (values.password.includes(" ")) {
    errors.password = "유효하지 않은 비밀번호입니다.";
  }

  // 비밀번호확인 인풋 검사
  if(!values.cpassword){
    errors.cpassword = "입력해주세요.";
  } else if(values.password !== values.cpassword){
    errors.cpassword = "비밀번호가 다릅니다."
  } else if(values.cpassword.includes(" ")){
    errors.cpassword = "유효하지 않은 비밀번호입니다."
  }

  return errors;
}
