export interface reporte {
    id_reporte : number,
    folio : number,
    fecha : string,
    fk_id_contrato : number,
    numero_pedido : number,
    empresa : string,
    fk_id_planta : number,
    fk_id_area : number,
    ubicacion : string,
    responsable_cc : string,
    centro_costos : string,
    actividad_finalizada : boolean,
    fecha_inicio : string,
    fecha_fin : string
}
export interface pedido {
    id_reporte : number,
    folio : number,
    fecha : string,
    fk_id_contrato : number,
    numero_pedido : number,
    empresa : string,
    fk_id_planta : number,
    fk_id_area : number,
    ubicacion : string,
    responsable_cc : string,
    centro_costos : string,
    actividad_finalizada : boolean,
    fecha_inicio : string,
    fecha_fin : string
}

export interface reporte_tabla {
    id_reporte : number,
    folio : number,
    fecha : string,
    fk_id_contrato : number | undefined,
    contrato : string | undefined,
    numero_pedido : number | undefined,
    empresa : string,
    planta : string,
    area : string,
    ubicacion : string,
    responsable_cc : string,
    centro_costos : string,
    actividad_finalizada : boolean,
    fecha_inicio : string,
    fecha_fin : string
}

export interface reporte_text{
    actividad_finalizada: boolean,
    area: string,
    centro_costos: string,
    comentarios: string,
    contrato: string,
    numero_contrato: string,
    email: string,
    empresa: string,
    fecha: string,
    fecha_fin: string,
    fecha_inicio: string,
    folio: number
    id_reporte: number
    nombre: string,
    numero_pedido: number
    planta: string,
    responsable_cc: string,
    telefono: string,
    ubicacion: string,
}