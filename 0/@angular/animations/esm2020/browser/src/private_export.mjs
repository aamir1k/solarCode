/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { Animation as ɵAnimation } from './dsl/animation';
export { AnimationStyleNormalizer as ɵAnimationStyleNormalizer, NoopAnimationStyleNormalizer as ɵNoopAnimationStyleNormalizer } from './dsl/style_normalization/animation_style_normalizer';
export { WebAnimationsStyleNormalizer as ɵWebAnimationsStyleNormalizer } from './dsl/style_normalization/web_animations_style_normalizer';
export { NoopAnimationDriver as ɵNoopAnimationDriver } from './render/animation_driver';
export { AnimationEngine as ɵAnimationEngine } from './render/animation_engine_next';
export { containsElement as ɵcontainsElement, getParentElement as ɵgetParentElement, invokeQuery as ɵinvokeQuery, validateStyleProperty as ɵvalidateStyleProperty } from './render/shared';
export { WebAnimationsDriver as ɵWebAnimationsDriver } from './render/web_animations/web_animations_driver';
export { WebAnimationsPlayer as ɵWebAnimationsPlayer } from './render/web_animations/web_animations_player';
export { allowPreviousPlayerStylesMerge as ɵallowPreviousPlayerStylesMerge, normalizeKeyframes as ɵnormalizeKeyframes } from './util';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3ByaXZhdGVfZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxTQUFTLElBQUksVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHdCQUF3QixJQUFJLHlCQUF5QixFQUFFLDRCQUE0QixJQUFJLDZCQUE2QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDMUwsT0FBTyxFQUFDLDRCQUE0QixJQUFJLDZCQUE2QixFQUFDLE1BQU0sMkRBQTJELENBQUM7QUFDeEksT0FBTyxFQUFDLG1CQUFtQixJQUFJLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEYsT0FBTyxFQUFDLGVBQWUsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25GLE9BQU8sRUFBQyxlQUFlLElBQUksZ0JBQWdCLEVBQUUsZ0JBQWdCLElBQUksaUJBQWlCLEVBQUUsV0FBVyxJQUFJLFlBQVksRUFBRSxxQkFBcUIsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pMLE9BQU8sRUFBQyxtQkFBbUIsSUFBSSxvQkFBb0IsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQzFHLE9BQU8sRUFBQyxtQkFBbUIsSUFBSSxvQkFBb0IsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQzFHLE9BQU8sRUFBQyw4QkFBOEIsSUFBSSwrQkFBK0IsRUFBRSxrQkFBa0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuZXhwb3J0IHtBbmltYXRpb24gYXMgybVBbmltYXRpb259IGZyb20gJy4vZHNsL2FuaW1hdGlvbic7XG5leHBvcnQge0FuaW1hdGlvblN0eWxlTm9ybWFsaXplciBhcyDJtUFuaW1hdGlvblN0eWxlTm9ybWFsaXplciwgTm9vcEFuaW1hdGlvblN0eWxlTm9ybWFsaXplciBhcyDJtU5vb3BBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXJ9IGZyb20gJy4vZHNsL3N0eWxlX25vcm1hbGl6YXRpb24vYW5pbWF0aW9uX3N0eWxlX25vcm1hbGl6ZXInO1xuZXhwb3J0IHtXZWJBbmltYXRpb25zU3R5bGVOb3JtYWxpemVyIGFzIMm1V2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplcn0gZnJvbSAnLi9kc2wvc3R5bGVfbm9ybWFsaXphdGlvbi93ZWJfYW5pbWF0aW9uc19zdHlsZV9ub3JtYWxpemVyJztcbmV4cG9ydCB7Tm9vcEFuaW1hdGlvbkRyaXZlciBhcyDJtU5vb3BBbmltYXRpb25Ecml2ZXJ9IGZyb20gJy4vcmVuZGVyL2FuaW1hdGlvbl9kcml2ZXInO1xuZXhwb3J0IHtBbmltYXRpb25FbmdpbmUgYXMgybVBbmltYXRpb25FbmdpbmV9IGZyb20gJy4vcmVuZGVyL2FuaW1hdGlvbl9lbmdpbmVfbmV4dCc7XG5leHBvcnQge2NvbnRhaW5zRWxlbWVudCBhcyDJtWNvbnRhaW5zRWxlbWVudCwgZ2V0UGFyZW50RWxlbWVudCBhcyDJtWdldFBhcmVudEVsZW1lbnQsIGludm9rZVF1ZXJ5IGFzIMm1aW52b2tlUXVlcnksIHZhbGlkYXRlU3R5bGVQcm9wZXJ0eSBhcyDJtXZhbGlkYXRlU3R5bGVQcm9wZXJ0eX0gZnJvbSAnLi9yZW5kZXIvc2hhcmVkJztcbmV4cG9ydCB7V2ViQW5pbWF0aW9uc0RyaXZlciBhcyDJtVdlYkFuaW1hdGlvbnNEcml2ZXJ9IGZyb20gJy4vcmVuZGVyL3dlYl9hbmltYXRpb25zL3dlYl9hbmltYXRpb25zX2RyaXZlcic7XG5leHBvcnQge1dlYkFuaW1hdGlvbnNQbGF5ZXIgYXMgybVXZWJBbmltYXRpb25zUGxheWVyfSBmcm9tICcuL3JlbmRlci93ZWJfYW5pbWF0aW9ucy93ZWJfYW5pbWF0aW9uc19wbGF5ZXInO1xuZXhwb3J0IHthbGxvd1ByZXZpb3VzUGxheWVyU3R5bGVzTWVyZ2UgYXMgybVhbGxvd1ByZXZpb3VzUGxheWVyU3R5bGVzTWVyZ2UsIG5vcm1hbGl6ZUtleWZyYW1lcyBhcyDJtW5vcm1hbGl6ZUtleWZyYW1lc30gZnJvbSAnLi91dGlsJztcbiJdfQ==