export type ActionTodo = {
    type: string,
    payload?: {
        id?: number,
        task?: string,
        done?: boolean;
    }
}