'use server'

import { ScanLogsApiResponse } from "@ridersafeid/types";
import { createServerAxios } from "./axiosServer.lib";

export async function getScanLogs():Promise<ScanLogsApiResponse|void>{
    const axios = await createServerAxios();
    try{  
        const res = await axios.get('getLogs')
        return res.data
    }catch(e){
        console.error(e);
    }
}