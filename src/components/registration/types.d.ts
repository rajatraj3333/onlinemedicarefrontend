import { RegisterFields } from "../login/constatnt"

export type data = {

    name?: string,
    fullname: string,
    roles: string
    firstname?: string,
    lastname?: string,
    password:string
    email:string
    department:string
}

type registertype ={
    name:string,
    fullname:string,
    department:string,
    email:string,
    password:string
}

interface Response{
    message:string,
    error:string,
    status:number
    token:string
    response?:string
    url?:string
}
type ResponseType = {
    status?:number
    data:Response
}

type DoctorDetails ={
    fullname:string,
    department:string,
    fees:string|number
}

export type ClinicResponse = {
    id:number,
    clinic_id:number
    clinic_name:string
    clininc_address:string,
    clinic_phone:number,
    clinic_employee_no:number|null
}


export type Modaltypes ={
    title:string,
    open: string|boolean,
    style: string|undefined|CSSProperties,
    okText: string,
    onCancel: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void|string,
    onOk: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void|string|boolean,
    okButtonProps: {disabled:boolean},
}

export type Datatypes = storeData | Fields | registerDatatype

export type responseDataype = ResponseType

export type registerDatatype = registertype

export type storeData = data | registertype

