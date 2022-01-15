import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_BRAND_REQUEST,
    PRODUCT_BRAND_SUCCESS,
    PRODUCT_BRAND_FAIL,

    PRODUCT_POSITIVE_REQUEST,
    PRODUCT_POSITIVE_SUCCESS,
    PRODUCT_POSITIVE_FAIL,

    PRODUCT_TWITTER_REQUEST,
    PRODUCT_TWITTER_SUCCESS,
    PRODUCT_TWITTER_FAIL,


    PRODUCT_LIST_MY_REQUEST,
    PRODUCT_LIST_MY_SUCCESS,
    PRODUCT_LIST_MY_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from '../constants/productConstants'


export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productListMyReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case  PRODUCT_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case  PRODUCT_LIST_MY_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case  PRODUCT_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            default:
                return state
        
    

}}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productBrandReducer = (state = { products: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_BRAND_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_BRAND_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_BRAND_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }}



export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_UPDATE_RESET:
            return { product: {} }

        default:
            return state
    }
}



export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const positiveReviewsReducer = (state = { posreviews: [],negreviews: [] }, action) => {
    switch (action.type) {
        case  PRODUCT_POSITIVE_REQUEST:
            return {
                loading: true
            }

        case  PRODUCT_POSITIVE_SUCCESS:
            return {
                loading: false,
                posreviews: action.payload.posreviews,
                positiveCount:action.payload.positiveCount,
                negreviews: action.payload.negreviews,
                negativeCount:action.payload.negativeCount,
               
            }

        case  PRODUCT_POSITIVE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
        
    

}}

export const twitterReviewsReducer = (state = { }, action) => {
    switch (action.type) {
        case  PRODUCT_TWITTER_REQUEST:
            return {
                loading: true
            }

        case  PRODUCT_TWITTER_SUCCESS:
            return {
                loading: false,
                tweets: action.payload,
               
            }

        case  PRODUCT_TWITTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
        
    

}}
