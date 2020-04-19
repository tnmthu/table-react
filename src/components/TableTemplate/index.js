import React, {useState} from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { getEmps, selectEmp, unselectEmp, selectCheckbox } from '../../redux/actions';
import './style.scss';
import ResizeableTitle from '../ResizableTitle';

const TableTemplate = (props) => {

  const [columns, setColumns] = useState([
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: 40
    },
    {
      title: 'Name',
      dataIndex: 'employee_name',
      sorter: (a, b) => a.employee_name.localeCompare(b.employee_name),
      sortDirections: ['ascend', 'descend'],
      width: 150
    },
    {
      title: 'Age',
      dataIndex: 'employee_age',
      sorter: (a, b) => a.employee_age - b.employee_age,
      sortDirections: ['descend', 'ascend'],
      width: 40
    },
    {
      title: 'Salary',
      dataIndex: 'employee_salary',
      sorter: (a, b) => a.employee_salary - b.employee_salary,
      sortDirections: ['descend', 'ascend'],
      width: 100,
      // salary formatter
      render: function(value) {
        return value.toLocaleString("en");
      }
    },
  ]);

  let components = {
    header: {
      cell: ResizeableTitle
    }
  }

  const [ selectedRowKeys, setSelectedRowKeys ] =  props.rowState; // for rowSelection in antd
  const [deletedRows, setDeletedRows] = props.deletedState; // to get deleted records
  let data = props.emps;

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

  let handleResize = index => (e, { size }) => {
    setColumns(() => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return nextColumns;
    })
  };

  let newColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index)
    })
  }));

  return (
    <Table bordered 
      components={components} 
      rowSelection={rowSelection} 
      className="my_table" 
      dataSource={data} 
      columns={newColumns} 
      rowKey={record => record.key} 
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