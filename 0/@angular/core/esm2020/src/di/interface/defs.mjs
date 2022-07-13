/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../../util/property';
/**
 * Construct an injectable definition which defines how a token will be constructed by the DI
 * system, and in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export function ɵɵdefineInjectable(opts) {
    return {
        token: opts.token,
        providedIn: opts.providedIn || null,
        factory: opts.factory,
        value: undefined,
    };
}
/**
 * @deprecated in v8, delete after v10. This API should be used only by generated code, and that
 * code should now use ɵɵdefineInjectable instead.
 * @publicApi
 */
export const defineInjectable = ɵɵdefineInjectable;
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @codeGenApi
 */
export function ɵɵdefineInjector(options) {
    return { providers: options.providers || [], imports: options.imports || [] };
}
/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
export function getInjectableDef(type) {
    return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
}
/**
 * Return definition only if it is defined directly on `type` and is not inherited from a base
 * class of `type`.
 */
function getOwnDefinition(type, field) {
    return type.hasOwnProperty(field) ? type[field] : null;
}
/**
 * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
 *
 * @param type A type which may have `ɵprov`, via inheritance.
 *
 * @deprecated Will be removed in a future version of Angular, where an error will occur in the
 *     scenario if we find the `ɵprov` on an ancestor only.
 */
export function getInheritedInjectableDef(type) {
    const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
    if (def) {
        const typeName = getTypeName(type);
        // TODO(FW-1307): Re-add ngDevMode when closure can handle it
        // ngDevMode &&
        console.warn(`DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.\n` +
            `This will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`);
        return def;
    }
    else {
        return null;
    }
}
/** Gets the name of a type, accounting for some cross-browser differences. */
function getTypeName(type) {
    // `Function.prototype.name` behaves differently between IE and other browsers. In most browsers
    // it'll always return the name of the function itself, no matter how many other functions it
    // inherits from. On IE the function doesn't have its own `name` property, but it takes it from
    // the lowest level in the prototype chain. E.g. if we have `class Foo extends Parent` most
    // browsers will evaluate `Foo.name` to `Foo` while IE will return `Parent`. We work around
    // the issue by converting the function to a string and parsing its name out that way via a regex.
    if (type.hasOwnProperty('name')) {
        return type.name;
    }
    const match = ('' + type).match(/^function\s*([^\s(]+)/);
    return match === null ? '' : match[1];
}
/**
 * Read the injector def type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have an injector def (`ɵinj`)
 */
export function getInjectorDef(type) {
    return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ?
        type[NG_INJ_DEF] :
        null;
}
export const NG_PROV_DEF = getClosureSafeProperty({ ɵprov: getClosureSafeProperty });
export const NG_INJ_DEF = getClosureSafeProperty({ ɵinj: getClosureSafeProperty });
// We need to keep these around so we can read off old defs if new defs are unavailable
export const NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
export const NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2ludGVyZmFjZS9kZWZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBb0gzRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBSSxJQUdyQztJQUNDLE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFpQixJQUFJLElBQUk7UUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1FBQ3JCLEtBQUssRUFBRSxTQUFTO0tBQ2EsQ0FBQztBQUNsQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQTZDO0lBQzVFLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDLENBQUM7QUFDOUUsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFJLElBQVM7SUFDM0MsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsZ0JBQWdCLENBQUksSUFBUyxFQUFFLEtBQWE7SUFDbkQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBSSxJQUFTO0lBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBRW5FLElBQUksR0FBRyxFQUFFO1FBQ1AsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLDZEQUE2RDtRQUM3RCxlQUFlO1FBQ2YsT0FBTyxDQUFDLElBQUksQ0FDUiw0Q0FDSSxRQUFRLDhFQUE4RTtZQUMxRiw4RkFDSSxRQUFRLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBRUQsOEVBQThFO0FBQzlFLFNBQVMsV0FBVyxDQUFDLElBQVM7SUFDNUIsZ0dBQWdHO0lBQ2hHLDZGQUE2RjtJQUM3RiwrRkFBK0Y7SUFDL0YsMkZBQTJGO0lBQzNGLDJGQUEyRjtJQUMzRixrR0FBa0c7SUFDbEcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjtJQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFJLElBQVM7SUFDekMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLElBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQztBQUNYLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ25GLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFFakYsdUZBQXVGO0FBQ3ZGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLHNCQUFzQixDQUFDLEVBQUMsZUFBZSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNuRyxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxhQUFhLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSBmcm9tICcuLi8uLi91dGlsL3Byb3BlcnR5JztcblxuaW1wb3J0IHtDbGFzc1Byb3ZpZGVyLCBDb25zdHJ1Y3RvclByb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIFN0YXRpY0NsYXNzUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXJ9IGZyb20gJy4vcHJvdmlkZXInO1xuXG5cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCBob3cgYSB0eXBlIG9yIGBJbmplY3Rpb25Ub2tlbmAgaW50ZXJmYWNlcyB3aXRoIHRoZSBESSBzeXN0ZW0uXG4gKlxuICogQXQgYSBtaW5pbXVtLCB0aGlzIGluY2x1ZGVzIGEgYGZhY3RvcnlgIHdoaWNoIGRlZmluZXMgaG93IHRvIGNyZWF0ZSB0aGUgZ2l2ZW4gdHlwZSBgVGAsIHBvc3NpYmx5XG4gKiByZXF1ZXN0aW5nIGluamVjdGlvbiBvZiBvdGhlciB0eXBlcyBpZiBuZWNlc3NhcnkuXG4gKlxuICogT3B0aW9uYWxseSwgYSBgcHJvdmlkZWRJbmAgcGFyYW1ldGVyIHNwZWNpZmllcyB0aGF0IHRoZSBnaXZlbiB0eXBlIGJlbG9uZ3MgdG8gYSBwYXJ0aWN1bGFyXG4gKiBgSW5qZWN0b3JgLCBgTmdNb2R1bGVgLCBvciBhIHNwZWNpYWwgc2NvcGUgKGUuZy4gYCdyb290J2ApLiBBIHZhbHVlIG9mIGBudWxsYCBpbmRpY2F0ZXNcbiAqIHRoYXQgdGhlIGluamVjdGFibGUgZG9lcyBub3QgYmVsb25nIHRvIGFueSBzY29wZS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICogQHB1YmxpY0FwaSBUaGUgVmlld0VuZ2luZSBjb21waWxlciBlbWl0cyBjb2RlIHdpdGggdGhpcyB0eXBlIGZvciBpbmplY3RhYmxlcy4gVGhpcyBjb2RlIGlzXG4gKiAgIGRlcGxveWVkIHRvIG5wbSwgYW5kIHNob3VsZCBiZSB0cmVhdGVkIGFzIHB1YmxpYyBhcGkuXG5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSDJtcm1SW5qZWN0YWJsZURlY2xhcmF0aW9uPFQ+IHtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IHRoZSBnaXZlbiB0eXBlIGJlbG9uZ3MgdG8gYSBwYXJ0aWN1bGFyIGluamVjdG9yOlxuICAgKiAtIGBJbmplY3RvclR5cGVgIHN1Y2ggYXMgYE5nTW9kdWxlYCxcbiAgICogLSBgJ3Jvb3QnYCB0aGUgcm9vdCBpbmplY3RvclxuICAgKiAtIGAnYW55J2AgYWxsIGluamVjdG9ycy5cbiAgICogLSBgbnVsbGAsIGRvZXMgbm90IGJlbG9uZyB0byBhbnkgaW5qZWN0b3IuIE11c3QgYmUgZXhwbGljaXRseSBsaXN0ZWQgaW4gdGhlIGluamVjdG9yXG4gICAqICAgYHByb3ZpZGVyc2AuXG4gICAqL1xuICBwcm92aWRlZEluOiBJbmplY3RvclR5cGU8YW55Pnwncm9vdCd8J3BsYXRmb3JtJ3wnYW55J3wnZW52aXJvbm1lbnQnfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB0b2tlbiB0byB3aGljaCB0aGlzIGRlZmluaXRpb24gYmVsb25ncy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgbWF5IG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgdHlwZSB0aGF0IHRoZSBgZmFjdG9yeWAgd2lsbCBjcmVhdGUuXG4gICAqL1xuICB0b2tlbjogdW5rbm93bjtcblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdG8gZXhlY3V0ZSB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIGluamVjdGFibGUuXG4gICAqL1xuICBmYWN0b3J5OiAodD86IFR5cGU8YW55PikgPT4gVDtcblxuICAvKipcbiAgICogSW4gYSBjYXNlIG9mIG5vIGV4cGxpY2l0IGluamVjdG9yLCBhIGxvY2F0aW9uIHdoZXJlIHRoZSBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZSBpcyBzdG9yZWQuXG4gICAqL1xuICB2YWx1ZTogVHx1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIHByb3ZpZGVycyB0byBiZSBpbmNsdWRlZCBpbiBhbiBgSW5qZWN0b3JgIGFzIHdlbGwgYXMgaG93IHRoZSBnaXZlbiB0eXBlXG4gKiB3aGljaCBjYXJyaWVzIHRoZSBpbmZvcm1hdGlvbiBzaG91bGQgYmUgY3JlYXRlZCBieSB0aGUgREkgc3lzdGVtLlxuICpcbiAqIEFuIGBJbmplY3RvckRlZmAgY2FuIGltcG9ydCBvdGhlciB0eXBlcyB3aGljaCBoYXZlIGBJbmplY3RvckRlZnNgLCBmb3JtaW5nIGEgZGVlcCBuZXN0ZWRcbiAqIHN0cnVjdHVyZSBvZiBwcm92aWRlcnMgd2l0aCBhIGRlZmluZWQgcHJpb3JpdHkgKGlkZW50aWNhbGx5IHRvIGhvdyBgTmdNb2R1bGVgcyBhbHNvIGhhdmVcbiAqIGFuIGltcG9ydC9kZXBlbmRlbmN5IHN0cnVjdHVyZSkuXG4gKlxuICogTk9URTogVGhpcyBpcyBhIHByaXZhdGUgdHlwZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZFxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgybXJtUluamVjdG9yRGVmPFQ+IHtcbiAgLy8gVE9ETyhhbHhodWIpOiBOYXJyb3cgZG93biB0aGUgdHlwZSBoZXJlIG9uY2UgZGVjb3JhdG9ycyBwcm9wZXJseSBjaGFuZ2UgdGhlIHJldHVybiB0eXBlIG9mIHRoZVxuICAvLyBjbGFzcyB0aGV5IGFyZSBkZWNvcmF0aW5nICh0byBhZGQgdGhlIMm1cHJvdiBwcm9wZXJ0eSBmb3IgZXhhbXBsZSkuXG4gIHByb3ZpZGVyczogKFR5cGU8YW55PnxWYWx1ZVByb3ZpZGVyfEV4aXN0aW5nUHJvdmlkZXJ8RmFjdG9yeVByb3ZpZGVyfENvbnN0cnVjdG9yUHJvdmlkZXJ8XG4gICAgICAgICAgICAgIFN0YXRpY0NsYXNzUHJvdmlkZXJ8Q2xhc3NQcm92aWRlcnxhbnlbXSlbXTtcblxuICBpbXBvcnRzOiAoSW5qZWN0b3JUeXBlPGFueT58SW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+KVtdO1xufVxuXG4vKipcbiAqIEEgYFR5cGVgIHdoaWNoIGhhcyBhIGDJtXByb3Y6IMm1ybVJbmplY3RhYmxlRGVjbGFyYXRpb25gIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0YWJsZVR5cGVgcyBjb250YWluIHRoZWlyIG93biBEZXBlbmRlbmN5IEluamVjdGlvbiBtZXRhZGF0YSBhbmQgYXJlIHVzYWJsZSBpbiBhblxuICogYEluamVjdG9yRGVmYC1iYXNlZCBgU3RhdGljSW5qZWN0b3JgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlVHlwZTxUPiBleHRlbmRzIFR5cGU8VD4ge1xuICAvKipcbiAgICogT3BhcXVlIHR5cGUgd2hvc2Ugc3RydWN0dXJlIGlzIGhpZ2hseSB2ZXJzaW9uIGRlcGVuZGVudC4gRG8gbm90IHJlbHkgb24gYW55IHByb3BlcnRpZXMuXG4gICAqL1xuICDJtXByb3Y6IHVua25vd247XG59XG5cbi8qKlxuICogQSB0eXBlIHdoaWNoIGhhcyBhbiBgSW5qZWN0b3JEZWZgIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0b3JUeXBlc2AgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIGEgYFN0YXRpY0luamVjdG9yYC5cbiAqXG4gKiBUaGlzIGlzIGFuIG9wYXF1ZSB0eXBlIHdob3NlIHN0cnVjdHVyZSBpcyBoaWdobHkgdmVyc2lvbiBkZXBlbmRlbnQuIERvIG5vdCByZWx5IG9uIGFueVxuICogcHJvcGVydGllcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7XG4gIMm1ZmFjPzogdW5rbm93bjtcbiAgybVpbmo6IHVua25vd247XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBgSW5qZWN0b3JEZWZgIGVxdWl2YWxlbnQgb2YgYSBgTW9kdWxlV2l0aFByb3ZpZGVyc2AsIGFuIGBJbmplY3RvclR5cGVgIHdpdGggYW5cbiAqIGFzc29jaWF0ZWQgYXJyYXkgb2YgcHJvdmlkZXJzLlxuICpcbiAqIE9iamVjdHMgb2YgdGhpcyB0eXBlIGNhbiBiZSBsaXN0ZWQgaW4gdGhlIGltcG9ydHMgc2VjdGlvbiBvZiBhbiBgSW5qZWN0b3JEZWZgLlxuICpcbiAqIE5PVEU6IFRoaXMgaXMgYSBwcml2YXRlIHR5cGUgYW5kIHNob3VsZCBub3QgYmUgZXhwb3J0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzPFQ+IHtcbiAgbmdNb2R1bGU6IEluamVjdG9yVHlwZTxUPjtcbiAgcHJvdmlkZXJzPzogKFR5cGU8YW55PnxWYWx1ZVByb3ZpZGVyfEV4aXN0aW5nUHJvdmlkZXJ8RmFjdG9yeVByb3ZpZGVyfENvbnN0cnVjdG9yUHJvdmlkZXJ8XG4gICAgICAgICAgICAgICBTdGF0aWNDbGFzc1Byb3ZpZGVyfENsYXNzUHJvdmlkZXJ8YW55W10pW107XG59XG5cblxuLyoqXG4gKiBDb25zdHJ1Y3QgYW4gaW5qZWN0YWJsZSBkZWZpbml0aW9uIHdoaWNoIGRlZmluZXMgaG93IGEgdG9rZW4gd2lsbCBiZSBjb25zdHJ1Y3RlZCBieSB0aGUgRElcbiAqIHN5c3RlbSwgYW5kIGluIHdoaWNoIGluamVjdG9ycyAoaWYgYW55KSBpdCB3aWxsIGJlIGF2YWlsYWJsZS5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBhc3NpZ25lZCB0byBhIHN0YXRpYyBgybVwcm92YCBmaWVsZCBvbiBhIHR5cGUsIHdoaWNoIHdpbGwgdGhlbiBiZSBhblxuICogYEluamVjdGFibGVUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICogKiBgcHJvdmlkZWRJbmAgZGV0ZXJtaW5lcyB3aGljaCBpbmplY3RvcnMgd2lsbCBpbmNsdWRlIHRoZSBpbmplY3RhYmxlLCBieSBlaXRoZXIgYXNzb2NpYXRpbmcgaXRcbiAqICAgd2l0aCBhbiBgQE5nTW9kdWxlYCBvciBvdGhlciBgSW5qZWN0b3JUeXBlYCwgb3IgYnkgc3BlY2lmeWluZyB0aGF0IHRoaXMgaW5qZWN0YWJsZSBzaG91bGQgYmVcbiAqICAgcHJvdmlkZWQgaW4gdGhlIGAncm9vdCdgIGluamVjdG9yLCB3aGljaCB3aWxsIGJlIHRoZSBhcHBsaWNhdGlvbi1sZXZlbCBpbmplY3RvciBpbiBtb3N0IGFwcHMuXG4gKiAqIGBmYWN0b3J5YCBnaXZlcyB0aGUgemVybyBhcmd1bWVudCBmdW5jdGlvbiB3aGljaCB3aWxsIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZS5cbiAqICAgVGhlIGZhY3RvcnkgY2FuIGNhbGwgYGluamVjdGAgdG8gYWNjZXNzIHRoZSBgSW5qZWN0b3JgIGFuZCByZXF1ZXN0IGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqIEBwdWJsaWNBcGkgVGhpcyBpbnN0cnVjdGlvbiBoYXMgYmVlbiBlbWl0dGVkIGJ5IFZpZXdFbmdpbmUgZm9yIHNvbWUgdGltZSBhbmQgaXMgZGVwbG95ZWQgdG8gbnBtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmluZUluamVjdGFibGU8VD4ob3B0czoge1xuICB0b2tlbjogdW5rbm93bixcbiAgcHJvdmlkZWRJbj86IFR5cGU8YW55Pnwncm9vdCd8J3BsYXRmb3JtJ3wnYW55J3wnZW52aXJvbm1lbnQnfG51bGwsIGZhY3Rvcnk6ICgpID0+IFQsXG59KTogdW5rbm93biB7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IG9wdHMudG9rZW4sXG4gICAgcHJvdmlkZWRJbjogb3B0cy5wcm92aWRlZEluIGFzIGFueSB8fCBudWxsLFxuICAgIGZhY3Rvcnk6IG9wdHMuZmFjdG9yeSxcbiAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICB9IGFzIMm1ybVJbmplY3RhYmxlRGVjbGFyYXRpb248VD47XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgaW4gdjgsIGRlbGV0ZSBhZnRlciB2MTAuIFRoaXMgQVBJIHNob3VsZCBiZSB1c2VkIG9ubHkgYnkgZ2VuZXJhdGVkIGNvZGUsIGFuZCB0aGF0XG4gKiBjb2RlIHNob3VsZCBub3cgdXNlIMm1ybVkZWZpbmVJbmplY3RhYmxlIGluc3RlYWQuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVJbmplY3RhYmxlID0gybXJtWRlZmluZUluamVjdGFibGU7XG5cbi8qKlxuICogQ29uc3RydWN0IGFuIGBJbmplY3RvckRlZmAgd2hpY2ggY29uZmlndXJlcyBhbiBpbmplY3Rvci5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBhc3NpZ25lZCB0byBhIHN0YXRpYyBpbmplY3RvciBkZWYgKGDJtWluamApIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0b3JUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICogYHByb3ZpZGVyc2A6IGFuIG9wdGlvbmFsIGFycmF5IG9mIHByb3ZpZGVycyB0byBhZGQgdG8gdGhlIGluamVjdG9yLiBFYWNoIHByb3ZpZGVyIG11c3RcbiAqICAgZWl0aGVyIGhhdmUgYSBmYWN0b3J5IG9yIHBvaW50IHRvIGEgdHlwZSB3aGljaCBoYXMgYSBgybVwcm92YCBzdGF0aWMgcHJvcGVydHkgKHRoZVxuICogICB0eXBlIG11c3QgYmUgYW4gYEluamVjdGFibGVUeXBlYCkuXG4gKiAqIGBpbXBvcnRzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgaW1wb3J0cyBvZiBvdGhlciBgSW5qZWN0b3JUeXBlYHMgb3IgYEluamVjdG9yVHlwZVdpdGhNb2R1bGVgc1xuICogICB3aG9zZSBwcm92aWRlcnMgd2lsbCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBpbmplY3Rvci4gTG9jYWxseSBwcm92aWRlZCB0eXBlcyB3aWxsIG92ZXJyaWRlXG4gKiAgIHByb3ZpZGVycyBmcm9tIGltcG9ydHMuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkZWZpbmVJbmplY3RvcihvcHRpb25zOiB7cHJvdmlkZXJzPzogYW55W10sIGltcG9ydHM/OiBhbnlbXX0pOiB1bmtub3duIHtcbiAgcmV0dXJuIHtwcm92aWRlcnM6IG9wdGlvbnMucHJvdmlkZXJzIHx8IFtdLCBpbXBvcnRzOiBvcHRpb25zLmltcG9ydHMgfHwgW119O1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdGFibGUgZGVmIChgybVwcm92YCkgZm9yIGB0eXBlYCBpbiBhIHdheSB3aGljaCBpcyBpbW11bmUgdG8gYWNjaWRlbnRhbGx5IHJlYWRpbmdcbiAqIGluaGVyaXRlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gdHlwZSBBIHR5cGUgd2hpY2ggbWF5IGhhdmUgaXRzIG93biAobm9uLWluaGVyaXRlZCkgYMm1cHJvdmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RhYmxlRGVmPFQ+KHR5cGU6IGFueSk6IMm1ybVJbmplY3RhYmxlRGVjbGFyYXRpb248VD58bnVsbCB7XG4gIHJldHVybiBnZXRPd25EZWZpbml0aW9uKHR5cGUsIE5HX1BST1ZfREVGKSB8fCBnZXRPd25EZWZpbml0aW9uKHR5cGUsIE5HX0lOSkVDVEFCTEVfREVGKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gZGVmaW5pdGlvbiBvbmx5IGlmIGl0IGlzIGRlZmluZWQgZGlyZWN0bHkgb24gYHR5cGVgIGFuZCBpcyBub3QgaW5oZXJpdGVkIGZyb20gYSBiYXNlXG4gKiBjbGFzcyBvZiBgdHlwZWAuXG4gKi9cbmZ1bmN0aW9uIGdldE93bkRlZmluaXRpb248VD4odHlwZTogYW55LCBmaWVsZDogc3RyaW5nKTogybXJtUluamVjdGFibGVEZWNsYXJhdGlvbjxUPnxudWxsIHtcbiAgcmV0dXJuIHR5cGUuaGFzT3duUHJvcGVydHkoZmllbGQpID8gdHlwZVtmaWVsZF0gOiBudWxsO1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdGFibGUgZGVmIChgybVwcm92YCkgZm9yIGB0eXBlYCBvciByZWFkIHRoZSBgybVwcm92YCBmcm9tIG9uZSBvZiBpdHMgYW5jZXN0b3JzLlxuICpcbiAqIEBwYXJhbSB0eXBlIEEgdHlwZSB3aGljaCBtYXkgaGF2ZSBgybVwcm92YCwgdmlhIGluaGVyaXRhbmNlLlxuICpcbiAqIEBkZXByZWNhdGVkIFdpbGwgYmUgcmVtb3ZlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uIG9mIEFuZ3VsYXIsIHdoZXJlIGFuIGVycm9yIHdpbGwgb2NjdXIgaW4gdGhlXG4gKiAgICAgc2NlbmFyaW8gaWYgd2UgZmluZCB0aGUgYMm1cHJvdmAgb24gYW4gYW5jZXN0b3Igb25seS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluaGVyaXRlZEluamVjdGFibGVEZWY8VD4odHlwZTogYW55KTogybXJtUluamVjdGFibGVEZWNsYXJhdGlvbjxUPnxudWxsIHtcbiAgY29uc3QgZGVmID0gdHlwZSAmJiAodHlwZVtOR19QUk9WX0RFRl0gfHwgdHlwZVtOR19JTkpFQ1RBQkxFX0RFRl0pO1xuXG4gIGlmIChkZWYpIHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IGdldFR5cGVOYW1lKHR5cGUpO1xuICAgIC8vIFRPRE8oRlctMTMwNyk6IFJlLWFkZCBuZ0Rldk1vZGUgd2hlbiBjbG9zdXJlIGNhbiBoYW5kbGUgaXRcbiAgICAvLyBuZ0Rldk1vZGUgJiZcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBERVBSRUNBVEVEOiBESSBpcyBpbnN0YW50aWF0aW5nIGEgdG9rZW4gXCIke1xuICAgICAgICAgICAgdHlwZU5hbWV9XCIgdGhhdCBpbmhlcml0cyBpdHMgQEluamVjdGFibGUgZGVjb3JhdG9yIGJ1dCBkb2VzIG5vdCBwcm92aWRlIG9uZSBpdHNlbGYuXFxuYCArXG4gICAgICAgIGBUaGlzIHdpbGwgYmVjb21lIGFuIGVycm9yIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgQW5ndWxhci4gUGxlYXNlIGFkZCBASW5qZWN0YWJsZSgpIHRvIHRoZSBcIiR7XG4gICAgICAgICAgICB0eXBlTmFtZX1cIiBjbGFzcy5gKTtcbiAgICByZXR1cm4gZGVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKiBHZXRzIHRoZSBuYW1lIG9mIGEgdHlwZSwgYWNjb3VudGluZyBmb3Igc29tZSBjcm9zcy1icm93c2VyIGRpZmZlcmVuY2VzLiAqL1xuZnVuY3Rpb24gZ2V0VHlwZU5hbWUodHlwZTogYW55KTogc3RyaW5nIHtcbiAgLy8gYEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lYCBiZWhhdmVzIGRpZmZlcmVudGx5IGJldHdlZW4gSUUgYW5kIG90aGVyIGJyb3dzZXJzLiBJbiBtb3N0IGJyb3dzZXJzXG4gIC8vIGl0J2xsIGFsd2F5cyByZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIGl0c2VsZiwgbm8gbWF0dGVyIGhvdyBtYW55IG90aGVyIGZ1bmN0aW9ucyBpdFxuICAvLyBpbmhlcml0cyBmcm9tLiBPbiBJRSB0aGUgZnVuY3Rpb24gZG9lc24ndCBoYXZlIGl0cyBvd24gYG5hbWVgIHByb3BlcnR5LCBidXQgaXQgdGFrZXMgaXQgZnJvbVxuICAvLyB0aGUgbG93ZXN0IGxldmVsIGluIHRoZSBwcm90b3R5cGUgY2hhaW4uIEUuZy4gaWYgd2UgaGF2ZSBgY2xhc3MgRm9vIGV4dGVuZHMgUGFyZW50YCBtb3N0XG4gIC8vIGJyb3dzZXJzIHdpbGwgZXZhbHVhdGUgYEZvby5uYW1lYCB0byBgRm9vYCB3aGlsZSBJRSB3aWxsIHJldHVybiBgUGFyZW50YC4gV2Ugd29yayBhcm91bmRcbiAgLy8gdGhlIGlzc3VlIGJ5IGNvbnZlcnRpbmcgdGhlIGZ1bmN0aW9uIHRvIGEgc3RyaW5nIGFuZCBwYXJzaW5nIGl0cyBuYW1lIG91dCB0aGF0IHdheSB2aWEgYSByZWdleC5cbiAgaWYgKHR5cGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgIHJldHVybiB0eXBlLm5hbWU7XG4gIH1cblxuICBjb25zdCBtYXRjaCA9ICgnJyArIHR5cGUpLm1hdGNoKC9eZnVuY3Rpb25cXHMqKFteXFxzKF0rKS8pO1xuICByZXR1cm4gbWF0Y2ggPT09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdG9yIGRlZiB0eXBlIGluIGEgd2F5IHdoaWNoIGlzIGltbXVuZSB0byBhY2NpZGVudGFsbHkgcmVhZGluZyBpbmhlcml0ZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHR5cGUgdHlwZSB3aGljaCBtYXkgaGF2ZSBhbiBpbmplY3RvciBkZWYgKGDJtWluamApXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RvckRlZjxUPih0eXBlOiBhbnkpOiDJtcm1SW5qZWN0b3JEZWY8VD58bnVsbCB7XG4gIHJldHVybiB0eXBlICYmICh0eXBlLmhhc093blByb3BlcnR5KE5HX0lOSl9ERUYpIHx8IHR5cGUuaGFzT3duUHJvcGVydHkoTkdfSU5KRUNUT1JfREVGKSkgP1xuICAgICAgKHR5cGUgYXMgYW55KVtOR19JTkpfREVGXSA6XG4gICAgICBudWxsO1xufVxuXG5leHBvcnQgY29uc3QgTkdfUFJPVl9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtXByb3Y6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19JTkpfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7ybVpbmo6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcblxuLy8gV2UgbmVlZCB0byBrZWVwIHRoZXNlIGFyb3VuZCBzbyB3ZSBjYW4gcmVhZCBvZmYgb2xkIGRlZnMgaWYgbmV3IGRlZnMgYXJlIHVuYXZhaWxhYmxlXG5leHBvcnQgY29uc3QgTkdfSU5KRUNUQUJMRV9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ0luamVjdGFibGVEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19JTkpFQ1RPUl9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ0luamVjdG9yRGVmOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG4iXX0=