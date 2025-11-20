const fetchPosts = require('../src/api');
const axios = require('axios');

jest.mock('axios');

describe('api:fetchPosts', () => {
    let response = {};
    beforeEach(() => {
        response = {
            data: [
                { "userId": 1, "id": 1, "title": "Тестова назва 1", "body": 
"Тестовий контент 1" },
                { "userId": 1, "id": 2, "title": "Тестова назва 2", "body": 
"Тестовий контент 2" }
            ]
        };
    });

    test('Отримання постів зі стороннього API', async () => {
        axios.get.mockReturnValue(response);
        const posts = await fetchPosts();
        
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(posts).toBeInstanceOf(Array);
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[1].id).toEqual(2);
        expect(posts[1].title).toEqual('Тестова назва 2');
    });
});

