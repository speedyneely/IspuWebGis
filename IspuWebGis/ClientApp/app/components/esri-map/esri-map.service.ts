import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { EsriLoaderService } from 'angular-esri-loader';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class EsriMapService {
    private readonly arcgisJSAPIUrl = 'https://js.arcgis.com/4.5/';
    private _mapView: __esri.MapView;

    constructor(private esriLoaderService: EsriLoaderService, private _zone: NgZone) { }

    createMap(mapViewProperties: __esri.MapViewProperties): Promise<void> {
        return this.esriLoaderService.load({
            url: this.arcgisJSAPIUrl
        }).then(() => {
            return this.esriLoaderService.loadModules([
                'esri/Map',
                'esri/views/MapView',
                "esri/Basemap"
            ]).then(([Map, MapView, Basemap]: [__esri.MapConstructor, __esri.MapViewConstructor, __esri.BasemapConstructor]) => {

                let mapProperties: __esri.MapProperties = {};
                let basemap: __esri.Basemap = Basemap.fromId('streets');
                mapProperties.basemap = basemap;
                let createdMap = new Map(mapProperties);

                mapViewProperties.zoom = 16;
                mapViewProperties.map = createdMap;

                this._mapView = new MapView(mapViewProperties);
                return;
            });
        });
    }

    getCenter(): Promise<__esri.Point> {
        return new Promise<__esri.Point>((resolve, reject) => {
            resolve(this._mapView.center);
        });
    }

    subscribeToMapEvent<E>(eventName: string): Observable<E> {
        return Observable.create((observer: Observer<E>) => {
            this._mapView.on(eventName, (arg: E) => {
                this._zone.run(() => observer.next(arg));
            });
        });
    }
}