const link = "http://localhost:8000/api";

const routeGetUsers = link + "/users"; //full details, including their experiences
const routeGetUser = link + "/user"; // :username
const routeGetExperience = link + "/experience"; // :id
const routeGetExperiences = link + "/experiences"; // ?username=
const routeGetExperiencesFilter = link + "/experiencesFilter"; // ?vehicle=&departure=&arrival=

const routePostUser = link + "/addUser";
const routePostExperience = link + "/addExperience";

const routeDeleteUser = link + "/deleteUser"; // :username
const routeDeleteExperience = link + "/deleteExperience"; // :id

const routePutUser = link + "/updateUser"; // :username
const routePutExperience = link + "/updateExperience"; // :id
const routePutUserPassword = link + "/updatePassword"; // :username

export {
    routeGetUsers, routeGetUser, routeGetExperience, routeGetExperiences, routeGetExperiencesFilter,
    routePostUser, routePostExperience,
    routeDeleteUser, routeDeleteExperience, routePutUser, routePutExperience, routePutUserPassword
};

