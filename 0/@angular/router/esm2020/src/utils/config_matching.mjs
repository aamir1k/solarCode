/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defaultUrlMatcher, PRIMARY_OUTLET } from '../shared';
import { UrlSegmentGroup } from '../url_tree';
import { forEach } from './collection';
import { getOutlet } from './config';
const noMatch = {
    matched: false,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {}
};
export function match(segmentGroup, route, segments) {
    if (route.path === '') {
        if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
            return { ...noMatch };
        }
        return {
            matched: true,
            consumedSegments: [],
            remainingSegments: segments,
            parameters: {},
            positionalParamSegments: {}
        };
    }
    const matcher = route.matcher || defaultUrlMatcher;
    const res = matcher(segments, segmentGroup, route);
    if (!res)
        return { ...noMatch };
    const posParams = {};
    forEach(res.posParams, (v, k) => {
        posParams[k] = v.path;
    });
    const parameters = res.consumed.length > 0 ?
        { ...posParams, ...res.consumed[res.consumed.length - 1].parameters } :
        posParams;
    return {
        matched: true,
        consumedSegments: res.consumed,
        remainingSegments: segments.slice(res.consumed.length),
        // TODO(atscott): investigate combining parameters and positionalParamSegments
        parameters,
        positionalParamSegments: res.posParams ?? {}
    };
}
export function split(segmentGroup, consumedSegments, slicedSegments, config, relativeLinkResolution = 'corrected') {
    if (slicedSegments.length > 0 &&
        containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        const s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments: [] };
    }
    if (slicedSegments.length === 0 &&
        containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
        const s = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, config, segmentGroup.children, relativeLinkResolution));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments };
    }
    const s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
    s._sourceSegment = segmentGroup;
    s._segmentIndexShift = consumedSegments.length;
    return { segmentGroup: s, slicedSegments };
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, routes, children, relativeLinkResolution) {
    const res = {};
    for (const r of routes) {
        if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
            const s = new UrlSegmentGroup([], {});
            s._sourceSegment = segmentGroup;
            if (relativeLinkResolution === 'legacy') {
                s._segmentIndexShift = segmentGroup.segments.length;
                if (typeof ngDevMode === 'undefined' || !!ngDevMode) {
                    s._segmentIndexShiftCorrected = consumedSegments.length;
                }
            }
            else {
                s._segmentIndexShift = consumedSegments.length;
            }
            res[getOutlet(r)] = s;
        }
    }
    return { ...children, ...res };
}
function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
    const res = {};
    res[PRIMARY_OUTLET] = primarySegment;
    primarySegment._sourceSegment = segmentGroup;
    primarySegment._segmentIndexShift = consumedSegments.length;
    for (const r of routes) {
        if (r.path === '' && getOutlet(r) !== PRIMARY_OUTLET) {
            const s = new UrlSegmentGroup([], {});
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = consumedSegments.length;
            res[getOutlet(r)] = s;
        }
    }
    return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
    return routes.some(r => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== PRIMARY_OUTLET);
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
    return routes.some(r => emptyPathMatch(segmentGroup, slicedSegments, r));
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
    if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full') {
        return false;
    }
    return r.path === '';
}
/**
 * Determines if `route` is a path match for the `rawSegment`, `segments`, and `outlet` without
 * verifying that its children are a full match for the remainder of the `rawSegment` children as
 * well.
 */
