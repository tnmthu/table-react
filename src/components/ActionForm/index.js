import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { updateCurrentEmp } from '../../redux/actions';
import './style.css';

const ActionForm = (props) => {
  const [form] = Form.useForm();
  const initialValues = {
    id: '',
    employee_name: '',
    employee_age: '',
    employee_salary: '',
  }

  useEffect(() => {
    form.setFieldsValue(props.currentEmp);
  });

  // DUMAAAAAAAAAAAAAAAA
  console.log("current", props.currentEmp)

  const isAge = (rule, n) => {
    console.log("age", n, typeof n)
    return n > 20 && n < 65 ? Promise.resolve() : Promise.reject('Age must be an integer, > 20, < 65.');
  }
  const isMoney = (rule, n) => {
    let regex = /^[0-9]{1,3}([0-9]{3})*$/;
    return regex.test(n) ? Promise.resolve() : Promise.reject('Salary must be in money type. Eg. 1000000');
  }
  const removeAscent = (str) => {
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
  const isName = (rule, s) => {
    let regex = /^[a-zA-Z ]+$/;
    return regex.test(removeAscent(s)) ? Promise.resolve() : Promise.reject("Wrong name format.")
  }

  const onInputChange = (event, col) => {
    // DUDIME bug khi input sai
    let newInput = event.target.value;
    // eslint-disable-next-line default-case
    switch (col) {
      case 'employee_name':
        if (isName(null, newInput)) {
          props.updateCurrentEmp({
            ...props.currentEmp,
            employee_name: newInput
          });
        } else {
          // DUMAAAAA
        }
        break;
      
      case 'employee_age':
        if (isAge(null, newInput)) {
          props.updateCurrentEmp({
            ...props.currentEmp,
            employee_age: newInput
          });
        }
        break;
      
      case 'employee_salary':
        if (isMoney(null, newInput)) {
          props.updateCurrentEmp({
            ...props.currentEmp,
            employee_salary: newInput
          });
        }
        break;
    }
  }

  return (
    <Form className="form" form={form} name="form" initialValues={initialValues}>
      <Form.Item label="Id:" name="id">
        <Input disabled></Input>
      </Form.Item>
      <Form.Item label="Name:" name="employee_name" rules={[{required: true,}, {validator: isName}]}>
        <Input onChange={(event) => onInputChange(event, 'employee_name')}></Input>
      </Form.Item>
      <Form.Item label="Age:" name="employee_age" rules={[{required: true}, {validator: isAge}]}>
        <InputNumber onChange={(event) => onInputChange(event, 'employee_age')}></InputNumber>
      </Form.Item>
      <Form.Item label="Salary:" name="employee_salary" rules={[{required: true,}, {validator: isMoney}]}>
        <InputNumber onChange={(event) => onInputChange(event, 'employee_salary')}></InputNumber>
      </Form.Item>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    currentEmp: state.currentEmp
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentEmp: (payload) => dispatch(updateCurrentEmp(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionForm);