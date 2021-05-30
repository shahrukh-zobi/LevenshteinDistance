import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    // public apiCacheData = new Map<string, any>();

    // save(url: string, response: HttpResponse<any>): void {
    //     this.apiCacheData.set(url, response);
    // }

    // get(url: string): HttpResponse<any> | undefined {
    //     return this.apiCacheData.get(url)
    // }

    // invalidateStorage(): void {
    //     this.apiCacheData = new Map<string, any>();
    // }

    save(url: string, response: HttpResponse<any>): void {
        localStorage.setItem(url, JSON.stringify(response));
    }

    get(url: string): HttpResponse<any> {
        // Get cached data from localstorage
        const value = localStorage.getItem(url);
        if (value !== null) {
            const record: HttpResponse<any> = JSON.parse(value);
            return record;
        }
        return null;
    }

    invalidateStorage(): void {
        localStorage.clear();
    }
}