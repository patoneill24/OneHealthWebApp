import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/userContexts";
import UserInfo from "../components/userInfo";
import LoggedOut from "../components/loggedOut";

interface MedicationsProps {
  drug_id: number;
  name: string;
}

export default function Medications() {
  const { sharedValue } = useAppContext();

  const [medications, setMedications] = useState<MedicationsProps[]>([]);
  
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
            <button>Yes</button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Medications</h1>
      <UserInfo />
      <MedicationList />
    </div>
  );
}