import React, { useState } from 'react';
import './App.scss';
import TableTemplate from './components/TableTemplate';
import ActionForm from './components/ActionForm';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { clickDeleteBtn, clickSaveBtn } from './redux/actions';
import { Form, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const App = (props) => {

  // check if not render for the first time 
  if (Object.keys(props.isSaved).length !== 0) {
    if (props.isSaved.saved === true) {
      message.success(props.isSaved.msg);
    } else {
      message.error(props.isSaved.msg);
    }
  }

  const [form] = Form.useForm(); //andt form
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // for table
  const [deletedRows, setDeletedRows] = useState([]); // for table

  const onAddBtnClick = () => {
    form.submit();
  }

  const onDeleteBtnClick = () => {
    deletedRows.map(item => props.clickDeleteBtn({...item, classes: item.classes + " deleted"})); // add deleted UI
    // reset checkbox
    setSelectedRowKeys([]);
    setDeletedRows([]);
  }

  const onSaveBtnClick = () => {
    let reqs = [];
    for (let emp of props.emps) {
      if (emp.classes.includes("deleted")) {
        if (!emp.classes.includes("added")) { // deleted but not added (ignore added then deleted)
          reqs.push({ type: 'DELETE_EMP', emp: emp});
        }
      } else if (emp.classes.includes("added")) {
        reqs.push({ type: 'ADD_EMP', emp: emp});
      } else if (emp.classes.includes("edited")) {
        reqs.push({ type: 'EDIT_EMP', emp: emp });
      }
    }
    if (reqs.length !== 0) {
      props.clickSaveBtn(reqs);
    } else {
      return;
    }
  }

  return (
    <Spin spinning={props.isLoading} indicator={antIcon}>
      <div className="container">  
        <TableTemplate rowState={[selectedRowKeys, setSelectedRowKeys]} deletedState={[deletedRows, setDeletedRows]} />
        <div className="right">
          <div className="buttons">
            <Button onClick={onAddBtnClick} className="btn btn__add">Add</Button>
            <Button onClick={onDeleteBtnClick} className="btn btn__delete">Delete</Button>
            <Button onClick={onSaveBtnClick} className="btn btn__save">Save</Button>
          </div>
          <ActionForm form={form} />
        </div>
      </div>
    </Spin>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isSaved: state.isSaved,
    currentEmp: state.currentEmp,
    selectedRows: state.selectedRows,
    emps: state.emps,
    requests: state.requests
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickDeleteBtn: (emp) => dispatch(clickDeleteBtn({type: 'DELETE_EMP', emp: emp})),
    clickSaveBtn: (payload) => dispatch(clickSaveBtn(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
