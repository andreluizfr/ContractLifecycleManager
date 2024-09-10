export interface ReduxAction<T> {
    payload: T | null,
    type: string
}