/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, Injectable, NgModule } from '@angular/core';
import * as i0 from "@angular/core";
export function escapeHtml(text) {
    const escapedText = {
        '&': '&a;',
        '"': '&q;',
        '\'': '&s;',
        '<': '&l;',
        '>': '&g;',
    };
    return text.replace(/[&"'<>]/g, s => escapedText[s]);
}
export function unescapeHtml(text) {
    const unescapedText = {
        '&a;': '&',
        '&q;': '"',
        '&s;': '\'',
        '&l;': '<',
        '&g;': '>',
    };
    return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * @publicApi
 */
export function makeStateKey(key) {
    return key;
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */
export class TransferState {
    constructor() {
        this.store = {};
        this.onSerializeCallbacks = {};
    }
    /** @internal */
    static init(initState) {
        const transferState = new TransferState();
        transferState.store = initState;
        return transferState;
    }
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */
    get(key, defaultValue) {
        return this.store[key] !== undefined ? this.store[key] : defaultValue;
    }
    /**
     * Set the value corresponding to a key.
     */
    set(key, value) {
        this.store[key] = value;
    }
    /**
     * Remove a key from the store.
     */
    remove(key) {
        delete this.store[key];
    }
    /**
     * Test whether a key exists in the store.
     */
    hasKey(key) {
        return this.store.hasOwnProperty(key);
    }
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */
    onSerialize(key, callback) {
        this.onSerializeCallbacks[key] = callback;
    }
    /**
     * Serialize the current state of the store to JSON.
     */
    toJson() {
        // Call the onSerialize callbacks and put those values into the store.
        for (const key in this.onSerializeCallbacks) {
            if (this.onSerializeCallbacks.hasOwnProperty(key)) {
                try {
                    this.store[key] = this.onSerializeCallbacks[key]();
                }
                catch (e) {
                    console.warn('Exception in onSerialize callback: ', e);
                }
            }
        }
        return JSON.stringify(this.store);
    }
}
TransferState.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: TransferState, deps: [], target: i0.????FactoryTarget.Injectable });
TransferState.??prov = i0.????ngDeclareInjectable({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: TransferState });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: TransferState, decorators: [{
            type: Injectable
        }] });
