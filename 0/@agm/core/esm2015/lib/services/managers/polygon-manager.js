import { __awaiter } from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, skip, startWith, switchMap } from 'rxjs/operators';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
export class PolygonManager {
    constructor(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    addPolygon(path) {
        const polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    }
    updatePolygon(polygon) {
        const m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => this._zone.run(() => { l.setPaths(polygon.paths); }));
    }
    setPolygonOptions(path, options) {
        return this._polygons.get(path).then((l) => { l.setOptions(options); });
    }
    deletePolygon(paths) {
        const m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then((l) => {
            return this._zone.run(() => {
                l.setMap(null);
                this._polygons.delete(paths);
            });
        });
    }
    getPath(polygonDirective) {
        return this._polygons.get(polygonDirective)
            .then((polygon) => polygon.getPath().getArray());
    }
    getPaths(polygonDirective) {
        return this._polygons.get(polygonDirective)
            .then((polygon) => polygon.getPaths().getArray().map((p) => p.getArray()));
    }
    createEventObservable(eventName, path) {
        return new Observable((observer) => {
            this._polygons.get(path).then((l) => {
                l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
            });
        });
    }
    createPathEventObservable(agmPolygon) {
        return __awaiter(this, void 0, void 0, function* () {
            const polygon = yield this._polygons.get(agmPolygon);
            const paths = polygon.getPaths();
            const pathsChanges$ = createMVCEventObservable(paths);
            return pathsChanges$.pipe(startWith({ newArr: paths.getArray() }), // in order to subscribe to them all
            switchMap(parentMVEvent => merge(... // rest parameter
            parentMVEvent.newArr.map((chMVC, index) => createMVCEventObservable(chMVC)
                .pipe(map(chMVCEvent => ({ parentMVEvent, chMVCEvent, pathIndex: index })))))
                .pipe(// start the merged ob with an event signinifing change to parent
            startWith({ parentMVEvent, chMVCEvent: null, pathIndex: null }))), skip(1), // skip the manually added event
            map(({ parentMVEvent, chMVCEvent, pathIndex }) => {
                let retVal;
                if (!chMVCEvent) {
                    retVal = {
                        newArr: parentMVEvent.newArr.map(subArr => subArr.getArray().map(latLng => latLng.toJSON())),
                        eventName: parentMVEvent.eventName,
                        index: parentMVEvent.index,
                    };
                    if (parentMVEvent.previous) {
                        retVal.previous = parentMVEvent.previous.getArray();
                    }
                }
                else {
                    retVal = {
                        newArr: parentMVEvent.newArr.map(subArr => subArr.getArray().map(latLng => latLng.toJSON())),
                        pathIndex,
                        eventName: chMVCEvent.eventName,
                        index: chMVCEvent.index,
                    };
                    if (chMVCEvent.previous) {
                        retVal.previous = chMVCEvent.previous;
                    }
                }
                return retVal;
            }));
        });
    }
}
PolygonManager.decorators = [
    { type: Injectable }
];
PolygonManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGliL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR2xFLE1BQU0sT0FBTyxjQUFjO0lBSXpCLFlBQW9CLFlBQWtDLEVBQVUsS0FBYTtRQUF6RCxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBSHJFLGNBQVMsR0FDZixJQUFJLEdBQUcsRUFBNEMsQ0FBQztJQUUyQixDQUFDO0lBRWxGLFVBQVUsQ0FBQyxJQUFnQjtRQUN6QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUNyRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FB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Wm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNraXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBZ21Qb2x5Z29uIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9wb2x5Z29uJztcbmltcG9ydCB7IGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZSwgTVZDRXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9tdmNhcnJheS11dGlscyc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvbHlnb25NYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfcG9seWdvbnM6IE1hcDxBZ21Qb2x5Z29uLCBQcm9taXNlPGdvb2dsZS5tYXBzLlBvbHlnb24+PiA9XG4gICAgbmV3IE1hcDxBZ21Qb2x5Z29uLCBQcm9taXNlPGdvb2dsZS5tYXBzLlBvbHlnb24+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cblxuICBhZGRQb2x5Z29uKHBhdGg6IEFnbVBvbHlnb24pIHtcbiAgICBjb25zdCBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZVBvbHlnb24oe1xuICAgICAgY2xpY2thYmxlOiBwYXRoLmNsaWNrYWJsZSxcbiAgICAgIGRyYWdnYWJsZTogcGF0aC5kcmFnZ2FibGUsXG4gICAgICBlZGl0YWJsZTogcGF0aC5lZGl0YWJsZSxcbiAgICAgIGZpbGxDb2xvcjogcGF0aC5maWxsQ29sb3IsXG4gICAgICBmaWxsT3BhY2l0eTogcGF0aC5maWxsT3BhY2l0eSxcbiAgICAgIGdlb2Rlc2ljOiBwYXRoLmdlb2Rlc2ljLFxuICAgICAgcGF0aHM6IHBhdGgucGF0aHMsXG4gICAgICBzdHJva2VDb2xvcjogcGF0aC5zdHJva2VDb2xvcixcbiAgICAgIHN0cm9rZU9wYWNpdHk6IHBhdGguc3Ryb2tlT3BhY2l0eSxcbiAgICAgIHN0cm9rZVdlaWdodDogcGF0aC5zdHJva2VXZWlnaHQsXG4gICAgICB2aXNpYmxlOiBwYXRoLnZpc2libGUsXG4gICAgICB6SW5kZXg6IHBhdGguekluZGV4LFxuICAgIH0pO1xuICAgIHRoaXMuX3BvbHlnb25zLnNldChwYXRoLCBwb2x5Z29uUHJvbWlzZSk7XG4gIH1cblxuICB1cGRhdGVQb2x5Z29uKHBvbHlnb246IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbigobDogZ29vZ2xlLm1hcHMuUG9seWdvbikgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4geyBsLnNldFBhdGhzKHBvbHlnb24ucGF0aHMpOyB9KSk7XG4gIH1cblxuICBzZXRQb2x5Z29uT3B0aW9ucyhwYXRoOiBBZ21Qb2x5Z29uLCBvcHRpb25zOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogYW55IH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oKGw6IGdvb2dsZS5tYXBzLlBvbHlnb24pID0+IHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgfVxuXG4gIGRlbGV0ZVBvbHlnb24ocGF0aHM6IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGhzKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4oKGw6IGdvb2dsZS5tYXBzLlBvbHlnb24pID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIGwuc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLl9wb2x5Z29ucy5kZWxldGUocGF0aHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYXRoKHBvbHlnb25EaXJlY3RpdmU6IEFnbVBvbHlnb24pOiBQcm9taXNlPGdvb2dsZS5tYXBzLkxhdExuZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uRGlyZWN0aXZlKVxuICAgICAgLnRoZW4oKHBvbHlnb24pID0+IHBvbHlnb24uZ2V0UGF0aCgpLmdldEFycmF5KCkpO1xuICB9XG5cbiAgZ2V0UGF0aHMocG9seWdvbkRpcmVjdGl2ZTogQWdtUG9seWdvbik6IFByb21pc2U8Z29vZ2xlLm1hcHMuTGF0TG5nW11bXT4ge1xuICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbkRpcmVjdGl2ZSlcbiAgICAgIC50aGVuKChwb2x5Z29uKSA9PiBwb2x5Z29uLmdldFBhdGhzKCkuZ2V0QXJyYXkoKS5tYXAoKHApID0+IHAuZ2V0QXJyYXkoKSkpO1xuICB9XG5cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwYXRoOiBBZ21Qb2x5Z29uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX3BvbHlnb25zLmdldChwYXRoKS50aGVuKChsOiBnb29nbGUubWFwcy5Qb2x5Z29uKSA9PiB7XG4gICAgICAgIGwuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKGFnbVBvbHlnb246IEFnbVBvbHlnb24pOlxuICAgICAgICBQcm9taXNlPE9ic2VydmFibGU8TVZDRXZlbnQ8Z29vZ2xlLm1hcHMuTGF0TG5nW10gfCBnb29nbGUubWFwcy5MYXRMbmdMaXRlcmFsW10+Pj4ge1xuICAgIGNvbnN0IHBvbHlnb24gPSBhd2FpdCB0aGlzLl9wb2x5Z29ucy5nZXQoYWdtUG9seWdvbik7XG4gICAgY29uc3QgcGF0aHMgPSBwb2x5Z29uLmdldFBhdGhzKCk7XG4gICAgY29uc3QgcGF0aHNDaGFuZ2VzJCA9IGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZShwYXRocyk7XG4gICAgcmV0dXJuIHBhdGhzQ2hhbmdlcyQucGlwZShcbiAgICAgIHN0YXJ0V2l0aCgoeyBuZXdBcnI6IHBhdGhzLmdldEFycmF5KCkgfSBhcyBNVkNFdmVudDxnb29nbGUubWFwcy5NVkNBcnJheTxnb29nbGUubWFwcy5MYXRMbmc+PikpLCAvLyBpbiBvcmRlciB0byBzdWJzY3JpYmUgdG8gdGhlbSBhbGxcbiAgICAgIHN3aXRjaE1hcChwYXJlbnRNVkV2ZW50ID0+IG1lcmdlKC4uLi8vIHJlc3QgcGFyYW1ldGVyXG4gICAgICAgIHBhcmVudE1WRXZlbnQubmV3QXJyLm1hcCgoY2hNVkMsIGluZGV4KSA9PlxuICAgICAgICAgIGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZShjaE1WQylcbiAgICAgICAgICAucGlwZShtYXAoY2hNVkNFdmVudCA9PiAoeyBwYXJlbnRNVkV2ZW50LCBjaE1WQ0V2ZW50LCBwYXRoSW5kZXg6IGluZGV4IH0pKSkpKVxuICAgICAgICAucGlwZSggLy8gc3RhcnQgdGhlIG1lcmdlZCBvYiB3aXRoIGFuIGV2ZW50IHNpZ25pbmlmaW5nIGNoYW5nZSB0byBwYXJlbnRcbiAgICAgICAgICBzdGFydFdpdGgoeyBwYXJlbnRNVkV2ZW50LCBjaE1WQ0V2ZW50OiBudWxsLCBwYXRoSW5kZXg6IG51bGwgfSkpXG4gICAgICApLFxuICAgICAgc2tpcCgxKSwgLy8gc2tpcCB0aGUgbWFudWFsbHkgYWRkZWQgZXZlbnRcbiAgICAgIG1hcCgoeyBwYXJlbnRNVkV2ZW50LCBjaE1WQ0V2ZW50LCBwYXRoSW5kZXggfSkgPT4ge1xuICAgICAgICBsZXQgcmV0VmFsO1xuICAgICAgICBpZiAoIWNoTVZDRXZlbnQpIHtcbiAgICAgICAgICByZXRWYWwgPSB7XG4gICAgICAgICAgICBuZXdBcnI6IHBhcmVudE1WRXZlbnQubmV3QXJyLm1hcChzdWJBcnIgPT4gc3ViQXJyLmdldEFycmF5KCkubWFwKGxhdExuZyA9PiBsYXRMbmcudG9KU09OKCkpKSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogcGFyZW50TVZFdmVudC5ldmVudE5hbWUsXG4gICAgICAgICAgICBpbmRleDogcGFyZW50TVZFdmVudC5pbmRleCxcbiAgICAgICAgICB9IGFzIE1WQ0V2ZW50PGdvb2dsZS5tYXBzLkxhdExuZ1tdIHwgZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbFtdPjtcbiAgICAgICAgICBpZiAocGFyZW50TVZFdmVudC5wcmV2aW91cykge1xuICAgICAgICAgICAgcmV0VmFsLnByZXZpb3VzID0gIHBhcmVudE1WRXZlbnQucHJldmlvdXMuZ2V0QXJyYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0VmFsID0ge1xuICAgICAgICAgICAgbmV3QXJyOiBwYXJlbnRNVkV2ZW50Lm5ld0Fyci5tYXAoc3ViQXJyID0+IHN1YkFyci5nZXRBcnJheSgpLm1hcChsYXRMbmcgPT4gbGF0TG5nLnRvSlNPTigpKSksXG4gICAgICAgICAgICBwYXRoSW5kZXgsXG4gICAgICAgICAgICBldmVudE5hbWU6IGNoTVZDRXZlbnQuZXZlbnROYW1lLFxuICAgICAgICAgICAgaW5kZXg6IGNoTVZDRXZlbnQuaW5kZXgsXG4gICAgICAgICAgfSBhcyB1bmtub3duIGFzIE1WQ0V2ZW50PGdvb2dsZS5tYXBzLkxhdExuZ1tdIHwgZ29vZ2xlLm1hcHMuTGF0TG5nTGl0ZXJhbFtdPjtcbiAgICAgICAgICBpZiAoY2hNVkNFdmVudC5wcmV2aW91cykge1xuICAgICAgICAgICAgcmV0VmFsLnByZXZpb3VzID0gY2hNVkNFdmVudC5wcmV2aW91cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgIH0pKTtcbiAgfVxufVxuIl19