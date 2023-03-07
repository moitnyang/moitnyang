

export default function login_validate(values) {
  const errors = {};

  //아이디 유효성검사
  let idcheck = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/; // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리
  if (!values.id) {
    errors.id = "입력해주세요.";
  } else if (!idcheck.test(values.id)) {
    errors.id = "잘못된 아이디 입니다.";
  }

  //이메일 유효성검사
  // if (!values.email) {
  //   errors.email = "입력해주세요.";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = "잘못된 이메일주소 입니다.";
  // }

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
  

  let idcheck = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/; // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리
  if (!values.id) {
    errors.id = "입력해주세요.";
  } else if (!idcheck.test(values.id)) {
    errors.id = "잘못된 아이디 입니다.";
  }

  if (!values.password) {
    errors.password = "입력해주세요.";
  } else if (values.password.length < 4 || values.password.length > 20) {
    errors.password = "4자 이상 20자 미만이어야 합니다.";
  } else if (values.password.includes(" ")) {
    errors.password = "유효하지 않은 비밀번호입니다.";
  }

  if(!values.username){
      errors.username = "입력해주세요.";
  }else if(values.username.includes(" ")){
      errors.username = "유효하지않은 이름입니다."
  }
  
  if (!values.phone) {
    errors.phone = "입력해주세요.";
  } else if(values.phone.includes(" ")) {
    errors.phone = "유효하지않은 전화번호입니다."
  }



  return errors;
}
