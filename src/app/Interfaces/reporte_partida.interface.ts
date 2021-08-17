export interface reporte_partida {
    fk_id_partida : number | undefined,
    cantidad : number | undefined
}

export interface ultimofoliopedido{
    folio: number,
    id_reporte: number,
    numero_pedido: number
}