export interface contrato{
    id_contrato : number,
    nombre : string,
    nompre_proyecto : string,
    numero_contrato : string,
    descripcion : string,
    fecha_inicio : string,
    fecha_final : string,
    estatus : boolean,
    fk_id_planta : any,
    fk_id_usuario : number,
    fk_id_divisa : number,
    monto_total : number,
    monto_actual : number,
    fecha_registro : string
}