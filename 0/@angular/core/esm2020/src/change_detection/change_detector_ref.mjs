/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isComponentHost } from '../render3/interfaces/type_checks';
import { DECLARATION_COMPONENT_VIEW } from '../render3/interfaces/view';
import { getCurrentTNode, getLView } from '../render3/state';
import { getComponentLViewByIndex } from '../render3/util/view_utils';
import { ViewRef as R3_ViewRef } from '../render3/view_ref';
/**
 * Base class that provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be re-rendered.
 *
 * @see [Using change detection hooks](guide/lifecycle-hooks#using-change-detection-hooks)
 * @see [Defining custom change detection](guide/lifecycle-hooks#defining-custom-change-detection)
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](https://plnkr.co/edit/GC512b?p=preview).
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="reattach"></code-example>
 *
 * @publicApi
 */
export class ChangeDetectorRef {
}
/**
 * @internal
 * @nocollapse
 */
ChangeDetectorRef.__NG_ELEMENT_ID__ = injectChangeDetectorRef;
/** Returns a ChangeDetectorRef (a.k.a. a ViewRef) */
export function injectChangeDetectorRef(flags) {
    return createViewRef(getCurrentTNode(), getLView(), (flags & 16 /* InternalInjectFlags.ForPipe */) === 16 /* InternalInjectFlags.ForPipe */);
}
/**
 * Creates a ViewRef and stores it on the injector as ChangeDetectorRef (public alias).
 *
 * @param tNode The node that is requesting a ChangeDetectorRef
 * @param lView The view to which the node belongs
 * @param isPipe Whether the view is being injected into a pipe.
 * @returns The ChangeDetectorRef to use
 */
