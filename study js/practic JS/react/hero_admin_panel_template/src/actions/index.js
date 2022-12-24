
// import { filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice'

// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// }

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }
// export const filtersFetchingError = (filters) => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR',
//         payload: filters
//     }
// }

// export const deleteHeroFromList = (id) => {
//     return {
//         type: 'DELETE_HERO',
//         payload: id
//     }
// }
// export const addHero = (hero) => {
//     console.log(hero)
//     return {
//         type: 'ADD_HERO',
//         payload: hero,
//     }
// }
// export const activeFilterChanged = (element) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: element,
//     }
// }