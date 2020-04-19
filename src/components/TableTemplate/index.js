import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getEmps, selectEmp, unselectEmp, selectCheckbox } from '../../redux/actions';
import './style.scss';

const TableTemplate = (props) => {

  const [ selectedRowKeys, setSelectedRowKeys ] =  props.rowState; // for rowSelection in antd
  const [deletedRows, setDeletedRows] = props.deletedState; // to get deleted records
  let data = props.emps;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.employee_name.localeCompare(b.employee_name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Age',
      dataIndex: 'employee_age',
      sorter: (a, b) => a.employee_age - b.employee_age,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Salary',
      dataIndex: 'employee_salary',
      sorter: (a, b) => a.employee_salary - b.employee_salary,
      sortDirections: ['descend', 'ascend'],
      // salary formatter
      render: function(value) {
        return value.toLocaleString("en");
      }
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys();
    // get deleted rows from selected checkboxes
    for (let item of selectedRowKeys) {
      setDeletedRows([...deletedRows, data.find((emp) => emp.key === item)])
    }
    props.selectCheckbox(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.classes.includes("deleted"), // cannot check when is deleted
    }),
  };

  return (
    <Table rowSelection={rowSelection} className="my_table" dataSource={data} columns={columns} rowKey={record => record.key} 
    onRow={(record) => {
      return {
        onClick: () => {
          if (record.classes.includes("deleted")) {
            return;
          } else {
            if (record.classes.includes("selected")) {
              props.unselectEmp({...record, classes: record.classes.replace("selected", "")});
            } else {
              props.selectEmp({...record, classes: record.classes + " selected"});
            }
          }
        }
      }
    }} 
    rowClassName={(record) => {
      return record.classes;
    }}
    ></Table>  
  );
}

const mapStateToProps = (state) => {
  return {
    emps: state.emps,
    selectedRows: state.selectedRows
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmps: () => dispatch(getEmps()),
    selectEmp: (payload) => dispatch(selectEmp(payload)),
    unselectEmp: (payload) => dispatch(unselectEmp(payload)),
    selectCheckbox: (payload) => dispatch(selectCheckbox(payload)) 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableTemplate);