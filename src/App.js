import React from 'react';
import './App.scss';
import TableTemplate from './components/Table';
import ActionForm from './components/ActionForm';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { clickAddBtn } from './redux/actions';
import { Form } from 'antd';

const App = () => {
  const [form] = Form.useForm();

  const onAddBtnClick = () => {
    form.submit();
    // form.setFieldsValue(props.currentEmp);
    // form.resetFields();
  }

  return (
    <div className="container">
      <TableTemplate />
      <div className="right">
        <div className="buttons">
          <Button onClick={onAddBtnClick} className="btn btn__add">Add</Button>
          <Button className="btn btn__delete">Delete</Button>
          <Button className="btn btn__save">Save</Button>
        </div>
        <ActionForm form={form} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentEmp: state.currentEmp
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickAddBtn: (newEmp) => dispatch(clickAddBtn({type: "ADD_EMP", emp: newEmp}))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
