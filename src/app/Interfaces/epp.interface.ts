export interface epp{
    cantidad: number,
    fk_id_marca: number,
    fk_id_proveedor: number,
    fk_id_tipo: number,
    id_epp: number,
    marca: string,
    nombre: string,
    proveedor: string,
    tipo: string
}

export interface epps_res{
    err : boolean,
    msg : string,
    id : number
}

export interface epp_sol{
    asignado: string,
    atendido: boolean,
    comentarios: string,
    fecha_solicitud: string,
    fk_id_usuario_solicitante: number,
    id_solicitudes: number,
    solicitante: string,
    ubicacion: string,
    visto: boolean
}

export interface eppsol{
    cantidad: number,
    fk_id_epp: number,
    id_epp_sol: number,
    nombre: string
}