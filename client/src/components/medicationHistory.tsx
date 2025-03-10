import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useAppContext } from "../contexts/userContexts";
import { useState} from "react";


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 350 },
  { field: 'name', headerName: 'DRUG NAME', width: 375 },
  { field: 'took_drug', headerName: 'DATE', width: 375 },
];

const paginationModel = { page: 0, pageSize: 5 };


interface MedicationHistoryProps {
    id: number;
    name: string;
    took_drug: string;
  }
   
   

  export default function MedicationHistory(){
    const { sharedValue } = useAppContext();
    const [tableData, setTableData] = useState<any[]>([]);
    const [showRecordTable,setShowRecordTable] = useState<boolean>(false);
    const dateOptions:any = {timeZone: "America/Denver", year:"numeric", month: "numeric",day: "numeric", hour: "2-digit", minute: "2-digit"};

    const transformData = (data: MedicationHistoryProps[]) => {
      const now = new Date();
      console.log(now.toLocaleString('en-US', dateOptions)); 
      return data.map(row => ({
        id: row.id,
        name: row.name,
        took_drug: new Date(row.took_drug).toLocaleString('en-US', dateOptions),
      }));
    };

  function getMedicationHistory(){
      axios.get(`http://localhost:3000/users/drugs/history/${sharedValue.id}`).then((response)=>{
        console.log(response.data);
          setTableData(transformData(response.data));
    }).then(()=>{
        setShowRecordTable(true)
    }).catch((error)=>{
        console.log(error)
    })
  }


  function DrugRecordsTable() {

    return (
      <>
      <button onClick={()=>setShowRecordTable(false)}>Hide History</button>
      <div className='records_table'>
      <Paper sx={{ height: 405, width: '80%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    </div>
    </>
    )
  }
  return(
    <>
    <button onClick={()=> getMedicationHistory()}> Show History</button>
    {showRecordTable && <DrugRecordsTable />}
    </>
  )
}