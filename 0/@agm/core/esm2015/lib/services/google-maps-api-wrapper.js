import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
export class GoogleMapsAPIWrapper {
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise((resolve) => { this._mapResolver = resolve; });
    }
    createMap(el, mapOptions) {
        return this._zone.runOutsideAngular(() => {
            return this._loader.load().then(() => {
                const map = new google.maps.Map(el, mapOptions);
                this._mapResolver(map);
                return;
            });
        });
    }
    setMapOptions(options) {
        return this._zone.runOutsideAngular(() => {
            this._map.then((m) => { m.setOptions(options); });
        });
    }
    /**
     * Creates a google map marker with the map context
     */
    createMarker(options = {}, addToMap = true) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => {
                if (addToMap) {
                    options.map = map;
                }
                return new google.maps.Marker(options);
            });
        });
    }
    createInfoWindow(options) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then(() => new google.maps.InfoWindow(options));
        });
    }
    /**
     * Creates a google.map.Circle for the current map.
     */
    createCircle(options) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => {
                options.map = map;
                return new google.maps.Circle(options);
            });
        });
    }
    /**
     * Creates a google.map.Rectangle for the current map.
     */
    createRectangle(options) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => {
                options.map = map;
                return new google.maps.Rectangle(options);
            });
        });
    }
    createPolyline(options) {
        return this._zone.runOutsideAngular(() => {
            return this.getNativeMap().then((map) => {
                const line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        });
    }
    createPolygon(options) {
        return this._zone.runOutsideAngular(() => {
            return this.getNativeMap().then((map) => {
                const polygon = new google.maps.Polygon(options);
                polygon.setMap(map);
                return polygon;
            });
        });
    }
    /**
     * Creates a new google.map.Data layer for the current map
     */
    createDataLayer(options) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then(m => {
                const data = new google.maps.Data(options);
                data.setMap(m);
                return data;
            });
        });
    }
    /**
     * Creates a TransitLayer instance for a map
     * @returns a new transit layer object
     */
    createTransitLayer() {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => {
                const newLayer = new google.maps.TransitLayer();
                newLayer.setMap(map);
                return newLayer;
            });
        });
    }
    /**
     * Creates a BicyclingLayer instance for a map
     * @returns a new bicycling layer object
     */
    createBicyclingLayer() {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => {
                const newLayer = new google.maps.BicyclingLayer();
                newLayer.setMap(map);
                return newLayer;
            });
        });
    }
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    containsLocation(latLng, polygon) {
        return this._map.then(() => google.maps.geometry.poly.containsLocation(latLng, polygon));
    }
    subscribeToMapEvent(eventName) {
        return new Observable((observer) => {
            this._map.then(m => m.addListener(eventName, () => this._zone.run(() => observer.next(arguments[0]))));
        });
    }
    clearInstanceListeners() {
        return this._zone.runOutsideAngular(() => {
            this._map.then((map) => {
                google.maps.event.clearInstanceListeners(map);
            });
        });
    }
    setCenter(latLng) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.setCenter(latLng));
        });
    }
    getZoom() {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.getZoom());
        });
    }
    getBounds() {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.getBounds());
        });
    }
    getMapTypeId() {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.getMapTypeId());
        });
    }
    setZoom(zoom) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.setZoom(zoom));
        });
    }
    getCenter() {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.getCenter());
        });
    }
    panTo(latLng) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.panTo(latLng));
        });
    }
    panBy(x, y) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.panBy(x, y));
        });
    }
    fitBounds(latLng, padding) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.fitBounds(latLng, padding));
        });
    }
    panToBounds(latLng, padding) {
        return this._zone.runOutsideAngular(() => {
            return this._map.then((map) => map.panToBounds(latLng, padding));
        });
    }
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    getNativeMap() { return this._map; }
    /**
     * Triggers the given event name on the map instance.
     */
    triggerMapEvent(eventName) {
        return this._map.then((m) => google.maps.event.trigger(m, eventName));
    }
}
GoogleMapsAPIWrapper.decorators = [
    { type: Injectable }
];
GoogleMapsAPIWrapper.ctorParameters = () => [
    { type: MapsAPILoader },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saWIvc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFbEU7OztHQUdHO0FBRUgsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQixZQUFvQixPQUFzQixFQUFVLEtBQWE7UUFBN0MsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDL0QsSUFBSSxDQUFDLElBQUk7WUFDTCxJQUFJLE9BQU8sQ0FBa0IsQ0FBQyxPQUFtQixFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxTQUFTLENBQUMsRUFBZSxFQUFFLFVBQWtDO1FBQzNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixPQUFPO1lBQ1QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENB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QyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQWtFLEVBQUUsT0FBc0M7UUFDcEgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWSxLQUErQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTlEOztPQUVHO0lBQ0gsZUFBZSxDQUFDLFNBQWlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7WUFsT0YsVUFBVTs7O1lBTkYsYUFBYTtZQUhELE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlcic7XG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyB0aGF0IGhhbmRsZXMgdGhlIGNvbW11bmljYXRpb24gd2l0aCB0aGUgR29vZ2xlIE1hcHMgSmF2YXNjcmlwdFxuICogQVBJIHYzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHb29nbGVNYXBzQVBJV3JhcHBlciB7XG4gIHByaXZhdGUgX21hcDogUHJvbWlzZTxnb29nbGUubWFwcy5NYXA+O1xuICBwcml2YXRlIF9tYXBSZXNvbHZlcjogKHZhbHVlPzogZ29vZ2xlLm1hcHMuTWFwKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvYWRlcjogTWFwc0FQSUxvYWRlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5fbWFwID1cbiAgICAgICAgbmV3IFByb21pc2U8Z29vZ2xlLm1hcHMuTWFwPigocmVzb2x2ZTogKCkgPT4gdm9pZCkgPT4geyB0aGlzLl9tYXBSZXNvbHZlciA9IHJlc29sdmU7IH0pO1xuICB9XG5cbiAgY3JlYXRlTWFwKGVsOiBIVE1MRWxlbWVudCwgbWFwT3B0aW9uczogZ29vZ2xlLm1hcHMuTWFwT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsLCBtYXBPcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbWFwUmVzb2x2ZXIobWFwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXBPcHRpb25zKG9wdGlvbnM6IGdvb2dsZS5tYXBzLk1hcE9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9tYXAudGhlbigobTogZ29vZ2xlLm1hcHMuTWFwKSA9PiB7IG0uc2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGdvb2dsZSBtYXAgbWFya2VyIHdpdGggdGhlIG1hcCBjb250ZXh0XG4gICAqL1xuICBjcmVhdGVNYXJrZXIob3B0aW9uczogZ29vZ2xlLm1hcHMuTWFya2VyT3B0aW9ucyA9IHt9LCBhZGRUb01hcDogYm9vbGVhbiA9IHRydWUpOlxuICAgICAgUHJvbWlzZTxnb29nbGUubWFwcy5NYXJrZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogZ29vZ2xlLm1hcHMuTWFwKSA9PiB7XG4gICAgICAgIGlmIChhZGRUb01hcCkge1xuICAgICAgICAgIG9wdGlvbnMubWFwID0gbWFwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVJbmZvV2luZG93KG9wdGlvbnM/OiBnb29nbGUubWFwcy5JbmZvV2luZG93T3B0aW9ucyk6IFByb21pc2U8Z29vZ2xlLm1hcHMuSW5mb1dpbmRvdz4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigoKSA9PiBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyhvcHRpb25zKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGdvb2dsZS5tYXAuQ2lyY2xlIGZvciB0aGUgY3VycmVudCBtYXAuXG4gICAqL1xuICBjcmVhdGVDaXJjbGUob3B0aW9uczogZ29vZ2xlLm1hcHMuQ2lyY2xlT3B0aW9ucyk6IFByb21pc2U8Z29vZ2xlLm1hcHMuQ2lyY2xlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IGdvb2dsZS5tYXBzLk1hcCkgPT4ge1xuICAgICAgICBvcHRpb25zLm1hcCA9IG1hcDtcbiAgICAgICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5DaXJjbGUob3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZ29vZ2xlLm1hcC5SZWN0YW5nbGUgZm9yIHRoZSBjdXJyZW50IG1hcC5cbiAgICovXG4gIGNyZWF0ZVJlY3RhbmdsZShvcHRpb25zOiBnb29nbGUubWFwcy5SZWN0YW5nbGVPcHRpb25zKTogUHJvbWlzZTxnb29nbGUubWFwcy5SZWN0YW5nbGU+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogZ29vZ2xlLm1hcHMuTWFwKSA9PiB7XG4gICAgICAgIG9wdGlvbnMubWFwID0gbWFwO1xuICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLlJlY3RhbmdsZShvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlUG9seWxpbmUob3B0aW9uczogZ29vZ2xlLm1hcHMuUG9seWxpbmVPcHRpb25zKTogUHJvbWlzZTxnb29nbGUubWFwcy5Qb2x5bGluZT4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZU1hcCgpLnRoZW4oKG1hcDogZ29vZ2xlLm1hcHMuTWFwKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUob3B0aW9ucyk7XG4gICAgICAgIGxpbmUuc2V0TWFwKG1hcCk7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVQb2x5Z29uKG9wdGlvbnM6IGdvb2dsZS5tYXBzLlBvbHlnb25PcHRpb25zKTogUHJvbWlzZTxnb29nbGUubWFwcy5Qb2x5Z29uPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlTWFwKCkudGhlbigobWFwOiBnb29nbGUubWFwcy5NYXApID0+IHtcbiAgICAgICAgY29uc3QgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKG9wdGlvbnMpO1xuICAgICAgICBwb2x5Z29uLnNldE1hcChtYXApO1xuICAgICAgICByZXR1cm4gcG9seWdvbjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZ29vZ2xlLm1hcC5EYXRhIGxheWVyIGZvciB0aGUgY3VycmVudCBtYXBcbiAgICovXG4gIGNyZWF0ZURhdGFMYXllcihvcHRpb25zPzogZ29vZ2xlLm1hcHMuRGF0YS5EYXRhT3B0aW9ucyk6IFByb21pc2U8Z29vZ2xlLm1hcHMuRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihtID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBnb29nbGUubWFwcy5EYXRhKG9wdGlvbnMpO1xuICAgICAgICBkYXRhLnNldE1hcChtKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgVHJhbnNpdExheWVyIGluc3RhbmNlIGZvciBhIG1hcFxuICAgKiBAcmV0dXJucyBhIG5ldyB0cmFuc2l0IGxheWVyIG9iamVjdFxuICAgKi9cbiAgY3JlYXRlVHJhbnNpdExheWVyKCk6IFByb21pc2U8Z29vZ2xlLm1hcHMuVHJhbnNpdExheWVyPntcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogZ29vZ2xlLm1hcHMuTWFwKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0xheWVyOiBnb29nbGUubWFwcy5UcmFuc2l0TGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuVHJhbnNpdExheWVyKCk7XG4gICAgICAgIG5ld0xheWVyLnNldE1hcChtYXApO1xuICAgICAgICByZXR1cm4gbmV3TGF5ZXI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgQmljeWNsaW5nTGF5ZXIgaW5zdGFuY2UgZm9yIGEgbWFwXG4gICAqIEByZXR1cm5zIGEgbmV3IGJpY3ljbGluZyBsYXllciBvYmplY3RcbiAgICovXG4gIGNyZWF0ZUJpY3ljbGluZ0xheWVyKCk6IFByb21pc2U8Z29vZ2xlLm1hcHMuQmljeWNsaW5nTGF5ZXI+e1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBnb29nbGUubWFwcy5NYXApID0+IHtcbiAgICAgICAgY29uc3QgbmV3TGF5ZXI6IGdvb2dsZS5tYXBzLkJpY3ljbGluZ0xheWVyID0gbmV3IGdvb2dsZS5tYXBzLkJpY3ljbGluZ0xheWVyKCk7XG4gICAgICAgIG5ld0xheWVyLnNldE1hcChtYXApO1xuICAgICAgICByZXR1cm4gbmV3TGF5ZXI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSBpbnNpdGUgYSBQb2x5Z29uIHBhdGguXG4gICAqL1xuICBjb250YWluc0xvY2F0aW9uKGxhdExuZzogZ29vZ2xlLm1hcHMuTGF0TG5nLCBwb2x5Z29uOiBnb29nbGUubWFwcy5Qb2x5Z29uKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKCgpID0+IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnBvbHkuY29udGFpbnNMb2NhdGlvbihsYXRMbmcsIHBvbHlnb24pKTtcbiAgfVxuXG4gIHN1YnNjcmliZVRvTWFwRXZlbnQ8TiBleHRlbmRzIGtleW9mIGdvb2dsZS5tYXBzLk1hcEhhbmRsZXJNYXA+KGV2ZW50TmFtZTogTilcbiAgICAgIDogT2JzZXJ2YWJsZTxnb29nbGUubWFwcy5NYXBIYW5kbGVyTWFwW05dPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgdGhpcy5fbWFwLnRoZW4obSA9PlxuICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChhcmd1bWVudHNbMF0pKSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhckluc3RhbmNlTGlzdGVuZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX21hcC50aGVuKChtYXA6IGdvb2dsZS5tYXBzLk1hcCkgPT4ge1xuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5jbGVhckluc3RhbmNlTGlzdGVuZXJzKG1hcCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldENlbnRlcihsYXRMbmc6IGdvb2dsZS5tYXBzLkxhdExuZ0xpdGVyYWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcDogZ29vZ2xlLm1hcHMuTWFwKSA9PiBtYXAuc2V0Q2VudGVyKGxhdExuZykpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Wm9vbSgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBnb29nbGUubWFwcy5NYXApID0+IG1hcC5nZXRab29tKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Qm91bmRzKCk6IFByb21pc2U8Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXA6IGdvb2dsZS5tYXBzLk1hcCkgPT4gbWFwLmdldEJvdW5kcygpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1hcFR5cGVJZCgpOiBQcm9taXNlPGdvb2dsZS5tYXBzLk1hcFR5cGVJZD4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBnb29nbGUubWFwcy5NYXApID0+IG1hcC5nZXRNYXBUeXBlSWQoKSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRab29tKHpvb206IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBnb29nbGUubWFwcy5NYXApID0+IG1hcC5zZXRab29tKHpvb20pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENlbnRlcigpOiBQcm9taXNlPGdvb2dsZS5tYXBzLkxhdExuZz4ge1xuICAgIHJldHVybiB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbigobWFwOiBnb29nbGUubWFwcy5NYXApID0+IG1hcC5nZXRDZW50ZXIoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwYW5UbyhsYXRMbmc6IGdvb2dsZS5tYXBzLkxhdExuZyB8IGdvb2dsZS5tYXBzLkxhdExuZ0xpdGVyYWwpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcCkgPT4gbWFwLnBhblRvKGxhdExuZykpO1xuICAgIH0pO1xuICB9XG5cbiAgcGFuQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG1hcCkgPT4gbWFwLnBhbkJ5KHgsIHkpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpdEJvdW5kcyhsYXRMbmc6IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyB8IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc0xpdGVyYWwsIHBhZGRpbmc/OiBudW1iZXIgfCBnb29nbGUubWFwcy5QYWRkaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXApID0+IG1hcC5maXRCb3VuZHMobGF0TG5nLCBwYWRkaW5nKSk7XG4gICAgfSk7XG4gIH1cblxuICBwYW5Ub0JvdW5kcyhsYXRMbmc6IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyB8IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kc0xpdGVyYWwsIHBhZGRpbmc/OiBudW1iZXIgfCBnb29nbGUubWFwcy5QYWRkaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKChtYXApID0+IG1hcC5wYW5Ub0JvdW5kcyhsYXRMbmcsIHBhZGRpbmcpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYXRpdmUgR29vZ2xlIE1hcHMgTWFwIGluc3RhbmNlLiBCZSBjYXJlZnVsIHdoZW4gdXNpbmcgdGhpcyBpbnN0YW5jZSBkaXJlY3RseS5cbiAgICovXG4gIGdldE5hdGl2ZU1hcCgpOiBQcm9taXNlPGdvb2dsZS5tYXBzLk1hcD4geyByZXR1cm4gdGhpcy5fbWFwOyB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIHRoZSBnaXZlbiBldmVudCBuYW1lIG9uIHRoZSBtYXAgaW5zdGFuY2UuXG4gICAqL1xuICB0cmlnZ2VyTWFwRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oKG0pID0+IGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobSwgZXZlbnROYW1lKSk7XG4gIH1cbn1cbiJdfQ==