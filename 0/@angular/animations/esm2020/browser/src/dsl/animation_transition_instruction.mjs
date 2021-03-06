/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, totalTime, errors) {
    return {
        type: 0 /* AnimationTransitionInstructionType.TransitionAnimation */,
        element,
        triggerName,
        isRemovalTransition,
        fromState,
        fromStyles,
        toState,
        toStyles,
        timelines,
        queriedElements,
        preStyleProps,
        postStyleProps,
        totalTime,
        errors
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyYW5zaXRpb25faW5zdHJ1Y3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL2RzbC9hbmltYXRpb25fdHJhbnNpdGlvbl9pbnN0cnVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUF3QkgsTUFBTSxVQUFVLDJCQUEyQixDQUN2QyxPQUFZLEVBQUUsV0FBbUIsRUFBRSxTQUFpQixFQUFFLE9BQWUsRUFDckUsbUJBQTRCLEVBQUUsVUFBeUIsRUFBRSxRQUF1QixFQUNoRixTQUF5QyxFQUFFLGVBQXNCLEVBQ2pFLGFBQW9DLEVBQUUsY0FBcUMsRUFBRSxTQUFpQixFQUM5RixNQUFnQjtJQUNsQixPQUFPO1FBQ0wsSUFBSSxnRUFBd0Q7UUFDNUQsT0FBTztRQUNQLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsU0FBUztRQUNULFVBQVU7UUFDVixPQUFPO1FBQ1AsUUFBUTtRQUNSLFNBQVM7UUFDVCxlQUFlO1FBQ2YsYUFBYTtRQUNiLGNBQWM7UUFDZCxTQUFTO1FBQ1QsTUFBTTtLQUNQLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVTdHlsZURhdGFNYXB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge0FuaW1hdGlvbkVuZ2luZUluc3RydWN0aW9uLCBBbmltYXRpb25UcmFuc2l0aW9uSW5zdHJ1Y3Rpb25UeXBlfSBmcm9tICcuLi9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9pbnN0cnVjdGlvbic7XG5cbmltcG9ydCB7QW5pbWF0aW9uVGltZWxpbmVJbnN0cnVjdGlvbn0gZnJvbSAnLi9hbmltYXRpb25fdGltZWxpbmVfaW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblRyYW5zaXRpb25JbnN0cnVjdGlvbiBleHRlbmRzIEFuaW1hdGlvbkVuZ2luZUluc3RydWN0aW9uIHtcbiAgZWxlbWVudDogYW55O1xuICB0cmlnZ2VyTmFtZTogc3RyaW5nO1xuICBpc1JlbW92YWxUcmFuc2l0aW9uOiBib29sZWFuO1xuICBmcm9tU3RhdGU6IHN0cmluZztcbiAgZnJvbVN0eWxlczogybVTdHlsZURhdGFNYXA7XG4gIHRvU3RhdGU6IHN0cmluZztcbiAgdG9TdHlsZXM6IMm1U3R5bGVEYXRhTWFwO1xuICB0aW1lbGluZXM6IEFuaW1hdGlvblRpbWVsaW5lSW5zdHJ1Y3Rpb25bXTtcbiAgcXVlcmllZEVsZW1lbnRzOiBhbnlbXTtcbiAgcHJlU3R5bGVQcm9wczogTWFwPGFueSwgU2V0PHN0cmluZz4+O1xuICBwb3N0U3R5bGVQcm9wczogTWFwPGFueSwgU2V0PHN0cmluZz4+O1xuICB0b3RhbFRpbWU6IG51bWJlcjtcbiAgZXJyb3JzPzogRXJyb3JbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zaXRpb25JbnN0cnVjdGlvbihcbiAgICBlbGVtZW50OiBhbnksIHRyaWdnZXJOYW1lOiBzdHJpbmcsIGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcsXG4gICAgaXNSZW1vdmFsVHJhbnNpdGlvbjogYm9vbGVhbiwgZnJvbVN0eWxlczogybVTdHlsZURhdGFNYXAsIHRvU3R5bGVzOiDJtVN0eWxlRGF0YU1hcCxcbiAgICB0aW1lbGluZXM6IEFuaW1hdGlvblRpbWVsaW5lSW5zdHJ1Y3Rpb25bXSwgcXVlcmllZEVsZW1lbnRzOiBhbnlbXSxcbiAgICBwcmVTdHlsZVByb3BzOiBNYXA8YW55LCBTZXQ8c3RyaW5nPj4sIHBvc3RTdHlsZVByb3BzOiBNYXA8YW55LCBTZXQ8c3RyaW5nPj4sIHRvdGFsVGltZTogbnVtYmVyLFxuICAgIGVycm9ycz86IEVycm9yW10pOiBBbmltYXRpb25UcmFuc2l0aW9uSW5zdHJ1Y3Rpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFuaW1hdGlvblRyYW5zaXRpb25JbnN0cnVjdGlvblR5cGUuVHJhbnNpdGlvbkFuaW1hdGlvbixcbiAgICBlbGVtZW50LFxuICAgIHRyaWdnZXJOYW1lLFxuICAgIGlzUmVtb3ZhbFRyYW5zaXRpb24sXG4gICAgZnJvbVN0YXRlLFxuICAgIGZyb21TdHlsZXMsXG4gICAgdG9TdGF0ZSxcbiAgICB0b1N0eWxlcyxcbiAgICB0aW1lbGluZXMsXG4gICAgcXVlcmllZEVsZW1lbnRzLFxuICAgIHByZVN0eWxlUHJvcHMsXG4gICAgcG9zdFN0eWxlUHJvcHMsXG4gICAgdG90YWxUaW1lLFxuICAgIGVycm9yc1xuICB9O1xufVxuIl19