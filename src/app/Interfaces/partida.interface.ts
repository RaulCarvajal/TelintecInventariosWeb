export interface partida {
    POS : number,
    nombre : string,
    descripcion : string,
    numero_parte : string,
    precio_unitario : number,
    cantidad : number,
    fk_id_inventario : number,
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
    fk_id_partida: number,
    id_reporte_partida: number
}