export interface partida {
    POS : number,
    pos : number,
    nombre : string,
    descripcion : string,
    numero_parte : string,
    precio_unitario : number,
    precio_unitario_compra : number,
    cantidad : number,
    fk_id_proveedor : number,
    fk_id_marca : number,
    fk_id_unidad_medida : number,
    id_partida : number,
    fecha_registro : string,
    unidades: string | undefined
}

export interface partida_reporte{
    POS: number,
    cantidad: number,
    descripcion: string,
    unidad_medida: string,
    fk_id_partida: number,
    id_reporte_partida: number
}

export interface partida_datatable{
    POS : number,
    pos : number,
    nombre : string,
    descripcion : string,
    numero_parte : string,
    precio_unitario : number,
    precio_unitario_compra : number,
    cantidad : number,
    proveedor : number,
    marca : number,
    unidad_medida : number,
    id_partida : number,
    fecha_registro : string,
    unidades: string | undefined,
    id_pos_partida : number
}

export interface partida_remito{
    POS: number | string,
    PU: number | string,
    UM: string,
    cantidad: number,
    descripcion: string,
    total: number | string
}