export function isImmediateMatch(route, rawSegment, segments, outlet) {
    // We allow matches to empty paths when the outlets differ so we can match a url like `/(b:b)` to
    // a config like
    // * `{path: '', children: [{path: 'b', outlet: 'b'}]}`
    // or even
    // * `{path: '', outlet: 'a', children: [{path: 'b', outlet: 'b'}]`
    //
    // The exception here is when the segment outlet is for the primary outlet. This would
    // result in a match inside the named outlet because all children there are written as primary
    // outlets. So we need to prevent child named outlet matches in a url like `/b` in a config like
    // * `{path: '', outlet: 'x' children: [{path: 'b'}]}`
    // This should only match if the url is `/(x:b)`.
    if (getOutlet(route) !== outlet &&
        (outlet === PRIMARY_OUTLET || !emptyPathMatch(rawSegment, segments, route))) {
        return false;
    }
    if (route.path === '**') {
        return true;
    }
    return match(rawSegment, route, segments).matched;
}
export function noLeftoversInUrl(segmentGroup, segments, outlet) {
    return segments.length === 0 && !segmentGroup.children[outlet];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnX21hdGNoaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy91dGlscy9jb25maWdfbWF0Y2hpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1RCxPQUFPLEVBQWEsZUFBZSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXhELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDckMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQVVuQyxNQUFNLE9BQU8sR0FBZ0I7SUFDM0IsT0FBTyxFQUFFLEtBQUs7SUFDZCxnQkFBZ0IsRUFBRSxFQUFFO0lBQ3BCLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsVUFBVSxFQUFFLEVBQUU7SUFDZCx1QkFBdUIsRUFBRSxFQUFFO0NBQzVCLENBQUM7QUFFRixNQUFNLFVBQVUsS0FBSyxDQUNqQixZQUE2QixFQUFFLEtBQVksRUFBRSxRQUFzQjtJQUNyRSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1FBQ3JCLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNyRixPQUFPLEVBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsaUJBQWlCLEVBQUUsUUFBUTtZQUMzQixVQUFVLEVBQUUsRUFBRTtZQUNkLHVCQUF1QixFQUFFLEVBQUU7U0FDNUIsQ0FBQztLQUNIO0lBRUQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9B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SSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO1FBQ3ZGLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3ZCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUM1QixLQUFZLEVBQUUsVUFBMkIsRUFBRSxRQUFzQixFQUFFLE1BQWM7SUFDbkYsaUdBQWlHO0lBQ2pHLGdCQUFnQjtJQUNoQix1REFBdUQ7SUFDdkQsVUFBVTtJQUNWLG1FQUFtRTtJQUNuRSxFQUFFO0lBQ0Ysc0ZBQXNGO0lBQ3RGLDhGQUE4RjtJQUM5RixnR0FBZ0c7SUFDaEcsc0RBQXNEO0lBQ3RELGlEQUFpRDtJQUNqRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxNQUFNO1FBQzNCLENBQUMsTUFBTSxLQUFLLGNBQWMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0UsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3BELENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQzVCLFlBQTZCLEVBQUUsUUFBc0IsRUFBRSxNQUFjO0lBQ3ZFLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSb3V0ZX0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7ZGVmYXVsdFVybE1hdGNoZXIsIFBSSU1BUllfT1VUTEVUfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHtVcmxTZWdtZW50LCBVcmxTZWdtZW50R3JvdXB9IGZyb20gJy4uL3VybF90cmVlJztcblxuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtnZXRPdXRsZXR9IGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaFJlc3VsdCB7XG4gIG1hdGNoZWQ6IGJvb2xlYW47XG4gIGNvbnN1bWVkU2VnbWVudHM6IFVybFNlZ21lbnRbXTtcbiAgcmVtYWluaW5nU2VnbWVudHM6IFVybFNlZ21lbnRbXTtcbiAgcGFyYW1ldGVyczoge1trOiBzdHJpbmddOiBzdHJpbmd9O1xuICBwb3NpdGlvbmFsUGFyYW1TZWdtZW50czoge1trOiBzdHJpbmddOiBVcmxTZWdtZW50fTtcbn1cblxuY29uc3Qgbm9NYXRjaDogTWF0Y2hSZXN1bHQgPSB7XG4gIG1hdGNoZWQ6IGZhbHNlLFxuICBjb25zdW1lZFNlZ21lbnRzOiBbXSxcbiAgcmVtYWluaW5nU2VnbWVudHM6IFtdLFxuICBwYXJhbWV0ZXJzOiB7fSxcbiAgcG9zaXRpb25hbFBhcmFtU2VnbWVudHM6IHt9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2goXG4gICAgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHJvdXRlOiBSb3V0ZSwgc2VnbWVudHM6IFVybFNlZ21lbnRbXSk6IE1hdGNoUmVzdWx0IHtcbiAgaWYgKHJvdXRlLnBhdGggPT09ICcnKSB7XG4gICAgaWYgKHJvdXRlLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnICYmIChzZWdtZW50R3JvdXAuaGFzQ2hpbGRyZW4oKSB8fCBzZWdtZW50cy5sZW5ndGggPiAwKSkge1xuICAgICAgcmV0dXJuIHsuLi5ub01hdGNofTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWF0Y2hlZDogdHJ1ZSxcbiAgICAgIGNvbnN1bWVkU2VnbWVudHM6IFtdLFxuICAgICAgcmVtYWluaW5nU2VnbWVudHM6IHNlZ21lbnRzLFxuICAgICAgcGFyYW1ldGVyczoge30sXG4gICAgICBwb3NpdGlvbmFsUGFyYW1TZWdtZW50czoge31cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlciA9IHJvdXRlLm1hdGNoZXIgfHwgZGVmYXVsdFVybE1hdGNoZXI7XG4gIGNvbnN0IHJlcyA9IG1hdGNoZXIoc2VnbWVudHMsIHNlZ21lbnRHcm91cCwgcm91dGUpO1xuICBpZiAoIXJlcykgcmV0dXJuIHsuLi5ub01hdGNofTtcblxuICBjb25zdCBwb3NQYXJhbXM6IHtbbjogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBmb3JFYWNoKHJlcy5wb3NQYXJhbXMhLCAodjogVXJsU2VnbWVudCwgazogc3RyaW5nKSA9PiB7XG4gICAgcG9zUGFyYW1zW2tdID0gdi5wYXRoO1xuICB9KTtcbiAgY29uc3QgcGFyYW1ldGVycyA9IHJlcy5jb25zdW1lZC5sZW5ndGggPiAwID9cbiAgICAgIHsuLi5wb3NQYXJhbXMsIC4uLnJlcy5jb25zdW1lZFtyZXMuY29uc3VtZWQubGVuZ3RoIC0gMV0ucGFyYW1ldGVyc30gOlxuICAgICAgcG9zUGFyYW1zO1xuXG4gIHJldHVybiB7XG4gICAgbWF0Y2hlZDogdHJ1ZSxcbiAgICBjb25zdW1lZFNlZ21lbnRzOiByZXMuY29uc3VtZWQsXG4gICAgcmVtYWluaW5nU2VnbWVudHM6IHNlZ21lbnRzLnNsaWNlKHJlcy5jb25zdW1lZC5sZW5ndGgpLFxuICAgIC8vIFRPRE8oYXRzY290dCk6IGludmVzdGlnYXRlIGNvbWJpbmluZyBwYXJhbWV0ZXJzIGFuZCBwb3NpdGlvbmFsUGFyYW1TZWdtZW50c1xuICAgIHBhcmFtZXRlcnMsXG4gICAgcG9zaXRpb25hbFBhcmFtU2VnbWVudHM6IHJlcy5wb3NQYXJhbXMgPz8ge31cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0KFxuICAgIHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwLCBjb25zdW1lZFNlZ21lbnRzOiBVcmxTZWdtZW50W10sIHNsaWNlZFNlZ21lbnRzOiBVcmxTZWdtZW50W10sXG4gICAgY29uZmlnOiBSb3V0ZVtdLCByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uOiAnbGVnYWN5J3wnY29ycmVjdGVkJyA9ICdjb3JyZWN0ZWQnKSB7XG4gIGlmIChzbGljZWRTZWdtZW50cy5sZW5ndGggPiAwICYmXG4gICAgICBjb250YWluc0VtcHR5UGF0aE1hdGNoZXNXaXRoTmFtZWRPdXRsZXRzKHNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHMsIGNvbmZpZykpIHtcbiAgICBjb25zdCBzID0gbmV3IFVybFNlZ21lbnRHcm91cChcbiAgICAgICAgY29uc3VtZWRTZWdtZW50cyxcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW5Gb3JFbXB0eVBhdGhzKFxuICAgICAgICAgICAgc2VnbWVudEdyb3VwLCBjb25zdW1lZFNlZ21lbnRzLCBjb25maWcsXG4gICAgICAgICAgICBuZXcgVXJsU2VnbWVudEdyb3VwKHNsaWNlZFNlZ21lbnRzLCBzZWdtZW50R3JvdXAuY2hpbGRyZW4pKSk7XG4gICAgcy5fc291cmNlU2VnbWVudCA9IHNlZ21lbnRHcm91cDtcbiAgICBzLl9zZWdtZW50SW5kZXhTaGlmdCA9IGNvbnN1bWVkU2VnbWVudHMubGVuZ3RoO1xuICAgIHJldHVybiB7c2VnbWVudEdyb3VwOiBzLCBzbGljZWRTZWdtZW50czogW119O1xuICB9XG5cbiAgaWYgKHNsaWNlZFNlZ21lbnRzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgY29udGFpbnNFbXB0eVBhdGhNYXRjaGVzKHNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHMsIGNvbmZpZykpIHtcbiAgICBjb25zdCBzID0gbmV3IFVybFNlZ21lbnRHcm91cChcbiAgICAgICAgc2VnbWVudEdyb3VwLnNlZ21lbnRzLFxuICAgICAgICBhZGRFbXB0eVBhdGhzVG9DaGlsZHJlbklmTmVlZGVkKFxuICAgICAgICAgICAgc2VnbWVudEdyb3VwLCBjb25zdW1lZFNlZ21lbnRzLCBzbGljZWRTZWdtZW50cywgY29uZmlnLCBzZWdtZW50R3JvdXAuY2hpbGRyZW4sXG4gICAgICAgICAgICByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uKSk7XG4gICAgcy5fc291cmNlU2VnbWVudCA9IHNlZ21lbnRHcm91cDtcbiAgICBzLl9zZWdtZW50SW5kZXhTaGlmdCA9IGNvbnN1bWVkU2VnbWVudHMubGVuZ3RoO1xuICAgIHJldHVybiB7c2VnbWVudEdyb3VwOiBzLCBzbGljZWRTZWdtZW50c307XG4gIH1cblxuICBjb25zdCBzID0gbmV3IFVybFNlZ21lbnRHcm91cChzZWdtZW50R3JvdXAuc2VnbWVudHMsIHNlZ21lbnRHcm91cC5jaGlsZHJlbik7XG4gIHMuX3NvdXJjZVNlZ21lbnQgPSBzZWdtZW50R3JvdXA7XG4gIHMuX3NlZ21lbnRJbmRleFNoaWZ0ID0gY29uc3VtZWRTZWdtZW50cy5sZW5ndGg7XG4gIHJldHVybiB7c2VnbWVudEdyb3VwOiBzLCBzbGljZWRTZWdtZW50c307XG59XG5cbmZ1bmN0aW9uIGFkZEVtcHR5UGF0aHNUb0NoaWxkcmVuSWZOZWVkZWQoXG4gICAgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIGNvbnN1bWVkU2VnbWVudHM6IFVybFNlZ21lbnRbXSwgc2xpY2VkU2VnbWVudHM6IFVybFNlZ21lbnRbXSxcbiAgICByb3V0ZXM6IFJvdXRlW10sIGNoaWxkcmVuOiB7W25hbWU6IHN0cmluZ106IFVybFNlZ21lbnRHcm91cH0sXG4gICAgcmVsYXRpdmVMaW5rUmVzb2x1dGlvbjogJ2xlZ2FjeSd8J2NvcnJlY3RlZCcpOiB7W25hbWU6IHN0cmluZ106IFVybFNlZ21lbnRHcm91cH0ge1xuICBjb25zdCByZXM6IHtbbmFtZTogc3RyaW5nXTogVXJsU2VnbWVudEdyb3VwfSA9IHt9O1xuICBmb3IgKGNvbnN0IHIgb2Ygcm91dGVzKSB7XG4gICAgaWYgKGVtcHR5UGF0aE1hdGNoKHNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHMsIHIpICYmICFjaGlsZHJlbltnZXRPdXRsZXQocildKSB7XG4gICAgICBjb25zdCBzID0gbmV3IFVybFNlZ21lbnRHcm91cChbXSwge30pO1xuICAgICAgcy5fc291cmNlU2VnbWVudCA9IHNlZ21lbnRHcm91cDtcbiAgICAgIGlmIChyZWxhdGl2ZUxpbmtSZXNvbHV0aW9uID09PSAnbGVnYWN5Jykge1xuICAgICAgICBzLl9zZWdtZW50SW5kZXhTaGlmdCA9IHNlZ21lbnRHcm91cC5zZWdtZW50cy5sZW5ndGg7XG4gICAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCAhIW5nRGV2TW9kZSkge1xuICAgICAgICAgIHMuX3NlZ21lbnRJbmRleFNoaWZ0Q29ycmVjdGVkID0gY29uc3VtZWRTZWdtZW50cy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMuX3NlZ21lbnRJbmRleFNoaWZ0ID0gY29uc3VtZWRTZWdtZW50cy5sZW5ndGg7XG4gICAgICB9XG4gICAgICByZXNbZ2V0T3V0bGV0KHIpXSA9IHM7XG4gICAgfVxuICB9XG4gIHJldHVybiB7Li4uY2hpbGRyZW4sIC4uLnJlc307XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoaWxkcmVuRm9yRW1wdHlQYXRocyhcbiAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgY29uc3VtZWRTZWdtZW50czogVXJsU2VnbWVudFtdLCByb3V0ZXM6IFJvdXRlW10sXG4gICAgcHJpbWFyeVNlZ21lbnQ6IFVybFNlZ21lbnRHcm91cCk6IHtbbmFtZTogc3RyaW5nXTogVXJsU2VnbWVudEdyb3VwfSB7XG4gIGNvbnN0IHJlczoge1tuYW1lOiBzdHJpbmddOiBVcmxTZWdtZW50R3JvdXB9ID0ge307XG4gIHJlc1tQUklNQVJZX09VVExFVF0gPSBwcmltYXJ5U2VnbWVudDtcbiAgcHJpbWFyeVNlZ21lbnQuX3NvdXJjZVNlZ21lbnQgPSBzZWdtZW50R3JvdXA7XG4gIHByaW1hcnlTZWdtZW50Ll9zZWdtZW50SW5kZXhTaGlmdCA9IGNvbnN1bWVkU2VnbWVudHMubGVuZ3RoO1xuXG4gIGZvciAoY29uc3QgciBvZiByb3V0ZXMpIHtcbiAgICBpZiAoci5wYXRoID09PSAnJyAmJiBnZXRPdXRsZXQocikgIT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICBjb25zdCBzID0gbmV3IFVybFNlZ21lbnRHcm91cChbXSwge30pO1xuICAgICAgcy5fc291cmNlU2VnbWVudCA9IHNlZ21lbnRHcm91cDtcbiAgICAgIHMuX3NlZ21lbnRJbmRleFNoaWZ0ID0gY29uc3VtZWRTZWdtZW50cy5sZW5ndGg7XG4gICAgICByZXNbZ2V0T3V0bGV0KHIpXSA9IHM7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zRW1wdHlQYXRoTWF0Y2hlc1dpdGhOYW1lZE91dGxldHMoXG4gICAgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzOiBVcmxTZWdtZW50W10sIHJvdXRlczogUm91dGVbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gcm91dGVzLnNvbWUoXG4gICAgICByID0+IGVtcHR5UGF0aE1hdGNoKHNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHMsIHIpICYmIGdldE91dGxldChyKSAhPT0gUFJJTUFSWV9PVVRMRVQpO1xufVxuXG5mdW5jdGlvbiBjb250YWluc0VtcHR5UGF0aE1hdGNoZXMoXG4gICAgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzOiBVcmxTZWdtZW50W10sIHJvdXRlczogUm91dGVbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gcm91dGVzLnNvbWUociA9PiBlbXB0eVBhdGhNYXRjaChzZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzLCByKSk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5UGF0aE1hdGNoKFxuICAgIHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwLCBzbGljZWRTZWdtZW50czogVXJsU2VnbWVudFtdLCByOiBSb3V0ZSk6IGJvb2xlYW4ge1xuICBpZiAoKHNlZ21lbnRHcm91cC5oYXNDaGlsZHJlbigpIHx8IHNsaWNlZFNlZ21lbnRzLmxlbmd0aCA+IDApICYmIHIucGF0aE1hdGNoID09PSAnZnVsbCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gci5wYXRoID09PSAnJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGByb3V0ZWAgaXMgYSBwYXRoIG1hdGNoIGZvciB0aGUgYHJhd1NlZ21lbnRgLCBgc2VnbWVudHNgLCBhbmQgYG91dGxldGAgd2l0aG91dFxuICogdmVyaWZ5aW5nIHRoYXQgaXRzIGNoaWxkcmVuIGFyZSBhIGZ1bGwgbWF0Y2ggZm9yIHRoZSByZW1haW5kZXIgb2YgdGhlIGByYXdTZWdtZW50YCBjaGlsZHJlbiBhc1xuICogd2VsbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW1tZWRpYXRlTWF0Y2goXG4gICAgcm91dGU6IFJvdXRlLCByYXdTZWdtZW50OiBVcmxTZWdtZW50R3JvdXAsIHNlZ21lbnRzOiBVcmxTZWdtZW50W10sIG91dGxldDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIC8vIFdlIGFsbG93IG1hdGNoZXMgdG8gZW1wdHkgcGF0aHMgd2hlbiB0aGUgb3V0bGV0cyBkaWZmZXIgc28gd2UgY2FuIG1hdGNoIGEgdXJsIGxpa2UgYC8oYjpiKWAgdG9cbiAgLy8gYSBjb25maWcgbGlrZVxuICAvLyAqIGB7cGF0aDogJycsIGNoaWxkcmVuOiBbe3BhdGg6ICdiJywgb3V0bGV0OiAnYid9XX1gXG4gIC8vIG9yIGV2ZW5cbiAgLy8gKiBge3BhdGg6ICcnLCBvdXRsZXQ6ICdhJywgY2hpbGRyZW46IFt7cGF0aDogJ2InLCBvdXRsZXQ6ICdiJ31dYFxuICAvL1xuICAvLyBUaGUgZXhjZXB0aW9uIGhlcmUgaXMgd2hlbiB0aGUgc2VnbWVudCBvdXRsZXQgaXMgZm9yIHRoZSBwcmltYXJ5IG91dGxldC4gVGhpcyB3b3VsZFxuICAvLyByZXN1bHQgaW4gYSBtYXRjaCBpbnNpZGUgdGhlIG5hbWVkIG91dGxldCBiZWNhdXNlIGFsbCBjaGlsZHJlbiB0aGVyZSBhcmUgd3JpdHRlbiBhcyBwcmltYXJ5XG4gIC8vIG91dGxldHMuIFNvIHdlIG5lZWQgdG8gcHJldmVudCBjaGlsZCBuYW1lZCBvdXRsZXQgbWF0Y2hlcyBpbiBhIHVybCBsaWtlIGAvYmAgaW4gYSBjb25maWcgbGlrZVxuICAvLyAqIGB7cGF0aDogJycsIG91dGxldDogJ3gnIGNoaWxkcmVuOiBbe3BhdGg6ICdiJ31dfWBcbiAgLy8gVGhpcyBzaG91bGQgb25seSBtYXRjaCBpZiB0aGUgdXJsIGlzIGAvKHg6YilgLlxuICBpZiAoZ2V0T3V0bGV0KHJvdXRlKSAhPT0gb3V0bGV0ICYmXG4gICAgICAob3V0bGV0ID09PSBQUklNQVJZX09VVExFVCB8fCAhZW1wdHlQYXRoTWF0Y2gocmF3U2VnbWVudCwgc2VnbWVudHMsIHJvdXRlKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHJvdXRlLnBhdGggPT09ICcqKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gbWF0Y2gocmF3U2VnbWVudCwgcm91dGUsIHNlZ21lbnRzKS5tYXRjaGVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9MZWZ0b3ZlcnNJblVybChcbiAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgc2VnbWVudHM6IFVybFNlZ21lbnRbXSwgb3V0bGV0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIHNlZ21lbnRzLmxlbmd0aCA9PT0gMCAmJiAhc2VnbWVudEdyb3VwLmNoaWxkcmVuW291dGxldF07XG59XG4iXX0=