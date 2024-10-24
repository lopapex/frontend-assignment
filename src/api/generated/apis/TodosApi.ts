/* tslint:disable */
/* eslint-disable */
/**
 * Todo API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    TodoRequest,
    TodoRequestFromJSON,
    TodoRequestToJSON,
    TodoResponse,
    TodoResponseFromJSON,
    TodoResponseToJSON,
} from '../models';

export interface CreateTodoRequest {
    todoRequest?: TodoRequest;
}

export interface DeleteTodoByIdRequest {
    id: string;
}

export interface GetTodoByIdRequest {
    id: string;
}

export interface MarkTodoCompleteRequest {
    id: string;
}

export interface MarkTodoIncompleteRequest {
    id: string;
}

export interface UpdateTodoByIdRequest {
    id: string;
    todoRequest?: TodoRequest;
}

/**
 * no description
 */
export class TodosApi extends runtime.BaseAPI {

    /**
     * Create a new todo
     */
    async createTodoRaw(requestParameters: CreateTodoRequest): Promise<runtime.ApiResponse<TodoResponse>> {
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TodoRequestToJSON(requestParameters.todoRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TodoResponseFromJSON(jsonValue));
    }

    /**
     * Create a new todo
     */
    async createTodo(requestParameters: CreateTodoRequest): Promise<TodoResponse> {
        const response = await this.createTodoRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete a todo by ID
     */
    async deleteTodoByIdRaw(requestParameters: DeleteTodoByIdRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTodoById.');
        }
        
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a todo by ID
     */
    async deleteTodoById(requestParameters: DeleteTodoByIdRequest): Promise<void> {
        const response = await this.deleteTodoByIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get a specific todo by ID
     */
    async getTodoByIdRaw(requestParameters: GetTodoByIdRequest): Promise<runtime.ApiResponse<TodoResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getTodoById.');
        }
        
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TodoResponseFromJSON(jsonValue));
    }

    /**
     * Get a specific todo by ID
     */
    async getTodoById(requestParameters: GetTodoByIdRequest): Promise<TodoResponse> {
        const response = await this.getTodoByIdRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get the list of todos
     */
    async getTodoListRaw(): Promise<runtime.ApiResponse<Array<TodoResponse>>> {
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo/list`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TodoResponseFromJSON));
    }

    /**
     * Get the list of todos
     */
    async getTodoList(): Promise<Array<TodoResponse>> {
        const response = await this.getTodoListRaw();
        return await response.value();
    }

    /**
     * Mark a todo as complete
     */
    async markTodoCompleteRaw(requestParameters: MarkTodoCompleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling markTodoComplete.');
        }
        
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo/{id}/complete`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Mark a todo as complete
     */
    async markTodoComplete(requestParameters: MarkTodoCompleteRequest): Promise<void> {
        const response = await this.markTodoCompleteRaw(requestParameters);
        return await response.value();
    }

    /**
     * Mark a todo as incomplete
     */
    async markTodoIncompleteRaw(requestParameters: MarkTodoIncompleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling markTodoIncomplete.');
        }
        
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo/{id}/incomplete`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Mark a todo as incomplete
     */
    async markTodoIncomplete(requestParameters: MarkTodoIncompleteRequest): Promise<void> {
        const response = await this.markTodoIncompleteRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update a todo by ID
     */
    async updateTodoByIdRaw(requestParameters: UpdateTodoByIdRequest): Promise<runtime.ApiResponse<TodoResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTodoById.');
        }
        
        
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(unescape(encodeURIComponent(this.configuration.username + ":" + this.configuration.password)));
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/todo/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TodoRequestToJSON(requestParameters.todoRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TodoResponseFromJSON(jsonValue));
    }

    /**
     * Update a todo by ID
     */
    async updateTodoById(requestParameters: UpdateTodoByIdRequest): Promise<TodoResponse> {
        const response = await this.updateTodoByIdRaw(requestParameters);
        return await response.value();
    }

}
