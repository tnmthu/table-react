import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getEmps, selectEmp, unselectEmp } from '../../redux/actions';
import './style.scss';

const TableTemplate = (props) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    console.log("selected rows: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <Table rowSelection={rowSelection} className="table" dataSource={props.emps}  columns={columns} rowKey={record => record.id} 
    onRow={(record, rowIndex) => {
      return {
        onClick: () => {
          const trs = document.getElementsByTagName('tr')
          for (let tr of trs) {
            if (record.id === tr.dataset.rowKey) {
              if (tr.classList.contains('selected')) {
                tr.classList.remove('selected');
                props.unselectEmp();
              } else {
                tr.classList.add("selected");
                props.selectEmp(record); // pass record to redux state
              }
            } else {
              tr.classList.remove("selected")
            }
          }
        }
      }
    }} 
    ></Table>  
  );
}

const mapStateToProps = (state) => {
  return {
    emps: state.emps
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmps: () => dispatch(getEmps()),
    selectEmp: (payload) => dispatch(selectEmp(payload)),
    unselectEmp: () => dispatch(unselectEmp())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableTemplate);