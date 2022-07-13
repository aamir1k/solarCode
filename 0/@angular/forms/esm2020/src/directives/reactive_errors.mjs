/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { formArrayNameExample, formControlNameExample, formGroupNameExample, ngModelGroupExample } from './error_examples';
export function controlParentException() {
    return new Error(`formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formControlNameExample}`);
}
export function ngModelGroupException() {
    return new Error(`formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}
export function missingFormException() {
    return new Error(`formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}
export function groupParentException() {
    return new Error(`formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}
export function arrayParentException() {
    return new Error(`formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}
export const disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });
`;
export const asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
export function ngModelWarning(directiveName) {
    return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://angular.io/api/forms/${directiveName === 'formControl' ? 'FormControlDirective' : 'FormControlName'}#use-with-ngmodel
  `;
}
function describeKey(isFormGroup, key) {
    return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
export function noControlsError(isFormGroup) {
    return `
    There are no form controls registered with this ${isFormGroup ? 'group' : 'array'} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
export function missingControlError(isFormGroup, key) {
    return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
export function missingControlValueError(isFormGroup, key) {
    return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmVfZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybXMvc3JjL2RpcmVjdGl2ZXMvcmVhY3RpdmVfZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR3pILE1BQU0sVUFBVSxzQkFBc0I7SUFDcEMsT0FBTyxJQUFJLEtBQUssQ0FDWjs7Ozs7TUFLQSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsT0FBTyxJQUFJLEtBQUssQ0FDWjs7Ozs7UUFLRSxvQkFBb0I7Ozs7UUFJcEIsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE9BQU8sSUFBSSxLQUFLLENBQUM7Ozs7UUFJWCxzQkFBc0IsRUFBRSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxJQUFJLEtBQUssQ0FDWjs7Ozs7TUFLQSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxJQUFJLEtBQUssQ0FDWjs7Ozs7UUFLRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHOzs7Ozs7Ozs7O0NBVWxDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Q0FjcEQsQ0FBQztBQUVGLE1BQU0sVUFBVSxjQUFjLENBQUMsYUFBcUI7SUFDbEQsT0FBTztpRUFDd0QsYUFBYTs7Ozs7O2lDQU94RSxhQUFhLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO0dBQy9FLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsV0FBb0IsRUFBRSxHQUFrQjtJQUMzRCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUNsRSxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxXQUFvQjtJQUNsRCxPQUFPO3NEQUVILFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPOztHQUVsQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxXQUFvQixFQUFFLEdBQWtCO0lBQzFFLE9BQU8sNEJBQTRCLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUNyRSxDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLFdBQW9CLEVBQUUsR0FBa0I7SUFDL0UsT0FBTyx3Q0FBd0MsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtmb3JtQXJyYXlOYW1lRXhhbXBsZSwgZm9ybUNvbnRyb2xOYW1lRXhhbXBsZSwgZm9ybUdyb3VwTmFtZUV4YW1wbGUsIG5nTW9kZWxHcm91cEV4YW1wbGV9IGZyb20gJy4vZXJyb3JfZXhhbXBsZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb250cm9sUGFyZW50RXhjZXB0aW9uKCk6IEVycm9yIHtcbiAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgIGBmb3JtQ29udHJvbE5hbWUgbXVzdCBiZSB1c2VkIHdpdGggYSBwYXJlbnQgZm9ybUdyb3VwIGRpcmVjdGl2ZS4gIFlvdSdsbCB3YW50IHRvIGFkZCBhIGZvcm1Hcm91cFxuICAgICAgZGlyZWN0aXZlIGFuZCBwYXNzIGl0IGFuIGV4aXN0aW5nIEZvcm1Hcm91cCBpbnN0YW5jZSAoeW91IGNhbiBjcmVhdGUgb25lIGluIHlvdXIgY2xhc3MpLlxuXG4gICAgRXhhbXBsZTpcblxuICAgICR7Zm9ybUNvbnRyb2xOYW1lRXhhbXBsZX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5nTW9kZWxHcm91cEV4Y2VwdGlvbigpOiBFcnJvciB7XG4gIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgZm9ybUNvbnRyb2xOYW1lIGNhbm5vdCBiZSB1c2VkIHdpdGggYW4gbmdNb2RlbEdyb3VwIHBhcmVudC4gSXQgaXMgb25seSBjb21wYXRpYmxlIHdpdGggcGFyZW50c1xuICAgICAgdGhhdCBhbHNvIGhhdmUgYSBcImZvcm1cIiBwcmVmaXg6IGZvcm1Hcm91cE5hbWUsIGZvcm1BcnJheU5hbWUsIG9yIGZvcm1Hcm91cC5cblxuICAgICAgT3B0aW9uIDE6ICBVcGRhdGUgdGhlIHBhcmVudCB0byBiZSBmb3JtR3JvdXBOYW1lIChyZWFjdGl2ZSBmb3JtIHN0cmF0ZWd5KVxuXG4gICAgICAke2Zvcm1Hcm91cE5hbWVFeGFtcGxlfVxuXG4gICAgICBPcHRpb24gMjogVXNlIG5nTW9kZWwgaW5zdGVhZCBvZiBmb3JtQ29udHJvbE5hbWUgKHRlbXBsYXRlLWRyaXZlbiBzdHJhdGVneSlcblxuICAgICAgJHtuZ01vZGVsR3JvdXBFeGFtcGxlfWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWlzc2luZ0Zvcm1FeGNlcHRpb24oKTogRXJyb3Ige1xuICByZXR1cm4gbmV3IEVycm9yKGBmb3JtR3JvdXAgZXhwZWN0cyBhIEZvcm1Hcm91cCBpbnN0YW5jZS4gUGxlYXNlIHBhc3Mgb25lIGluLlxuXG4gICAgICBFeGFtcGxlOlxuXG4gICAgICAke2Zvcm1Db250cm9sTmFtZUV4YW1wbGV9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cFBhcmVudEV4Y2VwdGlvbigpOiBFcnJvciB7XG4gIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgZm9ybUdyb3VwTmFtZSBtdXN0IGJlIHVzZWQgd2l0aCBhIHBhcmVudCBmb3JtR3JvdXAgZGlyZWN0aXZlLiAgWW91J2xsIHdhbnQgdG8gYWRkIGEgZm9ybUdyb3VwXG4gICAgZGlyZWN0aXZlIGFuZCBwYXNzIGl0IGFuIGV4aXN0aW5nIEZvcm1Hcm91cCBpbnN0YW5jZSAoeW91IGNhbiBjcmVhdGUgb25lIGluIHlvdXIgY2xhc3MpLlxuXG4gICAgRXhhbXBsZTpcblxuICAgICR7Zm9ybUdyb3VwTmFtZUV4YW1wbGV9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVBhcmVudEV4Y2VwdGlvbigpOiBFcnJvciB7XG4gIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgZm9ybUFycmF5TmFtZSBtdXN0IGJlIHVzZWQgd2l0aCBhIHBhcmVudCBmb3JtR3JvdXAgZGlyZWN0aXZlLiAgWW91J2xsIHdhbnQgdG8gYWRkIGEgZm9ybUdyb3VwXG4gICAgICBkaXJlY3RpdmUgYW5kIHBhc3MgaXQgYW4gZXhpc3RpbmcgRm9ybUdyb3VwIGluc3RhbmNlICh5b3UgY2FuIGNyZWF0ZSBvbmUgaW4geW91ciBjbGFzcykuXG5cbiAgICAgIEV4YW1wbGU6XG5cbiAgICAgICR7Zm9ybUFycmF5TmFtZUV4YW1wbGV9YCk7XG59XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlZEF0dHJXYXJuaW5nID0gYFxuICBJdCBsb29rcyBsaWtlIHlvdSdyZSB1c2luZyB0aGUgZGlzYWJsZWQgYXR0cmlidXRlIHdpdGggYSByZWFjdGl2ZSBmb3JtIGRpcmVjdGl2ZS4gSWYgeW91IHNldCBkaXNhYmxlZCB0byB0cnVlXG4gIHdoZW4geW91IHNldCB1cCB0aGlzIGNvbnRyb2wgaW4geW91ciBjb21wb25lbnQgY2xhc3MsIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgd2lsbCBhY3R1YWxseSBiZSBzZXQgaW4gdGhlIERPTSBmb3JcbiAgeW91LiBXZSByZWNvbW1lbmQgdXNpbmcgdGhpcyBhcHByb2FjaCB0byBhdm9pZCAnY2hhbmdlZCBhZnRlciBjaGVja2VkJyBlcnJvcnMuXG5cbiAgRXhhbXBsZTpcbiAgZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgIGZpcnN0OiBuZXcgRm9ybUNvbnRyb2woe3ZhbHVlOiAnTmFuY3knLCBkaXNhYmxlZDogdHJ1ZX0sIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgIGxhc3Q6IG5ldyBGb3JtQ29udHJvbCgnRHJldycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gIH0pO1xuYDtcblxuZXhwb3J0IGNvbnN0IGFzeW5jVmFsaWRhdG9yc0Ryb3BwZWRXaXRoT3B0c1dhcm5pbmcgPSBgXG4gIEl0IGxvb2tzIGxpa2UgeW91J3JlIGNvbnN0cnVjdGluZyB1c2luZyBhIEZvcm1Db250cm9sIHdpdGggYm90aCBhbiBvcHRpb25zIGFyZ3VtZW50IGFuZCBhblxuICBhc3luYyB2YWxpZGF0b3JzIGFyZ3VtZW50LiBNaXhpbmcgdGhlc2UgYXJndW1lbnRzIHdpbGwgY2F1c2UgeW91ciBhc3luYyB2YWxpZGF0b3JzIHRvIGJlIGRyb3BwZWQuXG4gIFlvdSBzaG91bGQgZWl0aGVyIHB1dCBhbGwgeW91ciB2YWxpZGF0b3JzIGluIHRoZSBvcHRpb25zIG9iamVjdCwgb3IgaW4gc2VwYXJhdGUgdmFsaWRhdG9yc1xuICBhcmd1bWVudHMuIEZvciBleGFtcGxlOlxuXG4gIC8vIFVzaW5nIHZhbGlkYXRvcnMgYXJndW1lbnRzXG4gIGZjID0gbmV3IEZvcm1Db250cm9sKDQyLCBWYWxpZGF0b3JzLnJlcXVpcmVkLCBteUFzeW5jVmFsaWRhdG9yKTtcblxuICAvLyBVc2luZyBBYnN0cmFjdENvbnRyb2xPcHRpb25zXG4gIGZjID0gbmV3IEZvcm1Db250cm9sKDQyLCB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCwgYXN5bmNWYWxpZGF0b3JzOiBteUFWfSk7XG5cbiAgLy8gRG8gTk9UIG1peCB0aGVtOiBhc3luYyB2YWxpZGF0b3JzIHdpbGwgYmUgZHJvcHBlZCFcbiAgZmMgPSBuZXcgRm9ybUNvbnRyb2woNDIsIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSwgLyogT29wcyEgKi8gbXlBc3luY1ZhbGlkYXRvcik7XG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gbmdNb2RlbFdhcm5pbmcoZGlyZWN0aXZlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBcbiAgSXQgbG9va3MgbGlrZSB5b3UncmUgdXNpbmcgbmdNb2RlbCBvbiB0aGUgc2FtZSBmb3JtIGZpZWxkIGFzICR7ZGlyZWN0aXZlTmFtZX0uXG4gIFN1cHBvcnQgZm9yIHVzaW5nIHRoZSBuZ01vZGVsIGlucHV0IHByb3BlcnR5IGFuZCBuZ01vZGVsQ2hhbmdlIGV2ZW50IHdpdGhcbiAgcmVhY3RpdmUgZm9ybSBkaXJlY3RpdmVzIGhhcyBiZWVuIGRlcHJlY2F0ZWQgaW4gQW5ndWxhciB2NiBhbmQgd2lsbCBiZSByZW1vdmVkXG4gIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgQW5ndWxhci5cblxuICBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiB0aGlzLCBzZWUgb3VyIEFQSSBkb2NzIGhlcmU6XG4gIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvZm9ybXMvJHtcbiAgICAgIGRpcmVjdGl2ZU5hbWUgPT09ICdmb3JtQ29udHJvbCcgPyAnRm9ybUNvbnRyb2xEaXJlY3RpdmUnIDogJ0Zvcm1Db250cm9sTmFtZSd9I3VzZS13aXRoLW5nbW9kZWxcbiAgYDtcbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVLZXkoaXNGb3JtR3JvdXA6IGJvb2xlYW4sIGtleTogc3RyaW5nfG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBpc0Zvcm1Hcm91cCA/IGB3aXRoIG5hbWU6ICcke2tleX0nYCA6IGBhdCBpbmRleDogJHtrZXl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vQ29udHJvbHNFcnJvcihpc0Zvcm1Hcm91cDogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiBgXG4gICAgVGhlcmUgYXJlIG5vIGZvcm0gY29udHJvbHMgcmVnaXN0ZXJlZCB3aXRoIHRoaXMgJHtcbiAgICAgIGlzRm9ybUdyb3VwID8gJ2dyb3VwJyA6ICdhcnJheSd9IHlldC4gSWYgeW91J3JlIHVzaW5nIG5nTW9kZWwsXG4gICAgeW91IG1heSB3YW50IHRvIGNoZWNrIG5leHQgdGljayAoZS5nLiB1c2Ugc2V0VGltZW91dCkuXG4gIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXNzaW5nQ29udHJvbEVycm9yKGlzRm9ybUdyb3VwOiBib29sZWFuLCBrZXk6IHN0cmluZ3xudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYENhbm5vdCBmaW5kIGZvcm0gY29udHJvbCAke2Rlc2NyaWJlS2V5KGlzRm9ybUdyb3VwLCBrZXkpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXNzaW5nQ29udHJvbFZhbHVlRXJyb3IoaXNGb3JtR3JvdXA6IGJvb2xlYW4sIGtleTogc3RyaW5nfG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgTXVzdCBzdXBwbHkgYSB2YWx1ZSBmb3IgZm9ybSBjb250cm9sICR7ZGVzY3JpYmVLZXkoaXNGb3JtR3JvdXAsIGtleSl9YDtcbn1cbiJdfQ==