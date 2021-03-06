/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
export * from './metadata';
export { InjectFlags } from './interface/injector';
export { ɵɵdefineInjectable, defineInjectable, ɵɵdefineInjector } from './interface/defs';
export { forwardRef, resolveForwardRef } from './forward_ref';
export { Injectable } from './injectable';
export { Injector } from './injector';
export { EnvironmentInjector } from './r3_injector';
export { importProvidersFrom } from './provider_collection';
export { ENVIRONMENT_INITIALIZER } from './initializer_token';
export { ɵɵinject, inject, ɵɵinvalidFactoryDep } from './injector_compatibility';
export { INJECTOR } from './injector_token';
export { ReflectiveInjector } from './reflective_injector';
export { ResolvedReflectiveFactory } from './reflective_provider';
export { ReflectiveKey } from './reflective_key';
export { InjectionToken } from './injection_token';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7OztHQUlHO0FBRUgsY0FBYyxZQUFZLENBQUM7QUFDM0IsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBK0IsTUFBTSxrQkFBa0IsQ0FBQztBQUN0SCxPQUFPLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBQyxVQUFVLEVBQTBDLE1BQU0sY0FBYyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxtQkFBbUIsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQy9FLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RCxPQUFPLEVBQUMseUJBQXlCLEVBQTZCLE1BQU0sdUJBQXVCLENBQUM7QUFDNUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGBkaWAgbW9kdWxlIHByb3ZpZGVzIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGNvbnRhaW5lciBzZXJ2aWNlcy5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL21ldGFkYXRhJztcbmV4cG9ydCB7SW5qZWN0RmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlL2luamVjdG9yJztcbmV4cG9ydCB7ybXJtWRlZmluZUluamVjdGFibGUsIGRlZmluZUluamVjdGFibGUsIMm1ybVkZWZpbmVJbmplY3RvciwgSW5qZWN0YWJsZVR5cGUsIEluamVjdG9yVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZGVmcyc7XG5leHBvcnQge2ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmLCBGb3J3YXJkUmVmRm59IGZyb20gJy4vZm9yd2FyZF9yZWYnO1xuZXhwb3J0IHtJbmplY3RhYmxlLCBJbmplY3RhYmxlRGVjb3JhdG9yLCBJbmplY3RhYmxlUHJvdmlkZXJ9IGZyb20gJy4vaW5qZWN0YWJsZSc7XG5leHBvcnQge0luamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmV4cG9ydCB7RW52aXJvbm1lbnRJbmplY3Rvcn0gZnJvbSAnLi9yM19pbmplY3Rvcic7XG5leHBvcnQge2ltcG9ydFByb3ZpZGVyc0Zyb20sIEltcG9ydFByb3ZpZGVyc1NvdXJjZX0gZnJvbSAnLi9wcm92aWRlcl9jb2xsZWN0aW9uJztcbmV4cG9ydCB7RU5WSVJPTk1FTlRfSU5JVElBTElaRVJ9IGZyb20gJy4vaW5pdGlhbGl6ZXJfdG9rZW4nO1xuZXhwb3J0IHtQcm92aWRlclRva2VufSBmcm9tICcuL3Byb3ZpZGVyX3Rva2VuJztcbmV4cG9ydCB7ybXJtWluamVjdCwgaW5qZWN0LCDJtcm1aW52YWxpZEZhY3RvcnlEZXB9IGZyb20gJy4vaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5leHBvcnQge0lOSkVDVE9SfSBmcm9tICcuL2luamVjdG9yX3Rva2VuJztcbmV4cG9ydCB7UmVmbGVjdGl2ZUluamVjdG9yfSBmcm9tICcuL3JlZmxlY3RpdmVfaW5qZWN0b3InO1xuZXhwb3J0IHtDbGFzc1Byb3ZpZGVyLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBDbGFzc1NhbnNQcm92aWRlciwgSW1wb3J0ZWROZ01vZHVsZVByb3ZpZGVycywgQ29uc3RydWN0b3JQcm92aWRlciwgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEZhY3RvcnlTYW5zUHJvdmlkZXIsIFByb3ZpZGVyLCBTdGF0aWNDbGFzc1Byb3ZpZGVyLCBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciwgU3RhdGljUHJvdmlkZXIsIFR5cGVQcm92aWRlciwgVmFsdWVQcm92aWRlciwgVmFsdWVTYW5zUHJvdmlkZXJ9IGZyb20gJy4vaW50ZXJmYWNlL3Byb3ZpZGVyJztcbmV4cG9ydCB7UmVzb2x2ZWRSZWZsZWN0aXZlRmFjdG9yeSwgUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJ9IGZyb20gJy4vcmVmbGVjdGl2ZV9wcm92aWRlcic7XG5leHBvcnQge1JlZmxlY3RpdmVLZXl9IGZyb20gJy4vcmVmbGVjdGl2ZV9rZXknO1xuZXhwb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi9pbmplY3Rpb25fdG9rZW4nO1xuIl19