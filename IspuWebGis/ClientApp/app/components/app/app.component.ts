import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    points: Array<String>

    center: __esri.PointProperties = {
        longitude: 40.971,
        latitude: 56.997,
    };

    centerChange(point: __esri.Point) {
        console.log('Center of map was changed: ' + '[longitude: ' + point.longitude + ', latitude: ' + point.latitude + ']');
    }

    /**
     * Setting with fakes
     */
    ngOnInit() {
        this.points = [];
        for (var i = 0; i < 15; i++) {
            this.points.push(`Point # ${i}`);
        }
    }
}
