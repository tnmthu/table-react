import React from 'react';
import { connect } from 'react-redux';
import { getEmps } from '../../redux/actions';
import { Table } from 'antd';
import './style.css';

const { Column } = Table;

const TableTemplate = (props) => {
  console.log("here", props.emps);
  const rowSelection = {
    type: "checkbox",
    onChange: (selectedRows) => {
      console.log("selected rows: ", selectedRows);
    }
  };
  
  return (
  <Table className="table" dataSource={props.emps} rowSelection={rowSelection}>
    <Column title="Id" dataIndex="id" key="id" />
    <Column title="Name" dataIndex="employee_name" key="name" />
    <Column title="Age" dataIndex="employee_age" key="age" />
    <Column title="Salary" dataIndex="employee_salary" key="salary" />
  </Table>  
  );
}

const mapStateToProps = (state) => {
  return {
    emps: state.emps
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmps: () => dispatch(getEmps())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableTemplate);