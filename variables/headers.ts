// export const _BM_API_KEY = '10d059c2-79a5-4686-9e70-6b251be30cea.UDR7fJMmEtqOyfwQz0on1N_vA74';

// export const requestHeaders = new Headers();
// requestHeaders.set('Authorization', _BM_API_KEY);

import fs from 'node:fs';
import cluster from 'node:cluster';

export function createLoginRequestHeaders(): Promise<Headers> {
    return LoginProvider.GetInstance().createHeaders();
} 

export function createBaseRequestHeaders(): Promise<Headers> {
    return LoginProvider.GetInstance().createBaseHeaders();
}

export class LoginProvider {
    protected static _Service: LoginProvider | null;

    public static GetInstance(): LoginProvider {
        if (!this._Service) {
            this._Service = new LoginProvider;
        }
        return this._Service;
    }

    protected _token: Promise<string> | null = null;

    protected _getToken(): Promise<string> {
        if (!this._token) {
            this._token = (async () => {
                try {
                    return await fs.promises.readFile('token.txt', 'utf8');
                } catch (e) {
                    return '';
                }
            })();
        }
        return this._token;
    }
    public async createBaseHeaders(): Promise<Headers> {
        const requestHeaders = new Headers();
        requestHeaders.set(
            'User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
            );
        requestHeaders.set('Content-Type', 'application/json');
        return requestHeaders;
    }

    public async createHeaders(): Promise<Headers> {
        // console.log('Cluster', cluster.isPrimary, cluster.isWorker, cluster.worker, cluster.workers)
        const requestHeaders = new Headers();
        
        const token = await this._getToken();
        if (token) {
          requestHeaders.set('Authorization', `Bearer ${token}`);
        }
        requestHeaders.set(
          'User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36'
          );
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('Accept-Encoding', 'gzip, deflate, br');
        requestHeaders.set('Connection', 'keep-alive');
    
        for (const [key, value] of requestHeaders.entries()) {
        // console.log(`Login Headers: %j=%j`, key, value); 
        }
        return requestHeaders;
    }

    public setToken(value: string): void {
        this._token = Promise.resolve(value);
        fs.writeFile('token.txt', value, (error) => {
            if (error) {
                console.warn('Can not write token. Reason: %s', error);
            }
        });
    }

    public deleteToken() {
        this.setToken('');
    }
}