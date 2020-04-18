import React, { useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { clickAddBtn, updateCurrentEmp } from '../../redux/actions';
import { isName, isAge, isMoney } from '../../services/validate';
import './style.scss';

let tmpKey = 1;

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

  const onFinish = (value) => {
    console.log("add btn", value)
    if (!props.currentEmp.id) { // if is adding
      props.clickAddBtn({...value, key: `add_${tmpKey}`, classes: "added"});
      tmpKey += 1;
    } else {
      console.log("bug: add when select")
    }
  }

  const onValuesChange = (value) => {
    if (props.currentEmp.key) { // if is editing
      let validateType = null;
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
                  employee_name: Object.values(value)[0],
                  classes: props.currentEmp.classes + " edited"
                });
                break;
              case "employee_age":
                props.updateCurrentEmp({
                  ...props.currentEmp,
                  employee_age: Object.values(value)[0],
                  classes: props.currentEmp.classes + " edited"
                });
                break;
              case "employee_salary":
                props.updateCurrentEmp({
                  ...props.currentEmp,
                  employee_salary: Object.values(value)[0],
                  classes: props.currentEmp.classes + " edited"
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
    } else {
      return;
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
    clickAddBtn: (payload) => dispatch(clickAddBtn({type: 'ADD_EMP', emp: payload})),
    updateCurrentEmp: (payload) => dispatch(updateCurrentEmp({type: 'EDIT_EMP', edited: payload}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionForm);