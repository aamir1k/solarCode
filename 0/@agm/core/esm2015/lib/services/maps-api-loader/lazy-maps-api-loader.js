import { Inject, Injectable, InjectionToken, LOCALE_ID, Optional } from '@angular/core';
import { DocumentRef, WindowRef } from '../../utils/browser-globals';
import { MapsAPILoader } from './maps-api-loader';
export var GoogleMapsScriptProtocol;
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
export const LAZY_MAPS_API_CONFIG = new InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');
export class LazyMapsAPILoader extends MapsAPILoader {
    constructor(config = null, w, d, localeId) {
        super();
        this.localeId = localeId;
        this._SCRIPT_ID = 'agmGoogleMapsApiScript';
        this.callbackName = `agmLazyMapsAPILoader`;
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }
    load() {
        const window = this._windowRef.getNativeWindow();
        if (window.google && window.google.maps) {
            // Google maps already loaded on the page.
            return Promise.resolve();
        }
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        // this can happen in HMR situations or Stackblitz.io editors.
        const scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
        if (scriptOnPage) {
            this._assignScriptLoadingPromise(scriptOnPage);
            return this._scriptLoadingPromise;
        }
        const script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.id = this._SCRIPT_ID;
        script.src = this._getScriptSrc(this.callbackName);
        this._assignScriptLoadingPromise(script);
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    }
    _assignScriptLoadingPromise(scriptElem) {
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            this._windowRef.getNativeWindow()[this.callbackName] = () => {
                resolve();
            };
            scriptElem.onerror = (error) => {
                reject(error);
            };
        });
    }
    _getScriptSrc(callbackName) {
        const protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        let protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        const hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const queryParams = {
            v: this._config.apiVersion || 'quarterly',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language || (this.localeId !== 'en-US' ? this.localeId : null),
        };
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            // join arrays as comma seperated strings
            const i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => {
            return `${entry.key}=${entry.value}`;
        })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
