export interface solicitud_material{
    area: string,
    comentarios: string,
    contrato: string,
    estatus: number,
    fecha_aceptada: string,
    fecha_critica: string,
    fecha_remision_reporte: string,
    fecha_solicitud: string,
    fecha_surtido_parcial: string,
    fecha_surtido_total: string,
    fk_id_area: number,
    fk_id_contrato: number,
    fk_id_usuario_solicitante: number,
    id_solicitud: number,
    ubicacion: string,
    usuario_solicitante: string,
    visto: boolean
} 

export interface partida_solicitud{
    cantidad: number,
    cantidad_inventario: number,
    fk_id_partida: number,
    id_solicitud: number,
    partida: string,
    surtido: boolean
}