export interface divisa{
    id_divisa : number,
    divisa_iso : string,
    divisa_nombre : string,
    estado : number | boolean
}

export interface um {
    estatus: boolean,
    id_unidad_medida: number,
    nombre: string
}

export interface marca {
    estatus: boolean,
    id_marca: number,
    nombre: string
}

export interface proveedor {
    email_contacto: string,
    estatus: boolean,
    fecha_registro: string,
    id_proveedor: number,
    nombre: string,
    nombre_contacto: string,
    telefono_contacto: string

}