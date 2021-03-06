/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Parses a CSS time value to milliseconds. */
function parseCssTimeUnitsToMs(value) {
    // Some browsers will return it in seconds, whereas others will return milliseconds.
    const multiplier = value.toLowerCase().indexOf('ms') > -1 ? 1 : 1000;
    return parseFloat(value) * multiplier;
}
/** Gets the transform transition duration, including the delay, of an element in milliseconds. */
export function getTransformTransitionDurationInMs(element) {
    const computedStyle = getComputedStyle(element);
    const transitionedProperties = parseCssPropertyValue(computedStyle, 'transition-property');
    const property = transitionedProperties.find(prop => prop === 'transform' || prop === 'all');
    // If there's no transition for `all` or `transform`, we shouldn't do anything.
    if (!property) {
        return 0;
    }
    // Get the index of the property that we're interested in and match
    // it up to the same index in `transition-delay` and `transition-duration`.
    const propertyIndex = transitionedProperties.indexOf(property);
    const rawDurations = parseCssPropertyValue(computedStyle, 'transition-duration');
    const rawDelays = parseCssPropertyValue(computedStyle, 'transition-delay');
    return (parseCssTimeUnitsToMs(rawDurations[propertyIndex]) +
        parseCssTimeUnitsToMs(rawDelays[propertyIndex]));
}
/** Parses out multiple values from a computed style into an array. */
function parseCssPropertyValue(computedStyle, name) {
    const value = computedStyle.getPropertyValue(name);
    return value.split(',').map(part => part.trim());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi1kdXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGsvZHJhZy1kcm9wL3RyYW5zaXRpb24tZHVyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsK0NBQStDO0FBQy9DLFNBQVMscUJBQXFCLENBQUMsS0FBYTtJQUMxQyxvRkFBb0Y7SUFDcEYsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckUsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ3hDLENBQUM7QUFFRCxrR0FBa0c7QUFDbEcsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLE9BQW9CO0lBQ3JFLE1BQU0sYUFBYSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELE1BQU0sc0JBQXNCLEdBQUcscUJBQXFCLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDM0YsTUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7SUFFN0YsK0VBQStFO0lBQy9FLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLENBQUMsQ0FBQztLQUNWO0lBRUQsbUVBQW1FO0lBQ25FLDJFQUEyRTtJQUMzRSxNQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsYUFBYSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDakYsTUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFM0UsT0FBTyxDQUNMLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FDaEQsQ0FBQztBQUNKLENBQUM7QUFFRCxzRUFBc0U7QUFDdEUsU0FBUyxxQkFBcUIsQ0FBQyxhQUFrQyxFQUFFLElBQVk7SUFDN0UsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKiBQYXJzZXMgYSBDU1MgdGltZSB2YWx1ZSB0byBtaWxsaXNlY29uZHMuICovXG5mdW5jdGlvbiBwYXJzZUNzc1RpbWVVbml0c1RvTXModmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gIC8vIFNvbWUgYnJvd3NlcnMgd2lsbCByZXR1cm4gaXQgaW4gc2Vjb25kcywgd2hlcmVhcyBvdGhlcnMgd2lsbCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICBjb25zdCBtdWx0aXBsaWVyID0gdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdtcycpID4gLTEgPyAxIDogMTAwMDtcbiAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpICogbXVsdGlwbGllcjtcbn1cblxuLyoqIEdldHMgdGhlIHRyYW5zZm9ybSB0cmFuc2l0aW9uIGR1cmF0aW9uLCBpbmNsdWRpbmcgdGhlIGRlbGF5LCBvZiBhbiBlbGVtZW50IGluIG1pbGxpc2Vjb25kcy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm1UcmFuc2l0aW9uRHVyYXRpb25Jbk1zKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIGNvbnN0IHRyYW5zaXRpb25lZFByb3BlcnRpZXMgPSBwYXJzZUNzc1Byb3BlcnR5VmFsdWUoY29tcHV0ZWRTdHlsZSwgJ3RyYW5zaXRpb24tcHJvcGVydHknKTtcbiAgY29uc3QgcHJvcGVydHkgPSB0cmFuc2l0aW9uZWRQcm9wZXJ0aWVzLmZpbmQocHJvcCA9PiBwcm9wID09PSAndHJhbnNmb3JtJyB8fCBwcm9wID09PSAnYWxsJyk7XG5cbiAgLy8gSWYgdGhlcmUncyBubyB0cmFuc2l0aW9uIGZvciBgYWxsYCBvciBgdHJhbnNmb3JtYCwgd2Ugc2hvdWxkbid0IGRvIGFueXRoaW5nLlxuICBpZiAoIXByb3BlcnR5KSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBwcm9wZXJ0eSB0aGF0IHdlJ3JlIGludGVyZXN0ZWQgaW4gYW5kIG1hdGNoXG4gIC8vIGl0IHVwIHRvIHRoZSBzYW1lIGluZGV4IGluIGB0cmFuc2l0aW9uLWRlbGF5YCBhbmQgYHRyYW5zaXRpb24tZHVyYXRpb25gLlxuICBjb25zdCBwcm9wZXJ0eUluZGV4ID0gdHJhbnNpdGlvbmVkUHJvcGVydGllcy5pbmRleE9mKHByb3BlcnR5KTtcbiAgY29uc3QgcmF3RHVyYXRpb25zID0gcGFyc2VDc3NQcm9wZXJ0eVZhbHVlKGNvbXB1dGVkU3R5bGUsICd0cmFuc2l0aW9uLWR1cmF0aW9uJyk7XG4gIGNvbnN0IHJhd0RlbGF5cyA9IHBhcnNlQ3NzUHJvcGVydHlWYWx1ZShjb21wdXRlZFN0eWxlLCAndHJhbnNpdGlvbi1kZWxheScpO1xuXG4gIHJldHVybiAoXG4gICAgcGFyc2VDc3NUaW1lVW5pdHNUb01zKHJhd0R1cmF0aW9uc1twcm9wZXJ0eUluZGV4XSkgK1xuICAgIHBhcnNlQ3NzVGltZVVuaXRzVG9NcyhyYXdEZWxheXNbcHJvcGVydHlJbmRleF0pXG4gICk7XG59XG5cbi8qKiBQYXJzZXMgb3V0IG11bHRpcGxlIHZhbHVlcyBmcm9tIGEgY29tcHV0ZWQgc3R5bGUgaW50byBhbiBhcnJheS4gKi9cbmZ1bmN0aW9uIHBhcnNlQ3NzUHJvcGVydHlWYWx1ZShjb21wdXRlZFN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xuICByZXR1cm4gdmFsdWUuc3BsaXQoJywnKS5tYXAocGFydCA9PiBwYXJ0LnRyaW0oKSk7XG59XG4iXX0=