function createViewRef(tNode, lView, isPipe) {
    if (isComponentHost(tNode) && !isPipe) {
        // The LView represents the location where the component is declared.
        // Instead we want the LView for the component View and so we need to look it up.
        const componentView = getComponentLViewByIndex(tNode.index, lView); // look down
        return new R3_ViewRef(componentView, componentView);
    }
    else if (tNode.type & (3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */ | 32 /* TNodeType.Icu */)) {
        // The LView represents the location where the injection is requested from.
        // We need to locate the containing LView (in case where the `lView` is an embedded view)
        const hostComponentView = lView[DECLARATION_COMPONENT_VIEW]; // look up
        return new R3_ViewRef(hostComponentView, lView);
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdG9yX3JlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFDLDBCQUEwQixFQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsT0FBTyxJQUFJLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILE1BQU0sT0FBZ0IsaUJBQWlCOztBQXlEckM7OztHQUdHO0FBQ0ksbUNBQWlCLEdBQThDLHVCQUF1QixDQUFDO0FBS2hHLHFEQUFxRDtBQUNyRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsS0FBa0I7SUFDeEQsT0FBTyxhQUFhLENBQ2hCLGVBQWUsRUFBRyxFQUFFLFFBQVEsRUFBRSxFQUM5QixDQUFDLEtBQUssdUNBQThCLENBQUMseUNBQWdDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQVMsYUFBYSxDQUFDLEtBQVksRUFBRSxLQUFZLEVBQUUsTUFBZTtJQUNoRSxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNyQyxxRUFBcUU7UUFDckUsaUZBQWlGO1FBQ2pGLE1BQU0sYUFBYSxHQUFHLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBRSxZQUFZO1FBQ2pGLE9BQU8sSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQ3JEO1NBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsNERBQTJDLHlCQUFnQixDQUFDLEVBQUU7UUFDckYsMkVBQTJFO1FBQzNFLHlGQUF5RjtRQUN6RixNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUUsVUFBVTtRQUN4RSxPQUFPLElBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2pEO0lBQ0QsT0FBTyxJQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0RmxhZ3N9IGZyb20gJy4uL2RpJztcbmltcG9ydCB7SW50ZXJuYWxJbmplY3RGbGFnc30gZnJvbSAnLi4vZGkvaW50ZXJmYWNlL2luamVjdG9yJztcbmltcG9ydCB7VE5vZGUsIFROb2RlVHlwZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtpc0NvbXBvbmVudEhvc3R9IGZyb20gJy4uL3JlbmRlcjMvaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBMVmlld30gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3fSBmcm9tICcuLi9yZW5kZXIzL3N0YXRlJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50TFZpZXdCeUluZGV4fSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvdmlld191dGlscyc7XG5pbXBvcnQge1ZpZXdSZWYgYXMgUjNfVmlld1JlZn0gZnJvbSAnLi4vcmVuZGVyMy92aWV3X3JlZic7XG5cbi8qKlxuICogQmFzZSBjbGFzcyB0aGF0IHByb3ZpZGVzIGNoYW5nZSBkZXRlY3Rpb24gZnVuY3Rpb25hbGl0eS5cbiAqIEEgY2hhbmdlLWRldGVjdGlvbiB0cmVlIGNvbGxlY3RzIGFsbCB2aWV3cyB0aGF0IGFyZSB0byBiZSBjaGVja2VkIGZvciBjaGFuZ2VzLlxuICogVXNlIHRoZSBtZXRob2RzIHRvIGFkZCBhbmQgcmVtb3ZlIHZpZXdzIGZyb20gdGhlIHRyZWUsIGluaXRpYXRlIGNoYW5nZS1kZXRlY3Rpb24sXG4gKiBhbmQgZXhwbGljaXRseSBtYXJrIHZpZXdzIGFzIF9kaXJ0eV8sIG1lYW5pbmcgdGhhdCB0aGV5IGhhdmUgY2hhbmdlZCBhbmQgbmVlZCB0byBiZSByZS1yZW5kZXJlZC5cbiAqXG4gKiBAc2VlIFtVc2luZyBjaGFuZ2UgZGV0ZWN0aW9uIGhvb2tzXShndWlkZS9saWZlY3ljbGUtaG9va3MjdXNpbmctY2hhbmdlLWRldGVjdGlvbi1ob29rcylcbiAqIEBzZWUgW0RlZmluaW5nIGN1c3RvbSBjaGFuZ2UgZGV0ZWN0aW9uXShndWlkZS9saWZlY3ljbGUtaG9va3MjZGVmaW5pbmctY3VzdG9tLWNoYW5nZS1kZXRlY3Rpb24pXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGVzIGRlbW9uc3RyYXRlIGhvdyB0byBtb2RpZnkgZGVmYXVsdCBjaGFuZ2UtZGV0ZWN0aW9uIGJlaGF2aW9yXG4gKiB0byBwZXJmb3JtIGV4cGxpY2l0IGRldGVjdGlvbiB3aGVuIG5lZWRlZC5cbiAqXG4gKiAjIyMgVXNlIGBtYXJrRm9yQ2hlY2soKWAgd2l0aCBgQ2hlY2tPbmNlYCBzdHJhdGVneVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzZXRzIHRoZSBgT25QdXNoYCBjaGFuZ2UtZGV0ZWN0aW9uIHN0cmF0ZWd5IGZvciBhIGNvbXBvbmVudFxuICogKGBDaGVja09uY2VgLCByYXRoZXIgdGhhbiB0aGUgZGVmYXVsdCBgQ2hlY2tBbHdheXNgKSwgdGhlbiBmb3JjZXMgYSBzZWNvbmQgY2hlY2tcbiAqIGFmdGVyIGFuIGludGVydmFsLiBTZWUgW2xpdmUgZGVtb10oaHR0cHM6Ly9wbG5rci5jby9lZGl0L0dDNTEyYj9wPXByZXZpZXcpLlxuICpcbiAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvdHMvY2hhbmdlX2RldGVjdC9jaGFuZ2UtZGV0ZWN0aW9uLnRzXCJcbiAqIHJlZ2lvbj1cIm1hcmstZm9yLWNoZWNrXCI+PC9jb2RlLWV4YW1wbGU+XG4gKlxuICogIyMjIERldGFjaCBjaGFuZ2UgZGV0ZWN0b3IgdG8gbGltaXQgaG93IG9mdGVuIGNoZWNrIG9jY3Vyc1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBkZWZpbmVzIGEgY29tcG9uZW50IHdpdGggYSBsYXJnZSBsaXN0IG9mIHJlYWQtb25seSBkYXRhXG4gKiB0aGF0IGlzIGV4cGVjdGVkIHRvIGNoYW5nZSBjb25zdGFudGx5LCBtYW55IHRpbWVzIHBlciBzZWNvbmQuXG4gKiBUbyBpbXByb3ZlIHBlcmZvcm1hbmNlLCB3ZSB3YW50IHRvIGNoZWNrIGFuZCB1cGRhdGUgdGhlIGxpc3RcbiAqIGxlc3Mgb2Z0ZW4gdGhhbiB0aGUgY2hhbmdlcyBhY3R1YWxseSBvY2N1ci4gVG8gZG8gdGhhdCwgd2UgZGV0YWNoXG4gKiB0aGUgY29tcG9uZW50J3MgY2hhbmdlIGRldGVjdG9yIGFuZCBwZXJmb3JtIGFuIGV4cGxpY2l0IGxvY2FsIGNoZWNrIGV2ZXJ5IGZpdmUgc2Vjb25kcy5cbiAqXG4gKiA8Y29kZS1leGFtcGxlIHBhdGg9XCJjb3JlL3RzL2NoYW5nZV9kZXRlY3QvY2hhbmdlLWRldGVjdGlvbi50c1wiIHJlZ2lvbj1cImRldGFjaFwiPjwvY29kZS1leGFtcGxlPlxuICpcbiAqXG4gKiAjIyMgUmVhdHRhY2hpbmcgYSBkZXRhY2hlZCBjb21wb25lbnRcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY3JlYXRlcyBhIGNvbXBvbmVudCBkaXNwbGF5aW5nIGxpdmUgZGF0YS5cbiAqIFRoZSBjb21wb25lbnQgZGV0YWNoZXMgaXRzIGNoYW5nZSBkZXRlY3RvciBmcm9tIHRoZSBtYWluIGNoYW5nZSBkZXRlY3RvciB0cmVlXG4gKiB3aGVuIHRoZSBgbGl2ZWAgcHJvcGVydHkgaXMgc2V0IHRvIGZhbHNlLCBhbmQgcmVhdHRhY2hlcyBpdCB3aGVuIHRoZSBwcm9wZXJ0eVxuICogYmVjb21lcyB0cnVlLlxuICpcbiAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvdHMvY2hhbmdlX2RldGVjdC9jaGFuZ2UtZGV0ZWN0aW9uLnRzXCIgcmVnaW9uPVwicmVhdHRhY2hcIj48L2NvZGUtZXhhbXBsZT5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyB1c2VzIHRoZSB7QGxpbmsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kjT25QdXNoIE9uUHVzaH0gKGNoZWNrT25jZSlcbiAgICogY2hhbmdlIGRldGVjdGlvbiBzdHJhdGVneSwgZXhwbGljaXRseSBtYXJrcyB0aGUgdmlldyBhcyBjaGFuZ2VkIHNvIHRoYXRcbiAgICogaXQgY2FuIGJlIGNoZWNrZWQgYWdhaW4uXG4gICAqXG4gICAqIENvbXBvbmVudHMgYXJlIG5vcm1hbGx5IG1hcmtlZCBhcyBkaXJ0eSAoaW4gbmVlZCBvZiByZXJlbmRlcmluZykgd2hlbiBpbnB1dHNcbiAgICogaGF2ZSBjaGFuZ2VkIG9yIGV2ZW50cyBoYXZlIGZpcmVkIGluIHRoZSB2aWV3LiBDYWxsIHRoaXMgbWV0aG9kIHRvIGVuc3VyZSB0aGF0XG4gICAqIGEgY29tcG9uZW50IGlzIGNoZWNrZWQgZXZlbiBpZiB0aGVzZSB0cmlnZ2VycyBoYXZlIG5vdCBvY2N1cmVkLlxuICAgKlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpbmsgdG8gYSBjaGFwdGVyIG9uIE9uUHVzaCBjb21wb25lbnRzIC0tPlxuICAgKlxuICAgKi9cbiAgYWJzdHJhY3QgbWFya0ZvckNoZWNrKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIERldGFjaGVzIHRoaXMgdmlldyBmcm9tIHRoZSBjaGFuZ2UtZGV0ZWN0aW9uIHRyZWUuXG4gICAqIEEgZGV0YWNoZWQgdmlldyBpcyAgbm90IGNoZWNrZWQgdW50aWwgaXQgaXMgcmVhdHRhY2hlZC5cbiAgICogVXNlIGluIGNvbWJpbmF0aW9uIHdpdGggYGRldGVjdENoYW5nZXMoKWAgdG8gaW1wbGVtZW50IGxvY2FsIGNoYW5nZSBkZXRlY3Rpb24gY2hlY2tzLlxuICAgKlxuICAgKiBEZXRhY2hlZCB2aWV3cyBhcmUgbm90IGNoZWNrZWQgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24gcnVucyB1bnRpbCB0aGV5IGFyZVxuICAgKiByZS1hdHRhY2hlZCwgZXZlbiBpZiB0aGV5IGFyZSBtYXJrZWQgYXMgZGlydHkuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gZGV0YWNoL3JlYXR0YWNoL2xvY2FsIGRpZ2VzdCAtLT5cbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaXZlIGRlbW8gb25jZSByZWYuZGV0ZWN0Q2hhbmdlcyBpcyBtZXJnZWQgaW50byBtYXN0ZXIgLS0+XG4gICAqXG4gICAqL1xuICBhYnN0cmFjdCBkZXRhY2goKTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIHRoaXMgdmlldyBhbmQgaXRzIGNoaWxkcmVuLiBVc2UgaW4gY29tYmluYXRpb24gd2l0aCB7QGxpbmsgQ2hhbmdlRGV0ZWN0b3JSZWYjZGV0YWNoXG4gICAqIGRldGFjaH1cbiAgICogdG8gaW1wbGVtZW50IGxvY2FsIGNoYW5nZSBkZXRlY3Rpb24gY2hlY2tzLlxuICAgKlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpbmsgdG8gYSBjaGFwdGVyIG9uIGRldGFjaC9yZWF0dGFjaC9sb2NhbCBkaWdlc3QgLS0+XG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGl2ZSBkZW1vIG9uY2UgcmVmLmRldGVjdENoYW5nZXMgaXMgbWVyZ2VkIGludG8gbWFzdGVyIC0tPlxuICAgKlxuICAgKi9cbiAgYWJzdHJhY3QgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGNoYW5nZSBkZXRlY3RvciBhbmQgaXRzIGNoaWxkcmVuLCBhbmQgdGhyb3dzIGlmIGFueSBjaGFuZ2VzIGFyZSBkZXRlY3RlZC5cbiAgICpcbiAgICogVXNlIGluIGRldmVsb3BtZW50IG1vZGUgdG8gdmVyaWZ5IHRoYXQgcnVubmluZyBjaGFuZ2UgZGV0ZWN0aW9uIGRvZXNuJ3QgaW50cm9kdWNlXG4gICAqIG90aGVyIGNoYW5nZXMuIENhbGxpbmcgaXQgaW4gcHJvZHVjdGlvbiBtb2RlIGlzIGEgbm9vcC5cbiAgICovXG4gIGFic3RyYWN0IGNoZWNrTm9DaGFuZ2VzKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlLWF0dGFjaGVzIHRoZSBwcmV2aW91c2x5IGRldGFjaGVkIHZpZXcgdG8gdGhlIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS5cbiAgICogVmlld3MgYXJlIGF0dGFjaGVkIHRvIHRoZSB0cmVlIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gZGV0YWNoL3JlYXR0YWNoL2xvY2FsIGRpZ2VzdCAtLT5cbiAgICpcbiAgICovXG4gIGFic3RyYWN0IHJlYXR0YWNoKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAbm9jb2xsYXBzZVxuICAgKi9cbiAgc3RhdGljIF9fTkdfRUxFTUVOVF9JRF9fOiAoZmxhZ3M6IEluamVjdEZsYWdzKSA9PiBDaGFuZ2VEZXRlY3RvclJlZiA9IGluamVjdENoYW5nZURldGVjdG9yUmVmO1xufVxuXG5cblxuLyoqIFJldHVybnMgYSBDaGFuZ2VEZXRlY3RvclJlZiAoYS5rLmEuIGEgVmlld1JlZikgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RDaGFuZ2VEZXRlY3RvclJlZihmbGFnczogSW5qZWN0RmxhZ3MpOiBDaGFuZ2VEZXRlY3RvclJlZiB7XG4gIHJldHVybiBjcmVhdGVWaWV3UmVmKFxuICAgICAgZ2V0Q3VycmVudFROb2RlKCkhLCBnZXRMVmlldygpLFxuICAgICAgKGZsYWdzICYgSW50ZXJuYWxJbmplY3RGbGFncy5Gb3JQaXBlKSA9PT0gSW50ZXJuYWxJbmplY3RGbGFncy5Gb3JQaXBlKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgVmlld1JlZiBhbmQgc3RvcmVzIGl0IG9uIHRoZSBpbmplY3RvciBhcyBDaGFuZ2VEZXRlY3RvclJlZiAocHVibGljIGFsaWFzKS5cbiAqXG4gKiBAcGFyYW0gdE5vZGUgVGhlIG5vZGUgdGhhdCBpcyByZXF1ZXN0aW5nIGEgQ2hhbmdlRGV0ZWN0b3JSZWZcbiAqIEBwYXJhbSBsVmlldyBUaGUgdmlldyB0byB3aGljaCB0aGUgbm9kZSBiZWxvbmdzXG4gKiBAcGFyYW0gaXNQaXBlIFdoZXRoZXIgdGhlIHZpZXcgaXMgYmVpbmcgaW5qZWN0ZWQgaW50byBhIHBpcGUuXG4gKiBAcmV0dXJucyBUaGUgQ2hhbmdlRGV0ZWN0b3JSZWYgdG8gdXNlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVZpZXdSZWYodE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcsIGlzUGlwZTogYm9vbGVhbik6IENoYW5nZURldGVjdG9yUmVmIHtcbiAgaWYgKGlzQ29tcG9uZW50SG9zdCh0Tm9kZSkgJiYgIWlzUGlwZSkge1xuICAgIC8vIFRoZSBMVmlldyByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgY29tcG9uZW50IGlzIGRlY2xhcmVkLlxuICAgIC8vIEluc3RlYWQgd2Ugd2FudCB0aGUgTFZpZXcgZm9yIHRoZSBjb21wb25lbnQgVmlldyBhbmQgc28gd2UgbmVlZCB0byBsb29rIGl0IHVwLlxuICAgIGNvbnN0IGNvbXBvbmVudFZpZXcgPSBnZXRDb21wb25lbnRMVmlld0J5SW5kZXgodE5vZGUuaW5kZXgsIGxWaWV3KTsgIC8vIGxvb2sgZG93blxuICAgIHJldHVybiBuZXcgUjNfVmlld1JlZihjb21wb25lbnRWaWV3LCBjb21wb25lbnRWaWV3KTtcbiAgfSBlbHNlIGlmICh0Tm9kZS50eXBlICYgKFROb2RlVHlwZS5BbnlSTm9kZSB8IFROb2RlVHlwZS5BbnlDb250YWluZXIgfCBUTm9kZVR5cGUuSWN1KSkge1xuICAgIC8vIFRoZSBMVmlldyByZXByZXNlbnRzIHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgaW5qZWN0aW9uIGlzIHJlcXVlc3RlZCBmcm9tLlxuICAgIC8vIFdlIG5lZWQgdG8gbG9jYXRlIHRoZSBjb250YWluaW5nIExWaWV3IChpbiBjYXNlIHdoZXJlIHRoZSBgbFZpZXdgIGlzIGFuIGVtYmVkZGVkIHZpZXcpXG4gICAgY29uc3QgaG9zdENvbXBvbmVudFZpZXcgPSBsVmlld1tERUNMQVJBVElPTl9DT01QT05FTlRfVklFV107ICAvLyBsb29rIHVwXG4gICAgcmV0dXJuIG5ldyBSM19WaWV3UmVmKGhvc3RDb21wb25lbnRWaWV3LCBsVmlldyk7XG4gIH1cbiAgcmV0dXJuIG51bGwhO1xufVxuIl19