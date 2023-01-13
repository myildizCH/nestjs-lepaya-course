## Answers to technical questions

1. How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
    - 6-7 hours
    - I would think about separation of concern more when organising the code. 
    - Error handling could be more comprehensive for corner cases.
    - Testing realies on architecture and requirements. I wrote basic tests, but they could have been way better.
    - I could add swagger documentation.

2. Describe your solution in plain english. Point out your design decisions and the reasoning behind them.
    - I used NestJS as framework. I personally support the idea of having opinionated frameworks in general to have a common practice and not to have omnidrectionally growing repository. This example is too little for such discussion 😄 but I nevertheless like NestJS a lot.
    - In courses.service.ts, I developed 2 different strategies to collect and map the list of learners.
        - 1. Approach: Fetch all the learners and filter them by using the learners data from `/courses/:id` endpoint. Advantage of this is that it does only one call and filters the learners later. Disadvantage of this is that it can be unimaginable to do such request to the real database where there are millions of information like that.
        - 2. Approach: Fetch learners by id and map them on the fly. This is better from the space complexity point of view for my code compared to 1. approach. However, this approach hammers the api and sometimes api can not handle this.
    - I separated http requests and courses as different modules.
    - I did error handling in http.service as for this example, I found it enough. 

3. Have you learned something new doing this test? If yes, describe it here.
    - It is hard to identify what I have learned, but of course it is constant learning even if I can not put a name on it.

4. How would you improve the HR System API you just used?
    - 1. There are repetitive ids in `/courses` endpoint. Especially in `learners` property, some ids are repeating. This is probably due to the way /courses is handled on API side. I would make sure that the ids are unique.
    - 2. It is a matter of taste, but I prefer to ignore the `/` in the url path for HTTP request. HR System url returns 404 when a trailing `/` is used. `api/courses/` returns 404 but `api/courses` returns 200. That requires additional attention for consumers and for an avarage user, they can end up seeing 404 for no good reason.
    - 3. `api/courses` returns a payload with `learners` and `trainerId` properties. Especially for `learners` property, there seems to be a need for logical nesting like `api/courses/:id/learners`.
    - 4. A couple of times I received `500` for `learners` endpoint for repetitive requests. This might have some thing to do with rate limiting(I am guessing only.). In this case, it might be good idea to use `429 Too Many Requests` response status code. 
    - 5. When provided id is not correct, all of the available endpoints return the standard message `Not Found`. I would give more detailed information there to be clearer like `Resource with id: {id} not found`. There is already error property with `Not Found` value.
    - 6. I tried to use filters via query parameters. It is hard to say without API documentation but I could not filter anything by using the property names. It would increase the performance by reducing the usage of server resources if there were filtering and sorting possibilities. 
    - 7. Being able to sort the response by name or id could be great.
    - 8. A swagger documentation would be nice to see what we can do with those endpoints.
    - 9. Due to the fact that `lepaya-courses` does aggregation, there are limitations to improve our API's performance. One of the thing is `/learners` endpoint. This endpoint can be cached to respond faster without hammering the DB. Because it is needed a lot to collect the list of learners.
    - 10. I did not feel a need for pagination for my case but when this endpoints are going to be reflected to the frontend and if we assume that the data will grow, pagination is needed.
    - 11. I know this is an example only, but in real life authorization and authentication is needed for different roles.


5. Describe yourself using JSON.
Please accept my humble JSON ☺️

```
{
    "name": "Mehmet Yildiz",
    "title": "Principal Engineer",
    "location": "Berlin/Germany",
    "hobbies": ["reading", "thinking", "playing with kids"],
    "interests": ["potential of humanbeing", "leadership", "coaching", "technology"]
}
```