/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../util/property';
export const NG_COMP_DEF = getClosureSafeProperty({ ɵcmp: getClosureSafeProperty });
export const NG_DIR_DEF = getClosureSafeProperty({ ɵdir: getClosureSafeProperty });
export const NG_PIPE_DEF = getClosureSafeProperty({ ɵpipe: getClosureSafeProperty });
export const NG_MOD_DEF = getClosureSafeProperty({ ɵmod: getClosureSafeProperty });
export const NG_FACTORY_DEF = getClosureSafeProperty({ ɵfac: getClosureSafeProperty });
/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
// TODO(misko): This is wrong. The NG_ELEMENT_ID should never be minified.
export const NG_ELEMENT_ID = getClosureSafeProperty({ __NG_ELEMENT_ID__: getClosureSafeProperty });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9maWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFeEQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNsRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ2pGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDbkYsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNqRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBRXJGOzs7O0dBSUc7QUFDSCwwRUFBMEU7QUFDMUUsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vdXRpbC9wcm9wZXJ0eSc7XG5cbmV4cG9ydCBjb25zdCBOR19DT01QX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe8m1Y21wOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfRElSX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe8m1ZGlyOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfUElQRV9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtXBpcGU6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19NT0RfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7ybVtb2Q6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19GQUNUT1JZX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe8m1ZmFjOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5cbi8qKlxuICogSWYgYSBkaXJlY3RpdmUgaXMgZGlQdWJsaWMsIGJsb29tQWRkIHNldHMgYSBwcm9wZXJ0eSBvbiB0aGUgdHlwZSB3aXRoIHRoaXMgY29uc3RhbnQgYXNcbiAqIHRoZSBrZXkgYW5kIHRoZSBkaXJlY3RpdmUncyB1bmlxdWUgSUQgYXMgdGhlIHZhbHVlLiBUaGlzIGFsbG93cyB1cyB0byBtYXAgZGlyZWN0aXZlcyB0byB0aGVpclxuICogYmxvb20gZmlsdGVyIGJpdCBmb3IgREkuXG4gKi9cbi8vIFRPRE8obWlza28pOiBUaGlzIGlzIHdyb25nLiBUaGUgTkdfRUxFTUVOVF9JRCBzaG91bGQgbmV2ZXIgYmUgbWluaWZpZWQuXG5leHBvcnQgY29uc3QgTkdfRUxFTUVOVF9JRCA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe19fTkdfRUxFTUVOVF9JRF9fOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG4iXX0=