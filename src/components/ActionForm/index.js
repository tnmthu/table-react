import React, { useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { addEmp, clickAddBtn, updateCurrentEmp } from '../../redux/actions';
import { isName, isAge, isMoney } from '../../services/validate';
import './style.css';

const ActionForm = (props) => {
  const form = props.form;

  const initialValues = {
    id: '',
    employee_name: '',
    employee_age: '',
    employee_salary: '',
  }

  useEffect(() => {
    form.setFieldsValue(props.currentEmp);
  });

  // const onInputChange = (event, col) => {
  //   // CAN PHAI VALIDATE TRC KHI UPDATE HAY ADD
  // }
  const onFinish = (value) => {
    if (value.id === "") {
      props.clickAddBtn(value);
    } else {
      console.log("du di me")
    }
  }

  const onValuesChange = (value) => {
    let validateType = null;
    console.log(value, Object.keys(value)[0], Object.values(value))
    switch (Object.keys(value)[0]) {
      case "employee_name":
        validateType = isName;
        break;
      case "employee_age":
        validateType = isAge;
        break;
      case "employee_salary":
        validateType = isMoney;
        break;
      default:
        break;
    }
    if (validateType) {
      validateType(null, Object.values(value)[0])
        .then(function() {
          switch (Object.keys(value)[0]) {
            case "employee_name":
              props.updateCurrentEmp({
                ...props.currentEmp,
                employee_name: Object.values(value)[0]
              });
              break;
            case "employee_age":
              props.updateCurrentEmp({
                ...props.currentEmp,
                employee_age: Object.values(value)[0]
              });
              break;
            case "employee_salary":
              props.updateCurrentEmp({
                ...props.currentEmp,
                employee_salary: Object.values(value)[0]
              });
              break;
            default:
              break;
          }
        })
        .catch(function() {
          return;
        });
    }
  }

  return (
    <Form className="form" onFinish={(value) => {onFinish(value)}} onValuesChange={(value) => {onValuesChange(value)}} form={form} name="form" initialValues={initialValues}>
      <Form.Item label="Id:" name="id">
        <Input disabled></Input>
      </Form.Item>
      <Form.Item label="Name:" name="employee_name" rules={[{required: true,}, {validator: isName}]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="Age:" name="employee_age" rules={[{required: true}, {validator: isAge}]}>
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item label="Salary:" name="employee_salary" rules={[{required: true,}, {validator: isMoney}]}>
        <InputNumber></InputNumber>
      </Form.Item>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    currentEmp: state.currentEmp,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEmp: (payload) => dispatch(addEmp(payload)),
    clickAddBtn: (payload) => dispatch(clickAddBtn({type: 'ADD_EMP', newEmp: payload})),
    updateCurrentEmp: (payload) => dispatch(updateCurrentEmp({type: 'EDIT_EMP', edited: payload}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionForm);