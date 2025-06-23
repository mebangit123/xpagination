import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Pagination.module.css'

function Pagination() {
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    try {
      const response = axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      response.then(data => setEmployeeList(data.data));
    } catch (error) {
      console.log(error);
    }    
  },[]);

  return (
    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      <h1 style={{fontWeight: 700}}>Employee Data Table</h1>
      <div style={{width: '100vw'}}>
        <table className={style.tbl}>
          <thead className={style.tblhead}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>  
          <tbody className={style.tblbody}>
            {
            employeeList.map((emp) => (
              <tr>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>              
              ))
            }
          </tbody>                  
        </table>
      </div>
    </div>
  )
}

export default Pagination
