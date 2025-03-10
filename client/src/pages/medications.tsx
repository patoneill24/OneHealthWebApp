import { useEffect, useState} from "react";
import { useAppContext } from "../contexts/userContexts";
import UserInfo from "../components/userInfo";
import LoggedOut from "../components/loggedOut";
import axios from "axios";
import MedicationRecords from "../components/medicationRecords";
import MedicationHistory from "../components/medicationHistory";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMedications } from "../hooks/useMedications";
import { useUserMedicationsContext } from "../contexts/userMedicationsContexts";

interface schedule {
  event_id: number;
  user_id: number;
  drug_id: number;
  scheduled_time: string;
  status: string;
}

// let localTime = new Date(nowUTC.getTime() - nowUTC.getTimezoneOffset() * 60000);

export default function Medications() {
  const { sharedValue } = useAppContext();
  const { getMedications } = useMedications();
  const [schedules, setSchedules] = useState<schedule[]>([]);
  const dateOptions:any = { year:"numeric", month: "numeric",day: "numeric", hour: "2-digit", minute: "2-digit"};

  const {userMedications} = useUserMedicationsContext();

  
  function tookDrug(drug_number: number, drug_name: string,take_next: string){
    const now = new Date();
    const take_drug = new Date(take_next).getTime() - new Date(take_next).getTimezoneOffset() * 60000;
    if(take_drug  > now.getTime()){
      alert(`You cannot take ${drug_name} until ${new Date(take_next).toLocaleString('en-US',dateOptions)}` );
      return;
    }
    axios.post(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}`,{
        drug_id: drug_number
    })
    .then((response)=>{
      console.log(response);
      alert(`You have taken ${drug_name}`);
    }).then(()=>{
      getMedications();
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  function getSchedule(){
    axios.get(`http://localhost:3000/users/drugs/schedule/${sharedValue.id}`)
    .then((response)=>{
      setSchedules(response.data);
    })
    .catch((error)=>{
      console.log(error)
    })
  }



  useEffect(() => {
    getMedications();
    getSchedule();
  }, []);
 
  if(sharedValue.name === ""){
    return(
      <>
      <LoggedOut />
      </>
  )}

  
  
  function MedicationTable() {
    return (
      <TableContainer component={Paper} sx={{width: "80%"}} >
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Medication Name</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>Last Taken</TableCell>
              <TableCell>Take Medication At</TableCell>
              <TableCell>Recording</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userMedications.map((row) => (
              <TableRow
                key={row.drug_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.drug_id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.dosage}</TableCell>
                <TableCell>
                  {row.last_taken
                    ? `${new Date(row.last_taken).toLocaleString('en-US',dateOptions)}`
                    : 'N/A'}
                </TableCell>
                <TableCell>
                {row.take_next
                    ? `${new Date(row.take_next).toLocaleString('en-US',dateOptions)}`
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <button onClick={()=>tookDrug(row.drug_id,row.name, row.take_next)}>Take Medication</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }


  return (
    <div >
      <h1>Medications</h1>
      {/* <h2>Schedule</h2>
      {schedules.map((schedule) => (
        <div key={schedule.event_id}>
          <h2>{schedule.drug_id}</h2>
          <h3>{schedule.scheduled_time}</h3>
          <p>{schedule.status}</p>
        </div>
      ))} */}
      <UserInfo />
      <div className="medication_info_table">
        <MedicationTable />
      </div>
      <div className="medication_records">
        <MedicationHistory />
      </div>
    </div>
  );
}