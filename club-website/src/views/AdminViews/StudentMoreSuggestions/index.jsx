import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Header from '../../../components/Header';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utils/api';

const  StudentMoreSuggestions = () => {

  const [students, setStudents] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
      axios({method: 'GET', url: `${baseUrl}/clubs/usersTopSubs`}).then((response) => {
        if(response.data){
          setStudents(response.data)
        }
      })
  }, [])


  return (
    <Grid container>
      <Header title={"Estudiantes con mas sugerencias"} backUrl={"/admin/home"}/>

      <Grid item container md={12} paddingLeft={1} paddingRight={2} justifyContent={'center'}>
        <TableContainer component={Paper} sx={{ maxHeight: 450, maxWidth:600}}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nombre del estudiante</StyledTableCell>
                <StyledTableCell align="center"># de sugerencias</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">{row.names} {row.lastnames}</StyledTableCell>
                  <StyledTableCell align="center">{row.count}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>


    </Grid>
  )
}

export default StudentMoreSuggestions;
