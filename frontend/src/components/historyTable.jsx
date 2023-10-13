import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(date,imageUrl,output) {
  return { date,imageUrl,output };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function HistoryTable({items}) {
  return (
    <div className='hidden md:block'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              ["Date","Image","Output"].map(elem=>{
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
              key={row.imageUrl}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center' >
                <span className='text-xl'>{row.date.toString().slice(0,25)}</span>
              </TableCell>
              <TableCell align="center"><div className='flex justify-around'><img src={row.imageUrl} alt="" className='max-h-[30vh] max-w-[25vw] rounded-xl'/></div></TableCell>
              <TableCell align="center"><span className='text-xl max-w-[50vw]'>{row.output}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}