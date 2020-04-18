import React, { useState } from 'react';
import './App.scss';
import TableTemplate from './components/TableTemplate';
import ActionForm from './components/ActionForm';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { clickDeleteBtn, clickSaveBtn } from './redux/actions';
import { uniqueRequestByKeepLast } from './services/utilities';
import { Form } from 'antd';

const App = (props) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  const onAddBtnClick = () => {
    form.submit();
  }

  const onDeleteBtnClick = () => {
    deletedRows.map(item => props.clickDeleteBtn({...item, classes: item.classes + " deleted"}));
    setSelectedRowKeys([]);
    setDeletedRows([]);
  }

  const onSaveBtnClick = () => {
    // let editRequests = props.requests.filter(function(item) {
    //   return item.type === 'EDIT_EMP';
    // });
    // let cleanEditReqs = uniqueRequestByKeepLast(editRequests, item => item.edited.id);
    // let prevReqs = [...cleanEditReqs, ...props.requests.filter(function(item) {
    //   return item.type !== 'EDIT_EMP';
    // })];
    let reqs = [];
    for (let emp of props.emps) {
      if (emp.classes.includes("deleted")) {
        if (!emp.classes.includes("added")) { // deleted but not just added
          reqs.push({ type: 'DELETE_EMP', emp: emp});
        }
      } else if (emp.classes.includes("added")) {
        reqs.push({ type: 'ADD_EMP', emp: emp});
      } else if (emp.classes.includes("edited")) {
        reqs.push({ type: 'EDIT_EMP', emp: emp });
      }
    }
    console.log("reqs", reqs)
    props.clickSaveBtn(reqs);

    // let editRequests = props.requests.filter(function(item) {
    //   return item.type === 'EDIT_EMP';
    // });
    // let cleanEditReqs = uniqueRequestByKeepLast(editRequests, item => item.edited.id);
    // let prevReqs = [...cleanEditReqs, ...props.requests.filter(function(item) {
    //   return item.type !== 'EDIT_EMP';
    // })];
    // let reqs = [];
    // for (let req of prevReqs) {
    //   if (req.emp.class.includes("deleted")) {
    //     if (!req.emp.class.includes("added")) { // deleted but not just added
    //       reqs.push(req);
    //     }
    //   } else if (req.emp.class.includes("added")) {
    //     reqs.push(req);
    //   } else if (req.emp.class.includes("edited")) {
    //     reqs.push(req);
    //   }
    // }
    // console.log("reqs", reqs)
    // props.clickSaveBtn(reqs);
    // props.clickSaveBtn([...cleanEditReqs, ...props.requests.filter(function(item) {
    //   return item.type !== 'EDIT_EMP';
    // })]);
  }

  return (
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
  );
}

const mapStateToProps = (state) => {
  return {
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
