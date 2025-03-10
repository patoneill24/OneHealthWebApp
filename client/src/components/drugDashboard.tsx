import { useMedications } from "../hooks/useMedications";
import { useUserMedicationsContext } from "../contexts/userMedicationsContexts"
import { useEffect, useState} from "react";
import axios from "axios";
import { useAppContext } from "../contexts/userContexts";


interface DrugReport {
    id: number;
    user_id: number;
    med_stats: string;
    quantity: number;
}

export default function DrugDashboard(){
    const { getMedications } = useMedications();
    const {userMedications} = useUserMedicationsContext();
    const { sharedValue } = useAppContext();
    const [report, setReport] = useState<DrugReport[]>([]);
    const [filter, setFilter] = useState<number>(0);
    const dateOptions:any = {year:"numeric", month: "numeric",day: "numeric", hour: "2-digit", minute: "2-digit"};


    function getDrugReport(){
        axios.get(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}/report`).then((response)=>{
            console.log(response.data);
            setReport(response.data);
        })
    }

    function getDrugReportByDrug(drug_id:number){
        if(drug_id === 0){
            getDrugReport();
            setFilter(0);
            return;
        }
        axios.get(`http://localhost:3000/users/drugs/tookdrugs/${sharedValue.id}/report/${drug_id}`).then((response)=>{
            console.log(response.data);
            setReport(response.data);
            setFilter(drug_id);
        }
        )
    }

    function filterMedications(med: {drug_id:number}){
        console.log(med);
        if(filter !== 0){
            if(med.drug_id === filter){
                return true;
            }
            return false;
        }
        return true;

    }

    useEffect(() => {
        getMedications();
        getDrugReport();
      }, []);
    return(
        <div id = "notification-preview" className = "card">
            <h2>Medications</h2>
            <select name="selectedMedication" id="selectedMedication" onChange={(e) => getDrugReportByDrug(parseInt(e.target.value))}>
                <option value="0">All Medications</option>
                {userMedications.map((med) => (
                    <option key={med.drug_id} value={med.drug_id}>{med.name}</option>
                ))}
            </select>
            <div className="medication">
                {userMedications.filter(filterMedications).map((med) => (
                    <div key={med.drug_id} className="medication">
                        <h3>{med.name}</h3>
                        <p> Next Dosage: {new Date(med.take_next).toLocaleString('en-US',dateOptions)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}