import { AnimationStateStyles, AnimationTransitionFactory } from './animation_transition_factory';
export function buildTrigger(name, ast, normalizer) {
    return new AnimationTrigger(name, ast, normalizer);
}
export class AnimationTrigger {
    constructor(name, ast, _normalizer) {
        this.name = name;
        this.ast = ast;
        this._normalizer = _normalizer;
        this.transitionFactories = [];
        this.states = new Map();
        ast.states.forEach(ast => {
            const defaultParams = (ast.options && ast.options.params) || {};
            this.states.set(ast.name, new AnimationStateStyles(ast.style, defaultParams, _normalizer));
        });
        balanceProperties(this.states, 'true', '1');
        balanceProperties(this.states, 'false', '0');
        ast.transitions.forEach(ast => {
            this.transitionFactories.push(new AnimationTransitionFactory(name, ast, this.states));
        });
        this.fallbackTransition = createFallbackTransition(name, this.states, this._normalizer);
    }
    get containsQueries() {
        return this.ast.queryCount > 0;
    }
    matchTransition(currentState, nextState, element, params) {
        const entry = this.transitionFactories.find(f => f.match(currentState, nextState, element, params));
        return entry || null;
    }
    matchStyles(currentState, params, errors) {
        return this.fallbackTransition.buildStyles(currentState, params, errors);
    }
}
function createFallbackTransition(triggerName, states, normalizer) {
    const matchers = [(fromState, toState) => true];
    const animation = { type: 2 /* AnimationMetadataType.Sequence */, steps: [], options: null };
    const transition = {
        type: 1 /* AnimationMetadataType.Transition */,
        animation,
        matchers,
        options: null,
        queryCount: 0,
        depCount: 0
    };
    return new AnimationTransitionFactory(triggerName, transition, states);
}
function balanceProperties(stateMap, key1, key2) {
    if (stateMap.has(key1)) {
        if (!stateMap.has(key2)) {
            stateMap.set(key2, stateMap.get(key1));
        }
    }
    else if (stateMap.has(key2)) {
        stateMap.set(key1, stateMap.get(key2));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL2RzbC9hbmltYXRpb25fdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUtoRyxNQUFNLFVBQVUsWUFBWSxDQUN4QixJQUFZLEVBQUUsR0FBZSxFQUFFLFVBQW9DO0lBQ3JFLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLFlBQ1csSUFBWSxFQUFTLEdBQWUsRUFBVSxXQUFxQztRQUFuRixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUEwQjtRQUx2Rix3QkFBbUIsR0FBaUMsRUFBRSxDQUFDO1FBRXZELFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBZ0MsQ0FBQztRQUl0RCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksMEJBQTBCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsZUFBZSxDQUFDLFlBQWlCLEVBQUUsU0FBYyxFQUFFLE9BQVksRUFBRSxNQUE0QjtRQUUzRixNQUFNLEtBQUssR0FDUCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQWlCLEVBQUUsTUFBNEIsRUFBRSxNQUFlO1FBQzFFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FDRjtBQUVELFNBQVMsd0JBQXdCLENBQzdCLFdBQW1CLEVBQUUsTUFBeUMsRUFDOUQsVUFBb0M7SUFDdEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQWMsRUFBRSxPQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELE1BQU0sU0FBUyxHQUFnQixFQUFDLElBQUksd0NBQWdDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDaEcsTUFBTSxVQUFVLEdBQWtCO1FBQ2hDLElBQUksMENBQWtDO1FBQ3RDLFNBQVM7UUFDVCxRQUFRO1FBQ1IsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsQ0FBQztRQUNiLFFBQVEsRUFBRSxDQUFDO0tBQ1osQ0FBQztJQUNGLE9BQU8sSUFBSSwwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUN0QixRQUEyQyxFQUFFLElBQVksRUFBRSxJQUFZO0lBQ3pFLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUM7U0FDekM7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM3QixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvbk1ldGFkYXRhVHlwZSwgybVTdHlsZURhdGFNYXB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge1NlcXVlbmNlQXN0LCBUcmFuc2l0aW9uQXN0LCBUcmlnZ2VyQXN0fSBmcm9tICcuL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtBbmltYXRpb25TdGF0ZVN0eWxlcywgQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3Rvcnl9IGZyb20gJy4vYW5pbWF0aW9uX3RyYW5zaXRpb25fZmFjdG9yeSc7XG5pbXBvcnQge0FuaW1hdGlvblN0eWxlTm9ybWFsaXplcn0gZnJvbSAnLi9zdHlsZV9ub3JtYWxpemF0aW9uL2FuaW1hdGlvbl9zdHlsZV9ub3JtYWxpemVyJztcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRyaWdnZXIoXG4gICAgbmFtZTogc3RyaW5nLCBhc3Q6IFRyaWdnZXJBc3QsIG5vcm1hbGl6ZXI6IEFuaW1hdGlvblN0eWxlTm9ybWFsaXplcik6IEFuaW1hdGlvblRyaWdnZXIge1xuICByZXR1cm4gbmV3IEFuaW1hdGlvblRyaWdnZXIobmFtZSwgYXN0LCBub3JtYWxpemVyKTtcbn1cblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblRyaWdnZXIge1xuICBwdWJsaWMgdHJhbnNpdGlvbkZhY3RvcmllczogQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3RvcnlbXSA9IFtdO1xuICBwdWJsaWMgZmFsbGJhY2tUcmFuc2l0aW9uOiBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeTtcbiAgcHVibGljIHN0YXRlcyA9IG5ldyBNYXA8c3RyaW5nLCBBbmltYXRpb25TdGF0ZVN0eWxlcz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBhc3Q6IFRyaWdnZXJBc3QsIHByaXZhdGUgX25vcm1hbGl6ZXI6IEFuaW1hdGlvblN0eWxlTm9ybWFsaXplcikge1xuICAgIGFzdC5zdGF0ZXMuZm9yRWFjaChhc3QgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdFBhcmFtcyA9IChhc3Qub3B0aW9ucyAmJiBhc3Qub3B0aW9ucy5wYXJhbXMpIHx8IHt9O1xuICAgICAgdGhpcy5zdGF0ZXMuc2V0KGFzdC5uYW1lLCBuZXcgQW5pbWF0aW9uU3RhdGVTdHlsZXMoYXN0LnN0eWxlLCBkZWZhdWx0UGFyYW1zLCBfbm9ybWFsaXplcikpO1xuICAgIH0pO1xuXG4gICAgYmFsYW5jZVByb3BlcnRpZXModGhpcy5zdGF0ZXMsICd0cnVlJywgJzEnKTtcbiAgICBiYWxhbmNlUHJvcGVydGllcyh0aGlzLnN0YXRlcywgJ2ZhbHNlJywgJzAnKTtcblxuICAgIGFzdC50cmFuc2l0aW9ucy5mb3JFYWNoKGFzdCA9PiB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25GYWN0b3JpZXMucHVzaChuZXcgQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3RvcnkobmFtZSwgYXN0LCB0aGlzLnN0YXRlcykpO1xuICAgIH0pO1xuICAgIHRoaXMuZmFsbGJhY2tUcmFuc2l0aW9uID0gY3JlYXRlRmFsbGJhY2tUcmFuc2l0aW9uKG5hbWUsIHRoaXMuc3RhdGVzLCB0aGlzLl9ub3JtYWxpemVyKTtcbiAgfVxuXG4gIGdldCBjb250YWluc1F1ZXJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXN0LnF1ZXJ5Q291bnQgPiAwO1xuICB9XG5cbiAgbWF0Y2hUcmFuc2l0aW9uKGN1cnJlbnRTdGF0ZTogYW55LCBuZXh0U3RhdGU6IGFueSwgZWxlbWVudDogYW55LCBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTpcbiAgICAgIEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5fG51bGwge1xuICAgIGNvbnN0IGVudHJ5ID1cbiAgICAgICAgdGhpcy50cmFuc2l0aW9uRmFjdG9yaWVzLmZpbmQoZiA9PiBmLm1hdGNoKGN1cnJlbnRTdGF0ZSwgbmV4dFN0YXRlLCBlbGVtZW50LCBwYXJhbXMpKTtcbiAgICByZXR1cm4gZW50cnkgfHwgbnVsbDtcbiAgfVxuXG4gIG1hdGNoU3R5bGVzKGN1cnJlbnRTdGF0ZTogYW55LCBwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBlcnJvcnM6IEVycm9yW10pOiDJtVN0eWxlRGF0YU1hcCB7XG4gICAgcmV0dXJuIHRoaXMuZmFsbGJhY2tUcmFuc2l0aW9uLmJ1aWxkU3R5bGVzKGN1cnJlbnRTdGF0ZSwgcGFyYW1zLCBlcnJvcnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZhbGxiYWNrVHJhbnNpdGlvbihcbiAgICB0cmlnZ2VyTmFtZTogc3RyaW5nLCBzdGF0ZXM6IE1hcDxzdHJpbmcsIEFuaW1hdGlvblN0YXRlU3R5bGVzPixcbiAgICBub3JtYWxpemVyOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIpOiBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeSB7XG4gIGNvbnN0IG1hdGNoZXJzID0gWyhmcm9tU3RhdGU6IGFueSwgdG9TdGF0ZTogYW55KSA9PiB0cnVlXTtcbiAgY29uc3QgYW5pbWF0aW9uOiBTZXF1ZW5jZUFzdCA9IHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuU2VxdWVuY2UsIHN0ZXBzOiBbXSwgb3B0aW9uczogbnVsbH07XG4gIGNvbnN0IHRyYW5zaXRpb246IFRyYW5zaXRpb25Bc3QgPSB7XG4gICAgdHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlRyYW5zaXRpb24sXG4gICAgYW5pbWF0aW9uLFxuICAgIG1hdGNoZXJzLFxuICAgIG9wdGlvbnM6IG51bGwsXG4gICAgcXVlcnlDb3VudDogMCxcbiAgICBkZXBDb3VudDogMFxuICB9O1xuICByZXR1cm4gbmV3IEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5KHRyaWdnZXJOYW1lLCB0cmFuc2l0aW9uLCBzdGF0ZXMpO1xufVxuXG5mdW5jdGlvbiBiYWxhbmNlUHJvcGVydGllcyhcbiAgICBzdGF0ZU1hcDogTWFwPHN0cmluZywgQW5pbWF0aW9uU3RhdGVTdHlsZXM+LCBrZXkxOiBzdHJpbmcsIGtleTI6IHN0cmluZykge1xuICBpZiAoc3RhdGVNYXAuaGFzKGtleTEpKSB7XG4gICAgaWYgKCFzdGF0ZU1hcC5oYXMoa2V5MikpIHtcbiAgICAgIHN0YXRlTWFwLnNldChrZXkyLCBzdGF0ZU1hcC5nZXQoa2V5MSkhKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RhdGVNYXAuaGFzKGtleTIpKSB7XG4gICAgc3RhdGVNYXAuc2V0KGtleTEsIHN0YXRlTWFwLmdldChrZXkyKSEpO1xuICB9XG59XG4iXX0=