export function initTransferState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    const script = doc.getElementById(appId + '-state');
    let initialState = {};
    if (script && script.textContent) {
        try {
            // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
            initialState = JSON.parse(unescapeHtml(script.textContent));
        }
        catch (e) {
            console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
    }
    return TransferState.init(initialState);
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 */
export class BrowserTransferStateModule {
}
BrowserTransferStateModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: BrowserTransferStateModule, deps: [], target: i0.????FactoryTarget.NgModule });
BrowserTransferStateModule.??mod = i0.????ngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.1", ngImport: i0, type: BrowserTransferStateModule });
BrowserTransferStateModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: BrowserTransferStateModule, providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.1", ngImport: i0, type: BrowserTransferStateModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRTNELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBWTtJQUNyQyxNQUFNLFdBQVcsR0FBMEI7UUFDekMsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztLQUNYLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBWTtJQUN2QyxNQUFNLGFBQWEsR0FBMEI7UUFDM0MsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsR0FBRztLQUNYLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQXFCRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBVyxHQUFXO0lBQ2hELE9BQU8sR0FBa0IsQ0FBQztBQUM1QixD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QTFCLDBCQUEwQjttSUFBMUIsMEJBQTBCLGFBRjFCLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQztzR0FFbkYsMEJBQTBCO2tCQUh0QyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFDLENBQUM7aUJBQy9GIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0YWJsZSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBlc2NhcGVkVGV4dDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICcmJzogJyZhOycsXG4gICAgJ1wiJzogJyZxOycsXG4gICAgJ1xcJyc6ICcmczsnLFxuICAgICc8JzogJyZsOycsXG4gICAgJz4nOiAnJmc7JyxcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvWyZcIic8Pl0vZywgcyA9PiBlc2NhcGVkVGV4dFtzXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdW5lc2NhcGVkVGV4dDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICcmYTsnOiAnJicsXG4gICAgJyZxOyc6ICdcIicsXG4gICAgJyZzOyc6ICdcXCcnLFxuICAgICcmbDsnOiAnPCcsXG4gICAgJyZnOyc6ICc+JyxcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvJlteO10rOy9nLCBzID0+IHVuZXNjYXBlZFRleHRbc10pO1xufVxuXG4vKipcbiAqIEEgdHlwZS1zYWZlIGtleSB0byB1c2Ugd2l0aCBgVHJhbnNmZXJTdGF0ZWAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGNvbnN0IENPVU5URVJfS0VZID0gbWFrZVN0YXRlS2V5PG51bWJlcj4oJ2NvdW50ZXInKTtcbiAqIGxldCB2YWx1ZSA9IDEwO1xuICpcbiAqIHRyYW5zZmVyU3RhdGUuc2V0KENPVU5URVJfS0VZLCB2YWx1ZSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIFN0YXRlS2V5PFQ+ID0gc3RyaW5nJntcbiAgX19ub3RfYV9zdHJpbmc6IG5ldmVyLFxuICBfX3ZhbHVlX3R5cGU/OiBULFxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBgU3RhdGVLZXk8VD5gIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgdmFsdWUgb2YgdHlwZSBUIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0YXRlS2V5PFQgPSB2b2lkPihrZXk6IHN0cmluZyk6IFN0YXRlS2V5PFQ+IHtcbiAgcmV0dXJuIGtleSBhcyBTdGF0ZUtleTxUPjtcbn1cblxuLyoqXG4gKiBBIGtleSB2YWx1ZSBzdG9yZSB0aGF0IGlzIHRyYW5zZmVycmVkIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9uIHRoZSBzZXJ2ZXIgc2lkZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIG9uIHRoZSBjbGllbnQgc2lkZS5cbiAqXG4gKiBgVHJhbnNmZXJTdGF0ZWAgd2lsbCBiZSBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSB0b2tlbi4gVG8gdXNlIGl0IGltcG9ydFxuICogYFNlcnZlclRyYW5zZmVyU3RhdGVNb2R1bGVgIG9uIHRoZSBzZXJ2ZXIgYW5kIGBCcm93c2VyVHJhbnNmZXJTdGF0ZU1vZHVsZWAgb24gdGhlIGNsaWVudC5cbiAqXG4gKiBUaGUgdmFsdWVzIGluIHRoZSBzdG9yZSBhcmUgc2VyaWFsaXplZC9kZXNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnkvSlNPTi5wYXJzZS4gU28gb25seVxuICogYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmcsIG51bGwgYW5kIG5vbi1jbGFzcyBvYmplY3RzIHdpbGwgYmUgc2VyaWFsaXplZCBhbmQgZGVzZXJpYWxpemVkIGluIGFcbiAqIG5vbi1sb3NzeSBtYW5uZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNmZXJTdGF0ZSB7XG4gIHByaXZhdGUgc3RvcmU6IHtbazogc3RyaW5nXTogdW5rbm93bnx1bmRlZmluZWR9ID0ge307XG4gIHByaXZhdGUgb25TZXJpYWxpemVDYWxsYmFja3M6IHtbazogc3RyaW5nXTogKCkgPT4gdW5rbm93biB8IHVuZGVmaW5lZH0gPSB7fTtcblxuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBpbml0KGluaXRTdGF0ZToge30pIHtcbiAgICBjb25zdCB0cmFuc2ZlclN0YXRlID0gbmV3IFRyYW5zZmVyU3RhdGUoKTtcbiAgICB0cmFuc2ZlclN0YXRlLnN0b3JlID0gaW5pdFN0YXRlO1xuICAgIHJldHVybiB0cmFuc2ZlclN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byBhIGtleS4gUmV0dXJuIGBkZWZhdWx0VmFsdWVgIGlmIGtleSBpcyBub3QgZm91bmQuXG4gICAqL1xuICBnZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgZGVmYXVsdFZhbHVlOiBUKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmVba2V5XSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdG9yZVtrZXldIGFzIFQgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEga2V5LlxuICAgKi9cbiAgc2V0PFQ+KGtleTogU3RhdGVLZXk8VD4sIHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEga2V5IGZyb20gdGhlIHN0b3JlLlxuICAgKi9cbiAgcmVtb3ZlPFQ+KGtleTogU3RhdGVLZXk8VD4pOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5zdG9yZVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3Qgd2hldGhlciBhIGtleSBleGlzdHMgaW4gdGhlIHN0b3JlLlxuICAgKi9cbiAgaGFzS2V5PFQ+KGtleTogU3RhdGVLZXk8VD4pIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEga2V5IHdoZW4gYHRvSnNvbmAgaXMgY2FsbGVkLlxuICAgKi9cbiAgb25TZXJpYWxpemU8VD4oa2V5OiBTdGF0ZUtleTxUPiwgY2FsbGJhY2s6ICgpID0+IFQpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzW2tleV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemUgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHN0b3JlIHRvIEpTT04uXG4gICAqL1xuICB0b0pzb24oKTogc3RyaW5nIHtcbiAgICAvLyBDYWxsIHRoZSBvblNlcmlhbGl6ZSBjYWxsYmFja3MgYW5kIHB1dCB0aG9zZSB2YWx1ZXMgaW50byB0aGUgc3RvcmUuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrcykge1xuICAgICAgaWYgKHRoaXMub25TZXJpYWxpemVDYWxsYmFja3MuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHRoaXMub25TZXJpYWxpemVDYWxsYmFja3Nba2V5XSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFeGNlcHRpb24gaW4gb25TZXJpYWxpemUgY2FsbGJhY2s6ICcsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0b3JlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRyYW5zZmVyU3RhdGUoZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZykge1xuICAvLyBMb2NhdGUgdGhlIHNjcmlwdCB0YWcgd2l0aCB0aGUgSlNPTiBkYXRhIHRyYW5zZmVycmVkIGZyb20gdGhlIHNlcnZlci5cbiAgLy8gVGhlIGlkIG9mIHRoZSBzY3JpcHQgdGFnIGlzIHNldCB0byB0aGUgQW5ndWxhciBhcHBJZCArICdzdGF0ZScuXG4gIGNvbnN0IHNjcmlwdCA9IGRvYy5nZXRFbGVtZW50QnlJZChhcHBJZCArICctc3RhdGUnKTtcbiAgbGV0IGluaXRpYWxTdGF0ZSA9IHt9O1xuICBpZiAoc2NyaXB0ICYmIHNjcmlwdC50ZXh0Q29udGVudCkge1xuICAgIHRyeSB7XG4gICAgICAvLyBBdm9pZCB1c2luZyBhbnkgaGVyZSBhcyBpdCB0cmlnZ2VycyBsaW50IGVycm9ycyBpbiBnb29nbGUzIChhbnkgaXMgbm90IGFsbG93ZWQpLlxuICAgICAgaW5pdGlhbFN0YXRlID0gSlNPTi5wYXJzZSh1bmVzY2FwZUh0bWwoc2NyaXB0LnRleHRDb250ZW50KSkgYXMge307XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdFeGNlcHRpb24gd2hpbGUgcmVzdG9yaW5nIFRyYW5zZmVyU3RhdGUgZm9yIGFwcCAnICsgYXBwSWQsIGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gVHJhbnNmZXJTdGF0ZS5pbml0KGluaXRpYWxTdGF0ZSk7XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgY2xpZW50IHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IFRyYW5zZmVyU3RhdGUsIHVzZUZhY3Rvcnk6IGluaXRUcmFuc2ZlclN0YXRlLCBkZXBzOiBbRE9DVU1FTlQsIEFQUF9JRF19XSxcbn0pXG5leHBvcnQgY2xhc3MgQnJvd3NlclRyYW5zZmVyU3RhdGVNb2R1bGUge1xufVxuIl19