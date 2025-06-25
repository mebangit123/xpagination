import React, { useEffect, useState } from 'react'
import axios from 'axios';
import style from './Pagination.module.css'
import { useSnackbar } from "notistack";

function PaginationPage({ updatePage, currentPage, totalPages }) {

    const handlePrev = () => {
        if(currentPage > 1){
            updatePage(prev => prev - 1)
        }
    }

    const handleNext = () => {
        if(totalPages != currentPage){
            updatePage(prev => prev + 1)
        }
    }

    return (
        <div className={style.paginationWrapper}>
            <button onClick={handlePrev} disabled={currentPage == 1}> 
              Previous               
            </button>

            <p className={style.pageCount}>{currentPage}</p>

            <button onClick={handleNext} disabled={totalPages == currentPage}>                
             Next
            </button>
        </div>
    )
}

function Pagination() {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentEmployeeList, setCurrentEmployeeList] = useState([]);
  const maxRecords = 10;
  const [totalPages, setTotalPages] = useState(0)
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
     const END_POINT = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
      axios.get(END_POINT)
      .then(data => setEmployeeList(data.data)).catch(e => alert('failed to fetch data'));
    // } catch (e) {
    //   if(e.response && e.response.status === 500) {
    //     enqueueSnackbar('failed to fetch data', {
    //       variant : 'error'
    //     })
    //   } else {
    //     enqueueSnackbar("Something went wrong", {
    //       variant : 'error'
    //     })
    //   }
    // }    
  },[]);

  useEffect(() => {

        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, employeeList.length)

        setCurrentEmployeeList([...employeeList].slice(startIndex, endIndex))
        setTotalPages(Math.ceil(employeeList.length / maxRecords))

    }, [currentPage, employeeList]);

  useEffect(() => {

      if(totalPages < currentPage && currentPage > 1){
          setCurrentPage(prev => prev - 1)
      }

  }, [totalPages])

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
            currentEmployeeList.map((emp) => (
              <tr key={emp.id}>
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
      {totalPages > 1 && (<PaginationPage updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}
    </div>
  )
}

export default Pagination
