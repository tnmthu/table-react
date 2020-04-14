import React from 'react';
import './App.scss';
import TableTemplate from './components/Table';
import ActionForm from './components/ActionForm';
import { Button } from 'antd';

function App() {
  return (
    <div className="container">
      <TableTemplate />
      <div className="right">
        <div className="buttons">
          <Button className="btn btn__add">Add</Button>
          <Button className="btn btn__delete">Delete</Button>
          <Button className="btn btn__save">Save</Button>
        </div>
        <ActionForm />
      </div>
    </div>
  );
}

export default App;
