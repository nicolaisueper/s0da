# s0da

A refreshing status panel/incident page.

## Development

1. Clone repo
2. `npm install`
3. Start db: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=changemepls --name=s0dapg postgres:alpine`
4. `npm run start:dev`
5. Browser should open at `localhost:8080`

### Debug values

```js
const debugTokenSecret = 'youraccesstokensecret';

const debugUsers = [
    {
        username: 'admin',
        password: 'admin',
        role: 'admin'
    }, {
        username: 'user',
        password: 'user',
        role: 'user'
    }
];
```
