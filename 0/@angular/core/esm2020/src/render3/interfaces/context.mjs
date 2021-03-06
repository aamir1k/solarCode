/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getLViewById } from './lview_tracking';
/**
 * The internal view context which is specific to a given DOM element, directive or
 * component instance. Each value in here (besides the LView and element node details)
 * can be present, null or undefined. If undefined then it implies the value has not been
 * looked up yet, otherwise, if null, then a lookup was executed and nothing was found.
 *
 * Each value will get filled when the respective value is examined within the getContext
 * function. The component, element and each directive instance will share the same instance
 * of the context.
 */
export class LContext {
    constructor(
    /**
     * ID of the component's parent view data.
     */
    lViewId, 
    /**
     * The index instance of the node.
     */
    nodeIndex, 
    /**
     * The instance of the DOM node that is attached to the lNode.
     */
    native) {
        this.lViewId = lViewId;
        this.nodeIndex = nodeIndex;
        this.native = native;
    }
    /** Component's parent view data. */
    get lView() {
        return getLViewById(this.lViewId);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUs5Qzs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sUUFBUTtJQXNCbkI7SUFDSTs7T0FFRztJQUNLLE9BQWU7SUFFdkI7O09BRUc7SUFDSSxTQUFpQjtJQUV4Qjs7T0FFRztJQUNJLE1BQWE7UUFWWixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBS2hCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFLakIsV0FBTSxHQUFOLE1BQU0sQ0FBTztJQUFHLENBQUM7SUFuQjVCLG9DQUFvQztJQUNwQyxJQUFJLEtBQUs7UUFDUCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQWlCRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmltcG9ydCB7Z2V0TFZpZXdCeUlkfSBmcm9tICcuL2x2aWV3X3RyYWNraW5nJztcbmltcG9ydCB7Uk5vZGV9IGZyb20gJy4vcmVuZGVyZXJfZG9tJztcbmltcG9ydCB7TFZpZXd9IGZyb20gJy4vdmlldyc7XG5cblxuLyoqXG4gKiBUaGUgaW50ZXJuYWwgdmlldyBjb250ZXh0IHdoaWNoIGlzIHNwZWNpZmljIHRvIGEgZ2l2ZW4gRE9NIGVsZW1lbnQsIGRpcmVjdGl2ZSBvclxuICogY29tcG9uZW50IGluc3RhbmNlLiBFYWNoIHZhbHVlIGluIGhlcmUgKGJlc2lkZXMgdGhlIExWaWV3IGFuZCBlbGVtZW50IG5vZGUgZGV0YWlscylcbiAqIGNhbiBiZSBwcmVzZW50LCBudWxsIG9yIHVuZGVmaW5lZC4gSWYgdW5kZWZpbmVkIHRoZW4gaXQgaW1wbGllcyB0aGUgdmFsdWUgaGFzIG5vdCBiZWVuXG4gKiBsb29rZWQgdXAgeWV0LCBvdGhlcndpc2UsIGlmIG51bGwsIHRoZW4gYSBsb29rdXAgd2FzIGV4ZWN1dGVkIGFuZCBub3RoaW5nIHdhcyBmb3VuZC5cbiAqXG4gKiBFYWNoIHZhbHVlIHdpbGwgZ2V0IGZpbGxlZCB3aGVuIHRoZSByZXNwZWN0aXZlIHZhbHVlIGlzIGV4YW1pbmVkIHdpdGhpbiB0aGUgZ2V0Q29udGV4dFxuICogZnVuY3Rpb24uIFRoZSBjb21wb25lbnQsIGVsZW1lbnQgYW5kIGVhY2ggZGlyZWN0aXZlIGluc3RhbmNlIHdpbGwgc2hhcmUgdGhlIHNhbWUgaW5zdGFuY2VcbiAqIG9mIHRoZSBjb250ZXh0LlxuICovXG5leHBvcnQgY2xhc3MgTENvbnRleHQge1xuICAvKipcbiAgICogVGhlIGluc3RhbmNlIG9mIHRoZSBDb21wb25lbnQgbm9kZS5cbiAgICovXG4gIHB1YmxpYyBjb21wb25lbnQ6IHt9fG51bGx8dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBhY3RpdmUgZGlyZWN0aXZlcyB0aGF0IGV4aXN0IG9uIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIHB1YmxpYyBkaXJlY3RpdmVzOiBhbnlbXXxudWxsfHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIG1hcCBvZiBsb2NhbCByZWZlcmVuY2VzIChsb2NhbCByZWZlcmVuY2UgbmFtZSA9PiBlbGVtZW50IG9yIGRpcmVjdGl2ZSBpbnN0YW5jZSkgdGhhdFxuICAgKiBleGlzdCBvbiB0aGlzIGVsZW1lbnQuXG4gICAqL1xuICBwdWJsaWMgbG9jYWxSZWZzOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsfHVuZGVmaW5lZDtcblxuICAvKiogQ29tcG9uZW50J3MgcGFyZW50IHZpZXcgZGF0YS4gKi9cbiAgZ2V0IGxWaWV3KCk6IExWaWV3fG51bGwge1xuICAgIHJldHVybiBnZXRMVmlld0J5SWQodGhpcy5sVmlld0lkKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqXG4gICAgICAgKiBJRCBvZiB0aGUgY29tcG9uZW50J3MgcGFyZW50IHZpZXcgZGF0YS5cbiAgICAgICAqL1xuICAgICAgcHJpdmF0ZSBsVmlld0lkOiBudW1iZXIsXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhlIGluZGV4IGluc3RhbmNlIG9mIHRoZSBub2RlLlxuICAgICAgICovXG4gICAgICBwdWJsaWMgbm9kZUluZGV4OiBudW1iZXIsXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhlIGluc3RhbmNlIG9mIHRoZSBET00gbm9kZSB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBsTm9kZS5cbiAgICAgICAqL1xuICAgICAgcHVibGljIG5hdGl2ZTogUk5vZGUpIHt9XG59XG4iXX0=