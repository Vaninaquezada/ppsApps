import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Imagen {
    id: string;
    idimg?: string;
    usuario?: string;
    imagen?: SafeResourceUrl;
    fecha;
    tipo: string;
    votacion: [];
    votosFea?: number;
    votosLinda?: number;
}
