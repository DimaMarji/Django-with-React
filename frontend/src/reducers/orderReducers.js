import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_MY_BRAND_REQUEST,
    ORDER_MY_BRAND_SUCCESS,
    ORDER_MY_BRAND_FAIL,

    ORDER_TODAY_REQUEST,
    ORDER_TODAY_SUCCESS,
    ORDER_TODAY_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

    ORDER_TRANSACTION_REQUEST,
    ORDER_TRANSACTION_SUCCESS,
    ORDER_TRANSACTION_FAIL,
} from '../constants/orderConstants'


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return {}


        default:
            return state
    }
}


export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state
    }
}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}


export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}


export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_LIST_MY_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}



export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderListBrandReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case  ORDER_MY_BRAND_REQUEST:
            return {
                loading: true
            }

        case  ORDER_MY_BRAND_SUCCESS:
            return {
                loading: false,
                orders: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case  ORDER_MY_BRAND_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            default:
                return state
        
    

}}

export const orderListTodayReducer = (state = { orderTodayItems: [] }, action) => {
    switch (action.type) {
        case  ORDER_TODAY_REQUEST:
            return {
                loading: true
            }

        case  ORDER_TODAY_SUCCESS:
            return {
                loading: false,
                todayOrderitems: action.payload.todayOrderitems,
                todayOrderCount: action.payload.todayOrderCount,
              
            }

        case  ORDER_TODAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            default:
                return state
        
    

}}

