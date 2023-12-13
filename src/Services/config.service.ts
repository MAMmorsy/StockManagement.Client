import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  loadJSON(filePath: string) {
    const json: any = this.loadTextFileAjaxSync(filePath, "application/json");
    return JSON.parse(json);
}

loadTextFileAjaxSync(filePath: string, mimeType: string ) {

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (mimeType != null) {
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType(mimeType);
        }
    }
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        return xmlhttp.responseText;
    }
    else {
        return null;
    }
}
}
