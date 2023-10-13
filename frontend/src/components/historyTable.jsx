import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function HistoryTable({items}) {
  return (
    <div className='hidden md:block mx-2 border-[2px] border-blue-400 rounded-lg'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              ["Date and Time","Image","Output"].map(elem=>{
                return <TableCell align='center'><span className='text-2xl text-blue-700 font-bold'>{elem}</span></TableCell>
              })
            }
            {/* <TableCell align="center">Image</TableCell>
            <TableCell align="center">Output</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.inputImageURL}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center' >
              {/* .toString().slice(0,25) */}
                <span className='text-xl'>{row.Date.toString().split("T").join(" ").slice(0,-5)}</span>
              </TableCell>
              <TableCell align="center"><div className='flex justify-around'><img src={row.inputImageURL} alt="" className='max-h-[30vh] max-w-[25vw] rounded-xl'/></div></TableCell>
              <TableCell align="center"><span className='text-xl max-w-[50vw]'>{row.output}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}