/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EMPTY, EmptyError, from, of, throwError } from 'rxjs';
import { catchError, concatMap, first, map, mapTo, mergeMap, takeLast, tap } from 'rxjs/operators';
import { inheritedParamsDataResolve } from '../router_state';
import { wrapIntoObservable } from '../utils/collection';
import { getToken } from '../utils/preactivation';
/**
 * A private symbol used to store the value of `Route.title` inside the `Route.data` if it is a
 * static string or `Route.resolve` if anything else. This allows us to reuse the existing route
 * data/resolvers to support the title feature without new instrumentation in the `Router` pipeline.
 */
export const RouteTitle = Symbol('RouteTitle');
export function resolveData(paramsInheritanceStrategy, moduleInjector) {
    return mergeMap(t => {
        const { targetSnapshot, guards: { canActivateChecks } } = t;
        if (!canActivateChecks.length) {
            return of(t);
        }
        let canActivateChecksResolved = 0;
        return from(canActivateChecks)
            .pipe(concatMap(check => runResolve(check.route, targetSnapshot, paramsInheritanceStrategy, moduleInjector)), tap(() => canActivateChecksResolved++), takeLast(1), mergeMap(_ => canActivateChecksResolved === canActivateChecks.length ? of(t) : EMPTY));
    });
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, moduleInjector) {
    const config = futureARS.routeConfig;
    const resolve = futureARS._resolve;
    if (config?.title !== undefined && !hasStaticTitle(config)) {
        resolve[RouteTitle] = config.title;
    }
    return resolveNode(resolve, futureARS, futureRSS, moduleInjector)
        .pipe(map((resolvedData) => {
        futureARS._resolvedData = resolvedData;
        futureARS.data = inheritedParamsDataResolve(futureARS, paramsInheritanceStrategy).resolve;
        if (config && hasStaticTitle(config)) {
            futureARS.data[RouteTitle] = config.title;
        }
        return null;
    }));
}
function resolveNode(resolve, futureARS, futureRSS, moduleInjector) {
    const keys = getDataKeys(resolve);
    if (keys.length === 0) {
        return of({});
    }
    const data = {};
    return from(keys).pipe(mergeMap(key => getResolver(resolve[key], futureARS, futureRSS, moduleInjector)
        .pipe(first(), tap((value) => {
        data[key] = value;
    }))), takeLast(1), mapTo(data), catchError((e) => e instanceof EmptyError ? EMPTY : throwError(e)));
}
function getDataKeys(obj) {
    return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function getResolver(injectionToken, futureARS, futureRSS, moduleInjector) {
    const resolver = getToken(injectionToken, futureARS, moduleInjector);
    return resolver.resolve ? wrapIntoObservable(resolver.resolve(futureARS, futureRSS)) :
        wrapIntoObservable(resolver(futureARS, futureRSS));
}
function hasStaticTitle(config) {
    return typeof config.title === 'string' || config.title === null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZV9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9vcGVyYXRvcnMvcmVzb2x2ZV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBd0MsRUFBRSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRyxPQUFPLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSWpHLE9BQU8sRUFBeUIsMEJBQTBCLEVBQXNCLE1BQU0saUJBQWlCLENBQUM7QUFDeEcsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRWhEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRS9DLE1BQU0sVUFBVSxXQUFXLENBQ3ZCLHlCQUErQyxFQUMvQyxjQUF3QjtJQUMxQixPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNsQixNQUFNLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxFQUFDLGlCQUFpQixFQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNkO1FBQ0QsSUFBSSx5QkFBeUIsR0FBRyxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7YUFDekIsSUFBSSxDQUNELFNBQVMsQ0FDTCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FDZixLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWUsRUFBRSx5QkFBeUIsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUNqRixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxFQUN0QyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQ1gsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMseUJBQXlCLEtBQUssaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUN4RixDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQ2YsU0FBaUMsRUFBRSxTQUE4QixFQUNqRSx5QkFBK0MsRUFBRSxjQUF3QjtJQUMzRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3JDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7SUFDbkMsSUFBSSxNQUFNLEVBQUUsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUMxRCxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNwQztJQUNELE9BQU8sV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQztTQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBaUIsRUFBRSxFQUFFO1FBQzlCLFNBQVMsQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsMEJBQTBCLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFGLElBQUksTUFBTSxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDM0M7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQ2hCLE9BQW9CLEVBQUUsU0FBaUMsRUFBRSxTQUE4QixFQUN2RixjQUF3QjtJQUMxQixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNmO0lBQ0QsTUFBTSxJQUFJLEdBQThCLEVBQUUsQ0FBQztJQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2xCLFFBQVEsQ0FDSixHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUM7U0FDMUQsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUN6QixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUNYLFVBQVUsQ0FBQyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDOUUsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFXO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQ2hCLGNBQW1CLEVBQUUsU0FBaUMsRUFBRSxTQUE4QixFQUN0RixjQUF3QjtJQUMxQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNyRSxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLE1BQWE7SUFDbkMsT0FBTyxPQUFPLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VNUFRZLCBFbXB0eUVycm9yLCBmcm9tLCBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgY29uY2F0TWFwLCBmaXJzdCwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHRha2VMYXN0LCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtSZXNvbHZlRGF0YSwgUm91dGV9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQge05hdmlnYXRpb25UcmFuc2l0aW9ufSBmcm9tICcuLi9yb3V0ZXInO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBpbmhlcml0ZWRQYXJhbXNEYXRhUmVzb2x2ZSwgUm91dGVyU3RhdGVTbmFwc2hvdH0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7d3JhcEludG9PYnNlcnZhYmxlfSBmcm9tICcuLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7Z2V0VG9rZW59IGZyb20gJy4uL3V0aWxzL3ByZWFjdGl2YXRpb24nO1xuXG4vKipcbiAqIEEgcHJpdmF0ZSBzeW1ib2wgdXNlZCB0byBzdG9yZSB0aGUgdmFsdWUgb2YgYFJvdXRlLnRpdGxlYCBpbnNpZGUgdGhlIGBSb3V0ZS5kYXRhYCBpZiBpdCBpcyBhXG4gKiBzdGF0aWMgc3RyaW5nIG9yIGBSb3V0ZS5yZXNvbHZlYCBpZiBhbnl0aGluZyBlbHNlLiBUaGlzIGFsbG93cyB1cyB0byByZXVzZSB0aGUgZXhpc3Rpbmcgcm91dGVcbiAqIGRhdGEvcmVzb2x2ZXJzIHRvIHN1cHBvcnQgdGhlIHRpdGxlIGZlYXR1cmUgd2l0aG91dCBuZXcgaW5zdHJ1bWVudGF0aW9uIGluIHRoZSBgUm91dGVyYCBwaXBlbGluZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFJvdXRlVGl0bGUgPSBTeW1ib2woJ1JvdXRlVGl0bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEYXRhKFxuICAgIHBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k6ICdlbXB0eU9ubHknfCdhbHdheXMnLFxuICAgIG1vZHVsZUluamVjdG9yOiBJbmplY3Rvcik6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxOYXZpZ2F0aW9uVHJhbnNpdGlvbj4ge1xuICByZXR1cm4gbWVyZ2VNYXAodCA9PiB7XG4gICAgY29uc3Qge3RhcmdldFNuYXBzaG90LCBndWFyZHM6IHtjYW5BY3RpdmF0ZUNoZWNrc319ID0gdDtcblxuICAgIGlmICghY2FuQWN0aXZhdGVDaGVja3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gb2YodCk7XG4gICAgfVxuICAgIGxldCBjYW5BY3RpdmF0ZUNoZWNrc1Jlc29sdmVkID0gMDtcbiAgICByZXR1cm4gZnJvbShjYW5BY3RpdmF0ZUNoZWNrcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjb25jYXRNYXAoXG4gICAgICAgICAgICAgICAgY2hlY2sgPT4gcnVuUmVzb2x2ZShcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sucm91dGUsIHRhcmdldFNuYXBzaG90ISwgcGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSwgbW9kdWxlSW5qZWN0b3IpKSxcbiAgICAgICAgICAgIHRhcCgoKSA9PiBjYW5BY3RpdmF0ZUNoZWNrc1Jlc29sdmVkKyspLFxuICAgICAgICAgICAgdGFrZUxhc3QoMSksXG4gICAgICAgICAgICBtZXJnZU1hcChfID0+IGNhbkFjdGl2YXRlQ2hlY2tzUmVzb2x2ZWQgPT09IGNhbkFjdGl2YXRlQ2hlY2tzLmxlbmd0aCA/IG9mKHQpIDogRU1QVFkpLFxuICAgICAgICApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcnVuUmVzb2x2ZShcbiAgICBmdXR1cmVBUlM6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGZ1dHVyZVJTUzogUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgICBwYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5OiAnZW1wdHlPbmx5J3wnYWx3YXlzJywgbW9kdWxlSW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIGNvbnN0IGNvbmZpZyA9IGZ1dHVyZUFSUy5yb3V0ZUNvbmZpZztcbiAgY29uc3QgcmVzb2x2ZSA9IGZ1dHVyZUFSUy5fcmVzb2x2ZTtcbiAgaWYgKGNvbmZpZz8udGl0bGUgIT09IHVuZGVmaW5lZCAmJiAhaGFzU3RhdGljVGl0bGUoY29uZmlnKSkge1xuICAgIHJlc29sdmVbUm91dGVUaXRsZV0gPSBjb25maWcudGl0bGU7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVOb2RlKHJlc29sdmUsIGZ1dHVyZUFSUywgZnV0dXJlUlNTLCBtb2R1bGVJbmplY3RvcilcbiAgICAgIC5waXBlKG1hcCgocmVzb2x2ZWREYXRhOiBhbnkpID0+IHtcbiAgICAgICAgZnV0dXJlQVJTLl9yZXNvbHZlZERhdGEgPSByZXNvbHZlZERhdGE7XG4gICAgICAgIGZ1dHVyZUFSUy5kYXRhID0gaW5oZXJpdGVkUGFyYW1zRGF0YVJlc29sdmUoZnV0dXJlQVJTLCBwYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5KS5yZXNvbHZlO1xuICAgICAgICBpZiAoY29uZmlnICYmIGhhc1N0YXRpY1RpdGxlKGNvbmZpZykpIHtcbiAgICAgICAgICBmdXR1cmVBUlMuZGF0YVtSb3V0ZVRpdGxlXSA9IGNvbmZpZy50aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU5vZGUoXG4gICAgcmVzb2x2ZTogUmVzb2x2ZURhdGEsIGZ1dHVyZUFSUzogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgZnV0dXJlUlNTOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICAgIG1vZHVsZUluamVjdG9yOiBJbmplY3Rvcik6IE9ic2VydmFibGU8YW55PiB7XG4gIGNvbnN0IGtleXMgPSBnZXREYXRhS2V5cyhyZXNvbHZlKTtcbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9mKHt9KTtcbiAgfVxuICBjb25zdCBkYXRhOiB7W2s6IHN0cmluZ3xzeW1ib2xdOiBhbnl9ID0ge307XG4gIHJldHVybiBmcm9tKGtleXMpLnBpcGUoXG4gICAgICBtZXJnZU1hcChcbiAgICAgICAgICBrZXkgPT4gZ2V0UmVzb2x2ZXIocmVzb2x2ZVtrZXldLCBmdXR1cmVBUlMsIGZ1dHVyZVJTUywgbW9kdWxlSW5qZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICAucGlwZShmaXJzdCgpLCB0YXAoKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpLFxuICAgICAgdGFrZUxhc3QoMSksXG4gICAgICBtYXBUbyhkYXRhKSxcbiAgICAgIGNhdGNoRXJyb3IoKGU6IHVua25vd24pID0+IGUgaW5zdGFuY2VvZiBFbXB0eUVycm9yID8gRU1QVFkgOiB0aHJvd0Vycm9yKGUpKSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YUtleXMob2JqOiBPYmplY3QpOiBBcnJheTxzdHJpbmd8c3ltYm9sPiB7XG4gIHJldHVybiBbLi4uT2JqZWN0LmtleXMob2JqKSwgLi4uT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopXTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVzb2x2ZXIoXG4gICAgaW5qZWN0aW9uVG9rZW46IGFueSwgZnV0dXJlQVJTOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBmdXR1cmVSU1M6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgbW9kdWxlSW5qZWN0b3I6IEluamVjdG9yKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgY29uc3QgcmVzb2x2ZXIgPSBnZXRUb2tlbihpbmplY3Rpb25Ub2tlbiwgZnV0dXJlQVJTLCBtb2R1bGVJbmplY3Rvcik7XG4gIHJldHVybiByZXNvbHZlci5yZXNvbHZlID8gd3JhcEludG9PYnNlcnZhYmxlKHJlc29sdmVyLnJlc29sdmUoZnV0dXJlQVJTLCBmdXR1cmVSU1MpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEludG9PYnNlcnZhYmxlKHJlc29sdmVyKGZ1dHVyZUFSUywgZnV0dXJlUlNTKSk7XG59XG5cbmZ1bmN0aW9uIGhhc1N0YXRpY1RpdGxlKGNvbmZpZzogUm91dGUpIHtcbiAgcmV0dXJuIHR5cGVvZiBjb25maWcudGl0bGUgPT09ICdzdHJpbmcnIHx8IGNvbmZpZy50aXRsZSA9PT0gbnVsbDtcbn1cbiJdfQ==