LazyMapsAPILoader.decorators = [
    { type: Injectable }
];
LazyMapsAPILoader.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LAZY_MAPS_API_CONFIG,] }] },
    { type: WindowRef },
    { type: DocumentRef },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1tYXBzLWFwaS1sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saWIvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELE1BQU0sQ0FBTixJQUFZLHdCQUlYO0FBSkQsV0FBWSx3QkFBd0I7SUFDbEMsdUVBQVEsQ0FBQTtJQUNSLHlFQUFTLENBQUE7SUFDVCx1RUFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUpXLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFJbkM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBaUMsMENBQTBDLENBQUMsQ0FBQztBQWlFbkksTUFBTSxPQUFPLGlCQUFrQixTQUFRLGFBQWE7SUFRbEQsWUFBc0QsU0FBYyxJQUFJLEVBQUUsQ0FBWSxFQUFFLENBQWMsRUFDL0QsUUFBZ0I7UUFDckQsS0FBSyxFQUFFLENBQUM7UUFENkIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUpwQyxlQUFVLEdBQVcsd0JBQXdCLENBQUM7UUFDOUMsaUJBQVksR0FBVyxzQkFBc0IsQ0FBQztRQUsvRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVE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LENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxLQUFtQyxFQUFFLEVBQUU7WUFDM0MsT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsUUFBUSxLQUFLLFdBQVcsSUFBSSxNQUFNLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7WUExR0YsVUFBVTs7OzRDQVNJLFFBQVEsWUFBSSxNQUFNLFNBQUMsb0JBQW9CO1lBdkZoQyxTQUFTO1lBQXRCLFdBQVc7eUNBd0ZMLE1BQU0sU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTE9DQUxFX0lELCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEb2N1bWVudFJlZiwgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vdXRpbHMvYnJvd3Nlci1nbG9iYWxzJztcblxuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyJztcblxuZXhwb3J0IGVudW0gR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sIHtcbiAgSFRUUCA9IDEsXG4gIEhUVFBTID0gMixcbiAgQVVUTyA9IDMsXG59XG5cbi8qKlxuICogVG9rZW4gZm9yIHRoZSBjb25maWcgb2YgdGhlIExhenlNYXBzQVBJTG9hZGVyLiBQbGVhc2UgcHJvdmlkZSBhbiBvYmplY3Qgb2YgdHlwZSB7QGxpbmtcbiAqIExhenlNYXBzQVBJTG9hZGVyQ29uZmlnfS5cbiAqL1xuZXhwb3J0IGNvbnN0IExBWllfTUFQU19BUElfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPExhenlNYXBzQVBJTG9hZGVyQ29uZmlnTGl0ZXJhbD4oJ2FuZ3VsYXItZ29vZ2xlLW1hcHMgTEFaWV9NQVBTX0FQSV9DT05GSUcnKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciB0aGUge0BsaW5rIExhenlNYXBzQVBJTG9hZGVyfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMYXp5TWFwc0FQSUxvYWRlckNvbmZpZ0xpdGVyYWwge1xuICAvKipcbiAgICogVGhlIEdvb2dsZSBNYXBzIEFQSSBLZXkgKHNlZTpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvZ2V0LWFwaS1rZXkpXG4gICAqL1xuICBhcGlLZXk/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBHb29nbGUgTWFwcyBjbGllbnQgSUQgKGZvciBwcmVtaXVtIHBsYW5zKS5cbiAgICogV2hlbiB5b3UgaGF2ZSBhIEdvb2dsZSBNYXBzIEFQSXMgUHJlbWl1bSBQbGFuIGxpY2Vuc2UsIHlvdSBtdXN0IGF1dGhlbnRpY2F0ZVxuICAgKiB5b3VyIGFwcGxpY2F0aW9uIHdpdGggZWl0aGVyIGFuIEFQSSBrZXkgb3IgYSBjbGllbnQgSUQuXG4gICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgd2lsbCBmYWlsIHRvIGxvYWQgaWYgYm90aCBhIGNsaWVudCBJRCBhbmQgYW4gQVBJIGtleSBhcmUgaW5jbHVkZWQuXG4gICAqL1xuICBjbGllbnRJZD86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIEdvb2dsZSBNYXBzIGNoYW5uZWwgbmFtZSAoZm9yIHByZW1pdW0gcGxhbnMpLlxuICAgKiBBIGNoYW5uZWwgcGFyYW1ldGVyIGlzIGFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IGFsbG93cyB5b3UgdG8gdHJhY2sgdXNhZ2UgdW5kZXIgeW91ciBjbGllbnRcbiAgICogSUQgYnkgYXNzaWduaW5nIGEgZGlzdGluY3QgY2hhbm5lbCB0byBlYWNoIG9mIHlvdXIgYXBwbGljYXRpb25zLlxuICAgKi9cbiAgY2hhbm5lbD86IHN0cmluZztcblxuICAvKipcbiAgICogR29vZ2xlIE1hcHMgQVBJIHZlcnNpb24uXG4gICAqL1xuICBhcGlWZXJzaW9uPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBIb3N0IGFuZCBQYXRoIHVzZWQgZm9yIHRoZSBgPHNjcmlwdD5gIHRhZy5cbiAgICovXG4gIGhvc3RBbmRQYXRoPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcm90b2NvbCB1c2VkIGZvciB0aGUgYDxzY3JpcHQ+YCB0YWcuXG4gICAqL1xuICBwcm90b2NvbD86IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbDtcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGljaCBHb29nbGUgTWFwcyBsaWJyYXJpZXMgc2hvdWxkIGdldCBsb2FkZWQuXG4gICAqL1xuICBsaWJyYXJpZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYmlhcyBmb3IgdGhlIG1hcCBiZWhhdmlvciBpcyBVUy5cbiAgICogSWYgeW91IHdpc2ggdG8gYWx0ZXIgeW91ciBhcHBsaWNhdGlvbiB0byBzZXJ2ZSBkaWZmZXJlbnQgbWFwIHRpbGVzIG9yIGJpYXMgdGhlXG4gICAqIGFwcGxpY2F0aW9uLCB5b3UgY2FuIG92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBiZWhhdmlvciAoVVMpIGJ5IGRlZmluaW5nIGEgYHJlZ2lvbmAuXG4gICAqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9iYXNpY3MjUmVnaW9uXG4gICAqL1xuICByZWdpb24/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBHb29nbGUgTWFwcyBBUEkgdXNlcyB0aGUgYnJvd3NlcidzIHByZWZlcnJlZCBsYW5ndWFnZSB3aGVuIGRpc3BsYXlpbmdcbiAgICogdGV4dHVhbCBpbmZvcm1hdGlvbi4gSWYgeW91IHdpc2ggdG8gb3ZlcndyaXRlIHRoaXMgYmVoYXZpb3IgYW5kIGZvcmNlIHRoZSBBUElcbiAgICogdG8gdXNlIGEgZ2l2ZW4gbGFuZ3VhZ2UsIHlvdSBjYW4gdXNlIHRoaXMgc2V0dGluZy5cbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2Jhc2ljcyNMYW5ndWFnZVxuICAgKi9cbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMYXp5TWFwc0FQSUxvYWRlciBleHRlbmRzIE1hcHNBUElMb2FkZXIge1xuICBwcm90ZWN0ZWQgX3NjcmlwdExvYWRpbmdQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogTGF6eU1hcHNBUElMb2FkZXJDb25maWdMaXRlcmFsO1xuICBwcm90ZWN0ZWQgX3dpbmRvd1JlZjogV2luZG93UmVmO1xuICBwcm90ZWN0ZWQgX2RvY3VtZW50UmVmOiBEb2N1bWVudFJlZjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9TQ1JJUFRfSUQ6IHN0cmluZyA9ICdhZ21Hb29nbGVNYXBzQXBpU2NyaXB0JztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNhbGxiYWNrTmFtZTogc3RyaW5nID0gYGFnbUxhenlNYXBzQVBJTG9hZGVyYDtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KExBWllfTUFQU19BUElfQ09ORklHKSBjb25maWc6IGFueSA9IG51bGwsIHc6IFdpbmRvd1JlZiwgZDogRG9jdW1lbnRSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZUlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLl93aW5kb3dSZWYgPSB3O1xuICAgIHRoaXMuX2RvY3VtZW50UmVmID0gZDtcbiAgfVxuXG4gIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgd2luZG93ID0gdGhpcy5fd2luZG93UmVmLmdldE5hdGl2ZVdpbmRvdygpIGFzIGFueTtcbiAgICBpZiAod2luZG93Lmdvb2dsZSAmJiB3aW5kb3cuZ29vZ2xlLm1hcHMpIHtcbiAgICAgIC8vIEdvb2dsZSBtYXBzIGFscmVhZHkgbG9hZGVkIG9uIHRoZSBwYWdlLlxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgIH1cblxuICAgIC8vIHRoaXMgY2FuIGhhcHBlbiBpbiBITVIgc2l0dWF0aW9ucyBvciBTdGFja2JsaXR6LmlvIGVkaXRvcnMuXG4gICAgY29uc3Qgc2NyaXB0T25QYWdlID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5nZXRFbGVtZW50QnlJZCh0aGlzLl9TQ1JJUFRfSUQpO1xuICAgIGlmIChzY3JpcHRPblBhZ2UpIHtcbiAgICAgIHRoaXMuX2Fzc2lnblNjcmlwdExvYWRpbmdQcm9taXNlKHNjcmlwdE9uUGFnZSk7XG4gICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICBzY3JpcHQuaWQgPSB0aGlzLl9TQ1JJUFRfSUQ7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMuX2dldFNjcmlwdFNyYyh0aGlzLmNhbGxiYWNrTmFtZSk7XG4gICAgdGhpcy5fYXNzaWduU2NyaXB0TG9hZGluZ1Byb21pc2Uoc2NyaXB0KTtcbiAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXROYXRpdmVEb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gIH1cblxuICBwcml2YXRlIF9hc3NpZ25TY3JpcHRMb2FkaW5nUHJvbWlzZShzY3JpcHRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fd2luZG93UmVmLmdldE5hdGl2ZVdpbmRvdygpW3RoaXMuY2FsbGJhY2tOYW1lXSA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcblxuICAgICAgc2NyaXB0RWxlbS5vbmVycm9yID0gKGVycm9yOiBFdmVudCkgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0U2NyaXB0U3JjKGNhbGxiYWNrTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBwcm90b2NvbFR5cGU6IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbCA9XG4gICAgICAgICh0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnByb3RvY29sKSB8fCBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUFM7XG4gICAgbGV0IHByb3RvY29sOiBzdHJpbmc7XG5cbiAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xuICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuQVVUTzpcbiAgICAgICAgcHJvdG9jb2wgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbC5IVFRQOlxuICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUFM6XG4gICAgICAgIHByb3RvY29sID0gJ2h0dHBzOic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGhvc3RBbmRQYXRoOiBzdHJpbmcgPSB0aGlzLl9jb25maWcuaG9zdEFuZFBhdGggfHwgJ21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW119ID0ge1xuICAgICAgdjogdGhpcy5fY29uZmlnLmFwaVZlcnNpb24gfHwgJ3F1YXJ0ZXJseScsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tOYW1lLFxuICAgICAga2V5OiB0aGlzLl9jb25maWcuYXBpS2V5LFxuICAgICAgY2xpZW50OiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICBjaGFubmVsOiB0aGlzLl9jb25maWcuY2hhbm5lbCxcbiAgICAgIGxpYnJhcmllczogdGhpcy5fY29uZmlnLmxpYnJhcmllcyxcbiAgICAgIHJlZ2lvbjogdGhpcy5fY29uZmlnLnJlZ2lvbixcbiAgICAgIGxhbmd1YWdlOiB0aGlzLl9jb25maWcubGFuZ3VhZ2UgfHwgKHRoaXMubG9jYWxlSWQgIT09ICdlbi1VUycgPyB0aGlzLmxvY2FsZUlkIDogbnVsbCksXG4gICAgfTtcbiAgICBjb25zdCBwYXJhbXM6IHN0cmluZyA9IE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKGs6IHN0cmluZykgPT4gcXVlcnlQYXJhbXNba10gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBlbXB0eSBhcnJheXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgJiYgcXVlcnlQYXJhbXNba10ubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChrOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGpvaW4gYXJyYXlzIGFzIGNvbW1hIHNlcGVyYXRlZCBzdHJpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpID0gcXVlcnlQYXJhbXNba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2tleTogaywgdmFsdWU6IGkuam9pbignLCcpfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7a2V5OiBrLCB2YWx1ZTogcXVlcnlQYXJhbXNba119O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoZW50cnk6IHtrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZ30pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtlbnRyeS5rZXl9PSR7ZW50cnkudmFsdWV9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcmJyk7XG4gICAgcmV0dXJuIGAke3Byb3RvY29sfS8vJHtob3N0QW5kUGF0aH0/JHtwYXJhbXN9YDtcbiAgfVxufVxuIl19