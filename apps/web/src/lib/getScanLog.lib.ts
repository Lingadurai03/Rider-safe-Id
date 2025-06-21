'use server'

import { ScanLogsApiResponse } from "@ridersafeid/types";
import { createServerAxios } from "./axiosServer.lib";

const axios = await createServerAxios();
export async function getScanLogs():Promise<ScanLogsApiResponse|void>{
    try{  
        const res = await axios.get('getLogs')
        return res.data
    }catch(e){
        console.error(e);
    }
}