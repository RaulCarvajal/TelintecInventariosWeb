export interface movimiento_partida{
    cantidad: number,
    fecha: string,
    folio_reporte: number,
    fk_id_reporte: number,
    id_movimeinto: number,
    nombre_contrato: string,
    numero_pedido: number,
    comentario: string
}

export interface movimiento{
    cantidad: number,
    comentario: string,
    fecha: string,
    fk_id_partida: number,
    fk_id_reporte: number | null | undefined,
    fk_id_usuario: number,
    id_movimeinto: number
}