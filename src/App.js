import React, { useState } from 'react';
import './App.scss';
import TableTemplate from './components/TableTemplate';
import ActionForm from './components/ActionForm';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { clickAddBtn, clickDeleteBtn, clickSaveBtn } from './redux/actions';
import { Form } from 'antd';

const App = (props) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onAddBtnClick = () => {
    form.submit();
  }

  const onDeleteBtnClick = () => {
    props.selectedRows.map(item => props.clickDeleteBtn(item));
    setSelectedRowKeys([]);
  }

  return (
    <div className="container">
      <TableTemplate rowState={[selectedRowKeys, setSelectedRowKeys]} />
      <div className="right">
        <div className="buttons">
          <Button onClick={onAddBtnClick} className="btn btn__add">Add</Button>
          <Button onClick={onDeleteBtnClick} className="btn btn__delete">Delete</Button>
          <Button onClick={props.clickSaveBtn} className="btn btn__save">Save</Button>
        </div>
        <ActionForm form={form} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentEmp: state.currentEmp,
    selectedRows: state.selectedRows,
    emps: state.emps
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickAddBtn: (newEmp) => dispatch(clickAddBtn({type: "ADD_EMP", emp: newEmp})),
    clickDeleteBtn: (empId) => dispatch(clickDeleteBtn({type: 'DELETE_EMP', empId: empId})),
    clickSaveBtn: () => dispatch(clickSaveBtn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
