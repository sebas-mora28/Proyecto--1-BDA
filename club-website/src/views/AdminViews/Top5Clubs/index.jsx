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

const Top3Clubs = () => {

  const [clubs, setClubs] = useState([{name: "YOGA", category: "sport", number_of_suggestions: 10}]);

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

    axios({method: "GET", url: `${baseUrl}/clubs/getClubsTop5`}).then((response) => {
      if(response.data){
        setClubs(response.data)
      }
    })
  }, [])

  return (

    <Grid container>

      <Header title={"Top 5 clubes más sugeridos"} backUrl={"/admin/home"} />


      <Grid item container md={12} paddingLeft={1} paddingRight={2}>
        <TableContainer component={Paper} sx={{maxHeight: 450}}>
          <Table sx={{ minWidth: 600 }} stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Posición</StyledTableCell>
                <StyledTableCell align="center">Nombre del club</StyledTableCell>
                <StyledTableCell align="center">Categoría</StyledTableCell>
                <StyledTableCell align="center"># de sugerencias</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubs.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.category}</StyledTableCell>
                  <StyledTableCell align="center">{row.followers}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default Top3Clubs;
