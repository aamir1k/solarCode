/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { equalParamsAndUrlSegments } from '../router_state';
import { equalPath } from '../url_tree';
import { forEach, shallowEqual } from '../utils/collection';
import { getClosestRouteInjector } from '../utils/config';
import { nodeChildrenAsMap } from '../utils/tree';
export class CanActivate {
    constructor(path) {
        this.path = path;
        this.route = this.path[this.path.length - 1];
    }
}
export class CanDeactivate {
    constructor(component, route) {
        this.component = component;
        this.route = route;
    }
}
export function getAllRouteGuards(future, curr, parentContexts) {
    const futureRoot = future._root;
    const currRoot = curr ? curr._root : null;
    return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
export function getCanActivateChild(p) {
    const canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
    if (!canActivateChild || canActivateChild.length === 0)
        return null;
    return { node: p, guards: canActivateChild };
}
export function getToken(token, snapshot, fallbackInjector) {
    const routeInjector = getClosestRouteInjector(snapshot);
    const injector = routeInjector ?? fallbackInjector;
    return injector.get(token);
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
    canDeactivateChecks: [],
    canActivateChecks: []
}) {
    const prevChildren = nodeChildrenAsMap(currNode);
    // Process the children of the future route
    futureNode.children.forEach(c => {
        getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
        delete prevChildren[c.value.outlet];
    });
    // Process any children left from the current route (not active for the future route)
    forEach(prevChildren, (v, k) => deactivateRouteAndItsChildren(v, contexts.getContext(k), checks));
    return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
    canDeactivateChecks: [],
    canActivateChecks: []
}) {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;
    const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
    // reusing the node
    if (curr && future.routeConfig === curr.routeConfig) {
        const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
        if (shouldRun) {
            checks.canActivateChecks.push(new CanActivate(futurePath));
        }
        else {
            // we need to set the data
            future.data = curr.data;
            future._resolvedData = curr._resolvedData;
        }
        // If we have a component, we need to go through an outlet.
        if (future.component) {
            getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
            // if we have a componentless route, we recurse but keep the same outlet map.
        }
        else {
            getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
        }
        if (shouldRun && context && context.outlet && context.outlet.isActivated) {
            checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
        }
    }
    else {
        if (curr) {
            deactivateRouteAndItsChildren(currNode, context, checks);
        }
        checks.canActivateChecks.push(new CanActivate(futurePath));
        // If we have a component, we need to go through an outlet.
        if (future.component) {
            getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
            // if we have a componentless route, we recurse but keep the same outlet map.
        }
        else {
            getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
        }
    }
    return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
    if (typeof mode === 'function') {
        return mode(curr, future);
    }
    switch (mode) {
        case 'pathParamsChange':
            return !equalPath(curr.url, future.url);
        case 'pathParamsOrQueryParamsChange':
            return !equalPath(curr.url, future.url) ||
                !shallowEqual(curr.queryParams, future.queryParams);
        case 'always':
            return true;
        case 'paramsOrQueryParamsChange':
            return !equalParamsAndUrlSegments(curr, future) ||
                !shallowEqual(curr.queryParams, future.queryParams);
        case 'paramsChange':
        default:
            return !equalParamsAndUrlSegments(curr, future);
    }
}
function deactivateRouteAndItsChildren(route, context, checks) {
    const children = nodeChildrenAsMap(route);
    const r = route.value;
    forEach(children, (node, childName) => {
        if (!r.component) {
            deactivateRouteAndItsChildren(node, context, checks);
        }
        else if (context) {
            deactivateRouteAndItsChildren(node, context.children.getContext(childName), checks);
        }
        else {
            deactivateRouteAndItsChildren(node, null, checks);
        }
    });
    if (!r.component) {
        checks.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
    else if (context && context.outlet && context.outlet.isActivated) {
        checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
    }
    else {
        checks.canDeactivateChecks.push(new CanDeactivate(null, r));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlYWN0aXZhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvdXRpbHMvcHJlYWN0aXZhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFNSCxPQUFPLEVBQXlCLHlCQUF5QixFQUFzQixNQUFNLGlCQUFpQixDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsaUJBQWlCLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFFMUQsTUFBTSxPQUFPLFdBQVc7SUFFdEIsWUFBbUIsSUFBOEI7UUFBOUIsU0FBSSxHQUFKLElBQUksQ0FBMEI7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW1CLFNBQXNCLEVBQVMsS0FBNkI7UUFBNUQsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQXdCO0lBQUcsQ0FBQztDQUNwRjtBQU9ELE1BQU0sVUFBVSxpQkFBaUIsQ0FDN0IsTUFBMkIsRUFBRSxJQUF5QixFQUN0RCxjQUFzQztJQUN4QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRTFDLE9BQU8sbUJBQW1CLENBQUMsVUFBVSxFQUFF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QkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBRXRCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFzQyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtRQUM5RSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUNoQiw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO2FBQU0sSUFBSSxPQUFPLEVBQUU7WUFDbEIsNkJBQTZCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JGO2FBQU07WUFDTCw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUNoQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdEO1NBQU0sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtRQUNsRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakY7U0FBTTtRQUNMLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bkd1YXJkc0FuZFJlc29sdmVyc30gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7Q2hpbGRyZW5PdXRsZXRDb250ZXh0cywgT3V0bGV0Q29udGV4dH0gZnJvbSAnLi4vcm91dGVyX291dGxldF9jb250ZXh0JztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgZXF1YWxQYXJhbXNBbmRVcmxTZWdtZW50cywgUm91dGVyU3RhdGVTbmFwc2hvdH0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7ZXF1YWxQYXRofSBmcm9tICcuLi91cmxfdHJlZSc7XG5pbXBvcnQge2ZvckVhY2gsIHNoYWxsb3dFcXVhbH0gZnJvbSAnLi4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge2dldENsb3Nlc3RSb3V0ZUluamVjdG9yfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtub2RlQ2hpbGRyZW5Bc01hcCwgVHJlZU5vZGV9IGZyb20gJy4uL3V0aWxzL3RyZWUnO1xuXG5leHBvcnQgY2xhc3MgQ2FuQWN0aXZhdGUge1xuICByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RbXSkge1xuICAgIHRoaXMucm91dGUgPSB0aGlzLnBhdGhbdGhpcy5wYXRoLmxlbmd0aCAtIDFdO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW5EZWFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudDogT2JqZWN0fG51bGwsIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge31cbn1cblxuZXhwb3J0IGRlY2xhcmUgdHlwZSBDaGVja3MgPSB7XG4gIGNhbkRlYWN0aXZhdGVDaGVja3M6IENhbkRlYWN0aXZhdGVbXSxcbiAgY2FuQWN0aXZhdGVDaGVja3M6IENhbkFjdGl2YXRlW10sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsUm91dGVHdWFyZHMoXG4gICAgZnV0dXJlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBjdXJyOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxuICAgIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzKSB7XG4gIGNvbnN0IGZ1dHVyZVJvb3QgPSBmdXR1cmUuX3Jvb3Q7XG4gIGNvbnN0IGN1cnJSb290ID0gY3VyciA/IGN1cnIuX3Jvb3QgOiBudWxsO1xuXG4gIHJldHVybiBnZXRDaGlsZFJvdXRlR3VhcmRzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRDb250ZXh0cywgW2Z1dHVyZVJvb3QudmFsdWVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbkFjdGl2YXRlQ2hpbGQocDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6XG4gICAge25vZGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGd1YXJkczogYW55W119fG51bGwge1xuICBjb25zdCBjYW5BY3RpdmF0ZUNoaWxkID0gcC5yb3V0ZUNvbmZpZyA/IHAucm91dGVDb25maWcuY2FuQWN0aXZhdGVDaGlsZCA6IG51bGw7XG4gIGlmICghY2FuQWN0aXZhdGVDaGlsZCB8fCBjYW5BY3RpdmF0ZUNoaWxkLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gIHJldHVybiB7bm9kZTogcCwgZ3VhcmRzOiBjYW5BY3RpdmF0ZUNoaWxkfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRva2VuKFxuICAgIHRva2VuOiBhbnksIHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBmYWxsYmFja0luamVjdG9yOiBJbmplY3Rvcik6IGFueSB7XG4gIGNvbnN0IHJvdXRlSW5qZWN0b3IgPSBnZXRDbG9zZXN0Um91dGVJbmplY3RvcihzbmFwc2hvdCk7XG4gIGNvbnN0IGluamVjdG9yID0gcm91dGVJbmplY3RvciA/PyBmYWxsYmFja0luamVjdG9yO1xuICByZXR1cm4gaW5qZWN0b3IuZ2V0KHRva2VuKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hpbGRSb3V0ZUd1YXJkcyhcbiAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+fG51bGwsXG4gICAgY29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHN8bnVsbCwgZnV0dXJlUGF0aDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFtdLCBjaGVja3M6IENoZWNrcyA9IHtcbiAgICAgIGNhbkRlYWN0aXZhdGVDaGVja3M6IFtdLFxuICAgICAgY2FuQWN0aXZhdGVDaGVja3M6IFtdXG4gICAgfSk6IENoZWNrcyB7XG4gIGNvbnN0IHByZXZDaGlsZHJlbiA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcblxuICAvLyBQcm9jZXNzIHRoZSBjaGlsZHJlbiBvZiB0aGUgZnV0dXJlIHJvdXRlXG4gIGZ1dHVyZU5vZGUuY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcbiAgICBnZXRSb3V0ZUd1YXJkcyhjLCBwcmV2Q2hpbGRyZW5bYy52YWx1ZS5vdXRsZXRdLCBjb250ZXh0cywgZnV0dXJlUGF0aC5jb25jYXQoW2MudmFsdWVdKSwgY2hlY2tzKTtcbiAgICBkZWxldGUgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XTtcbiAgfSk7XG5cbiAgLy8gUHJvY2VzcyBhbnkgY2hpbGRyZW4gbGVmdCBmcm9tIHRoZSBjdXJyZW50IHJvdXRlIChub3QgYWN0aXZlIGZvciB0aGUgZnV0dXJlIHJvdXRlKVxuICBmb3JFYWNoKFxuICAgICAgcHJldkNoaWxkcmVuLFxuICAgICAgKHY6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBrOiBzdHJpbmcpID0+XG4gICAgICAgICAgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4odiwgY29udGV4dHMhLmdldENvbnRleHQoayksIGNoZWNrcykpO1xuXG4gIHJldHVybiBjaGVja3M7XG59XG5cbmZ1bmN0aW9uIGdldFJvdXRlR3VhcmRzKFxuICAgIGZ1dHVyZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBjdXJyTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4sXG4gICAgcGFyZW50Q29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHN8bnVsbCwgZnV0dXJlUGF0aDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFtdLFxuICAgIGNoZWNrczogQ2hlY2tzID0ge1xuICAgICAgY2FuRGVhY3RpdmF0ZUNoZWNrczogW10sXG4gICAgICBjYW5BY3RpdmF0ZUNoZWNrczogW11cbiAgICB9KTogQ2hlY2tzIHtcbiAgY29uc3QgZnV0dXJlID0gZnV0dXJlTm9kZS52YWx1ZTtcbiAgY29uc3QgY3VyciA9IGN1cnJOb2RlID8gY3Vyck5vZGUudmFsdWUgOiBudWxsO1xuICBjb25zdCBjb250ZXh0ID0gcGFyZW50Q29udGV4dHMgPyBwYXJlbnRDb250ZXh0cy5nZXRDb250ZXh0KGZ1dHVyZU5vZGUudmFsdWUub3V0bGV0KSA6IG51bGw7XG5cbiAgLy8gcmV1c2luZyB0aGUgbm9kZVxuICBpZiAoY3VyciAmJiBmdXR1cmUucm91dGVDb25maWcgPT09IGN1cnIucm91dGVDb25maWcpIHtcbiAgICBjb25zdCBzaG91bGRSdW4gPVxuICAgICAgICBzaG91bGRSdW5HdWFyZHNBbmRSZXNvbHZlcnMoY3VyciwgZnV0dXJlLCBmdXR1cmUucm91dGVDb25maWchLnJ1bkd1YXJkc0FuZFJlc29sdmVycyk7XG4gICAgaWYgKHNob3VsZFJ1bikge1xuICAgICAgY2hlY2tzLmNhbkFjdGl2YXRlQ2hlY2tzLnB1c2gobmV3IENhbkFjdGl2YXRlKGZ1dHVyZVBhdGgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2UgbmVlZCB0byBzZXQgdGhlIGRhdGFcbiAgICAgIGZ1dHVyZS5kYXRhID0gY3Vyci5kYXRhO1xuICAgICAgZnV0dXJlLl9yZXNvbHZlZERhdGEgPSBjdXJyLl9yZXNvbHZlZERhdGE7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIGNvbXBvbmVudCwgd2UgbmVlZCB0byBnbyB0aHJvdWdoIGFuIG91dGxldC5cbiAgICBpZiAoZnV0dXJlLmNvbXBvbmVudCkge1xuICAgICAgZ2V0Q2hpbGRSb3V0ZUd1YXJkcyhcbiAgICAgICAgICBmdXR1cmVOb2RlLCBjdXJyTm9kZSwgY29udGV4dCA/IGNvbnRleHQuY2hpbGRyZW4gOiBudWxsLCBmdXR1cmVQYXRoLCBjaGVja3MpO1xuXG4gICAgICAvLyBpZiB3ZSBoYXZlIGEgY29tcG9uZW50bGVzcyByb3V0ZSwgd2UgcmVjdXJzZSBidXQga2VlcCB0aGUgc2FtZSBvdXRsZXQgbWFwLlxuICAgIH0gZWxzZSB7XG4gICAgICBnZXRDaGlsZFJvdXRlR3VhcmRzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBwYXJlbnRDb250ZXh0cywgZnV0dXJlUGF0aCwgY2hlY2tzKTtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkUnVuICYmIGNvbnRleHQgJiYgY29udGV4dC5vdXRsZXQgJiYgY29udGV4dC5vdXRsZXQuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIGNoZWNrcy5jYW5EZWFjdGl2YXRlQ2hlY2tzLnB1c2gobmV3IENhbkRlYWN0aXZhdGUoY29udGV4dC5vdXRsZXQuY29tcG9uZW50LCBjdXJyKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChjdXJyKSB7XG4gICAgICBkZWFjdGl2YXRlUm91dGVBbmRJdHNDaGlsZHJlbihjdXJyTm9kZSwgY29udGV4dCwgY2hlY2tzKTtcbiAgICB9XG5cbiAgICBjaGVja3MuY2FuQWN0aXZhdGVDaGVja3MucHVzaChuZXcgQ2FuQWN0aXZhdGUoZnV0dXJlUGF0aCkpO1xuICAgIC8vIElmIHdlIGhhdmUgYSBjb21wb25lbnQsIHdlIG5lZWQgdG8gZ28gdGhyb3VnaCBhbiBvdXRsZXQuXG4gICAgaWYgKGZ1dHVyZS5jb21wb25lbnQpIHtcbiAgICAgIGdldENoaWxkUm91dGVHdWFyZHMoZnV0dXJlTm9kZSwgbnVsbCwgY29udGV4dCA/IGNvbnRleHQuY2hpbGRyZW4gOiBudWxsLCBmdXR1cmVQYXRoLCBjaGVja3MpO1xuXG4gICAgICAvLyBpZiB3ZSBoYXZlIGEgY29tcG9uZW50bGVzcyByb3V0ZSwgd2UgcmVjdXJzZSBidXQga2VlcCB0aGUgc2FtZSBvdXRsZXQgbWFwLlxuICAgIH0gZWxzZSB7XG4gICAgICBnZXRDaGlsZFJvdXRlR3VhcmRzKGZ1dHVyZU5vZGUsIG51bGwsIHBhcmVudENvbnRleHRzLCBmdXR1cmVQYXRoLCBjaGVja3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjaGVja3M7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFJ1bkd1YXJkc0FuZFJlc29sdmVycyhcbiAgICBjdXJyOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBmdXR1cmU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gICAgbW9kZTogUnVuR3VhcmRzQW5kUmVzb2x2ZXJzfHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIG1vZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbW9kZShjdXJyLCBmdXR1cmUpO1xuICB9XG4gIHN3aXRjaCAobW9kZSkge1xuICAgIGNhc2UgJ3BhdGhQYXJhbXNDaGFuZ2UnOlxuICAgICAgcmV0dXJuICFlcXVhbFBhdGgoY3Vyci51cmwsIGZ1dHVyZS51cmwpO1xuXG4gICAgY2FzZSAncGF0aFBhcmFtc09yUXVlcnlQYXJhbXNDaGFuZ2UnOlxuICAgICAgcmV0dXJuICFlcXVhbFBhdGgoY3Vyci51cmwsIGZ1dHVyZS51cmwpIHx8XG4gICAgICAgICAgIXNoYWxsb3dFcXVhbChjdXJyLnF1ZXJ5UGFyYW1zLCBmdXR1cmUucXVlcnlQYXJhbXMpO1xuXG4gICAgY2FzZSAnYWx3YXlzJzpcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSAncGFyYW1zT3JRdWVyeVBhcmFtc0NoYW5nZSc6XG4gICAgICByZXR1cm4gIWVxdWFsUGFyYW1zQW5kVXJsU2VnbWVudHMoY3VyciwgZnV0dXJlKSB8fFxuICAgICAgICAgICFzaGFsbG93RXF1YWwoY3Vyci5xdWVyeVBhcmFtcywgZnV0dXJlLnF1ZXJ5UGFyYW1zKTtcblxuICAgIGNhc2UgJ3BhcmFtc0NoYW5nZSc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAhZXF1YWxQYXJhbXNBbmRVcmxTZWdtZW50cyhjdXJyLCBmdXR1cmUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlYWN0aXZhdGVSb3V0ZUFuZEl0c0NoaWxkcmVuKFxuICAgIHJvdXRlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY29udGV4dDogT3V0bGV0Q29udGV4dHxudWxsLCBjaGVja3M6IENoZWNrcyk6IHZvaWQge1xuICBjb25zdCBjaGlsZHJlbiA9IG5vZGVDaGlsZHJlbkFzTWFwKHJvdXRlKTtcbiAgY29uc3QgciA9IHJvdXRlLnZhbHVlO1xuXG4gIGZvckVhY2goY2hpbGRyZW4sIChub2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY2hpbGROYW1lOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXIuY29tcG9uZW50KSB7XG4gICAgICBkZWFjdGl2YXRlUm91dGVBbmRJdHNDaGlsZHJlbihub2RlLCBjb250ZXh0LCBjaGVja3MpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCkge1xuICAgICAgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4obm9kZSwgY29udGV4dC5jaGlsZHJlbi5nZXRDb250ZXh0KGNoaWxkTmFtZSksIGNoZWNrcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYWN0aXZhdGVSb3V0ZUFuZEl0c0NoaWxkcmVuKG5vZGUsIG51bGwsIGNoZWNrcyk7XG4gICAgfVxuICB9KTtcblxuICBpZiAoIXIuY29tcG9uZW50KSB7XG4gICAgY2hlY2tzLmNhbkRlYWN0aXZhdGVDaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShudWxsLCByKSk7XG4gIH0gZWxzZSBpZiAoY29udGV4dCAmJiBjb250ZXh0Lm91dGxldCAmJiBjb250ZXh0Lm91dGxldC5pc0FjdGl2YXRlZCkge1xuICAgIGNoZWNrcy5jYW5EZWFjdGl2YXRlQ2hlY2tzLnB1c2gobmV3IENhbkRlYWN0aXZhdGUoY29udGV4dC5vdXRsZXQuY29tcG9uZW50LCByKSk7XG4gIH0gZWxzZSB7XG4gICAgY2hlY2tzLmNhbkRlYWN0aXZhdGVDaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShudWxsLCByKSk7XG4gIH1cbn1cbiJdfQ==