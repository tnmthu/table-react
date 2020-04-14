import React, {useState} from 'react';
import { Form, Input, InputNumber } from 'antd';
import './style.css';

function isAge(n) {
  return n > 20 && n < 65 ? {
    validateStatus: 'success',
    errorMsg: null
  } : {
    validateStatus: 'error',
    errorMsg: 'Age must be an integer, > 20, < 65.'
  };
}
function isMoney(n) {
  let regex = /^[0-9]{1,3}([0-9]{3})*$/;
  return regex.test(n) ? {
    validateStatus: 'success',
    errorMsg: null
  } : {
    validateStatus: 'error',
    errorMsg: 'Salary must be in money type. Eg. 1000000'
  };
}
function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

function isName(s) {
  // let s = str.toString();
  let regex = /^[a-zA-Z ]+$/;
  return regex.test(removeAscent(s)) ? {
    validateStatus: 'success',
    errorMsg: null
  } : {
    validateStatus: 'error',
    errorMsg: 'Wrong name format.'
  };
}

const ActionForm = (props) => {
  const [name, setName] = useState({
    value: ""
  });
  const [age, setAge] = useState({
    value: null
  });
  const [salary, setSalary] = useState({
    value: null
  });

  const onNameChange = event => {
    let value = event.target.value;
    setName({ ...isName(value), value});
  };
  const onAgeChange = value => {
    setAge({ ...isAge(value), value });
  };
  const onSalaryChange = value => {
    setSalary({ ...isMoney(value), value});
  }

  return (
    <Form className="form">
      <Form.Item label="Id:">
        <Input disabled></Input>
      </Form.Item>
      <Form.Item label="Name:" validateStatus={name.validateStatus} help={name.errorMsg || null}>
        <Input value={name.value} onChange={onNameChange}></Input>
      </Form.Item>
      <Form.Item label="Age:" validateStatus={age.validateStatus} help={age.errorMsg || null}>
        <InputNumber value={age.value} onChange={onAgeChange}></InputNumber>
      </Form.Item>
      <Form.Item label="Salary:" validateStatus={salary.validateStatus} help={salary.errorMsg || null}>
        <InputNumber value={salary.value} onChange={onSalaryChange}></InputNumber>
      </Form.Item>
    </Form>
  );
}

export default ActionForm;