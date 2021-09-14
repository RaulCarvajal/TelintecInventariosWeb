export interface servicio{
    POS: number,
    descripcion: string,
    estatus: boolean,
    fecha_registro: string,
    fk_id_unidad_medida: number,
    id_servicios: number,
    precio_venta: number,
    unidad_medida: string,
    veces_utilizado: number
}

export interface servicio_datatable{
    POS: number,
    cantidad: number,
    descripcion: string,
    fk_id_servicio: number,
    id_solicitud: number,
    unidad_medida: string
}