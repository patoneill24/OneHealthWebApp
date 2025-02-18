import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/userContexts";
import UserInfo from "../components/userInfo";
import LoggedOut from "../components/loggedOut";
import axios from "axios";
import toTitleCase from "../utils/titleCase";

interface MedicationsProps {
  drug_id: number;
  name: string;
}

interface MedicationRecordProps {
  user_took_drugs_id: number;
  name: string;
  took_drug: string;
}

export default function Medications() {
  const { sharedValue } = useAppContext();

  const [medications, setMedications] = useState<MedicationsProps[]>([]);

  const [medicationRecords, setMedicationRecords] = useState<MedicationRecordProps[]>([]);

  const [showRecords, setShowRecords] = useState(false);
  const options:any  = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' , timeZone:'UTC'};
  
  function tookDrug(drug_number: number){
    axios.post(`http://localhost:3000/users/tookdrugs/${sharedValue.id}`,{
        drug_id: drug_number
    })
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  function getRecords(){
    axios.get(`http://localhost:3000/users/tookdrugs/${sharedValue.id}`)
    .then((response)=>{
      console.log(response.data);
      setMedicationRecords(response.data)
      setShowRecords(true);
    })
  }


  useEffect(() => {
    fetch(`http://localhost:3000/users/drugs/${sharedValue.id}`)
      .then((response) => response.json())
      .then((data) => setMedications(data))
      .catch((error) => console.error(error));
  }, []);
 
  if(sharedValue.name === ""){
    return(
      <LoggedOut />
  )}

  function MedicationRecords(){
    return(
      <>
      <button onClick={()=>setShowRecords(false)}>Hide Records</button>
        {medicationRecords.map((medicationRecord)=>(
            <div key={medicationRecord.user_took_drugs_id}>
              <h1>{toTitleCase(medicationRecord.name)}</h1>
              <h2>{new Date(medicationRecord.took_drug).toLocaleString('en-US', options)}</h2>
            </div>
        ))}
      </>
    )
  }

  function MedicationList(){
    if(medications.length === 0){
      return(
        <div>
          <h1>You have no medications</h1>
        </div>
      )
    }
    return(
      <div>
        {medications.map((medication) => (
          <div key={medication.drug_id}>
            <h2>Have you taken your {medication.name} Today?</h2>
            <button onClick={()=>tookDrug(medication.drug_id)}>Yes</button>
          </div>
        ))}
        <button onClick={()=> getRecords()}> Show Records</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Medications</h1>
      <UserInfo />
      <MedicationList />
      {showRecords && <MedicationRecords/>}
    </div>
  );
}