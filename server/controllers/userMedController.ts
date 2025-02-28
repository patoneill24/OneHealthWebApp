import { selectUserDrugs, selectUserDrugRecordTable, selectUserDrugReportByDrug, selectUserDrugReport,selectUserTookDrugs, userTookDrug } from "../services/userMedQueries.js";

export const getUserDrugs = async(req:any, res:any) => {
    const { id } = req.params;
    try{
        const drugs = (await selectUserDrugs(id))?.rows;
        res.status(200).send(drugs);
    } catch (err: any) {
        console.error(err.message);
    }
}

export const addDrugRecord = async(req:any, res:any) => {
    const {user_id} = req.params;
    const {drug_id} = req.body;
    try{
        userTookDrug(user_id,drug_id);
        res.status(200).send({
            message: "successfully added notification",
        });        
    } catch (err: any) {
        console.error(err.message);
    }
}

export const getDrugRecords = async(req:any,res:any) => {
    const {user_id} = req.params;
    try{
        const drug_records = (await selectUserTookDrugs(user_id))?.rows;
        res.status(200).send(drug_records);
    }catch(err:any) {
        console.error(err.message);
    }
}

export const getUserDrugRecordTable = async(req:any,res:any) => {
    const {user_id} = req.params;
    try{
        const drug_records = (await selectUserDrugRecordTable(user_id))?.rows;
        res.status(200).send(drug_records);
    }catch(err:any) {
        console.error(err.message);
    }
}

export const getUserDrugReport = async(req:any,res:any) => {
    const {user_id} = req.params;
    try{
        const drug_report = (await selectUserDrugReport(user_id))?.rows;
        res.status(200).send(drug_report);
    }catch(err:any) {
        console.error(err.message);
    }
}

export const getUserDrugReportByDrug = async(req:any,res:any) => {
    const {user_id,drug_id} = req.params;
    try{
        const drug_report = (await selectUserDrugReportByDrug(user_id,drug_id))?.rows;
        res.status(200).send(drug_report);
    }catch(err:any) {
        console.error(err.message);
    }
}